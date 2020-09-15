import { Component, OnInit, Input, EventEmitter, Output, } from '@angular/core';
import { Program, ProgramPhase, INIT_PROGRAM_PHASE } from 'src/app/core/state/program/program.state';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
import { transformToSlug } from 'src/util/slug/transformToSlug';
import { validateDocIDIsUnique } from 'src/util/verifyDocIsUnique/verifyDocIsUnique';
import { ProgramStoreDispatcher } from 'src/app/core/state/program/program.dispatcher';
import { ModalController } from '@ionic/angular';
import { SubscribeToWorkoutComponent } from './subscribe-to-workout/subscribe-to-workout.component';
import { CopyWorkoutComponent } from './copy-workout/copy-workout.component';
import { CreateCustomWorkoutComponent } from './create-custom-workout/create-custom-workout.component';
import { Workout } from 'src/app/core/state/workouts/workouts.state';
import { EditCustomWorkoutComponent } from './edit-custom-workout/edit-custom-workout.component';

@Component({
    'selector': 'program-form',
    'templateUrl': './program-form.component.html',
    'styleUrls': ['./program-form.component.scss'],
})
export class ProgramFormComponent implements OnInit {
    @Input() program: Program;
    @Input() buttonText = 'Submit';
    @Output() formSubmit = new EventEmitter < Partial < Program >> ();

    form: FormGroup;

    name = new FormControl('', {
        'updateOn': 'blur',
        'validators': Validators.required,
        'asyncValidators': this.verifyProgramIsUnique.bind(this)
    });
    numberOfPhases = new FormControl(1, [Validators.required, Validators.min(1), Validators.max(26)]);
    phases: FormArray;
    requestInProgress$: Observable < boolean > ;

    constructor(
        public programService: ProgramStoreDispatcher,
        public modalController: ModalController,
        public toastService: ToastService,
        public firestore: AngularFirestore,
    ) {}

    ngOnInit() {
        this.phases = new FormArray([this.initPhaseFormControl()]);
        this.form = new FormGroup({
            'name': this.name,
            'numberOfPhases': this.numberOfPhases,
            'phases': this.phases
        });
        this.programService.loadAll();
        this.requestInProgress$ = this.programService.selectRequestInProgress();
        this.programService.selectProgramByRouteURL().pipe(first(program => program != null)).toPromise()
            .then(program => {this.initFormValues(program); });
        this.numberOfPhases.valueChanges.subscribe((n: number) => {
            this.updatePhasesFormGroup(n);
        });
    }

    updatePhasesFormGroup(n: number) {
        const difference = Math.abs(this.phases.length - n);
        const phasesAdded = this.phases.length < n;
        const phasesRemoved = this.phases.length > n;
        if (phasesAdded) {
            for (let i = 0; i < difference; i++) {
                this.addPhaseFormcontrol();
            }
        } else if (phasesRemoved) {
            for (let i = 0; i < difference; i++) {
                const lastIndex = this.phases.length - 1;
                this.phases.removeAt(lastIndex);
            }
        }
    }

    initPhaseFormControl(phase: ProgramPhase = INIT_PROGRAM_PHASE): FormGroup {
        return new FormGroup({
            'lengthInWeeks': new FormControl(phase.lengthInWeeks, [Validators.required, Validators.min(1), Validators.max(52)]),
            'schedule': new FormGroup({
                'day1': new FormControl({ 'value': phase.schedule.day1, 'disabled': true }, [Validators.required]),
                'day2': new FormControl({ 'value': phase.schedule.day2, 'disabled': true }, []),
                'day3': new FormControl({ 'value': phase.schedule.day3, 'disabled': true }, []),
                'day4': new FormControl({ 'value': phase.schedule.day4, 'disabled': true }, []),
                'day5': new FormControl({ 'value': phase.schedule.day5, 'disabled': true }, []),
                'day6': new FormControl({ 'value': phase.schedule.day6, 'disabled': true }, []),
                'day7': new FormControl({ 'value': phase.schedule.day7, 'disabled': true }, []),
            })
        });
    }

    addPhaseFormcontrol(phase: ProgramPhase = INIT_PROGRAM_PHASE): void {
        const formGroup: FormGroup = this.initPhaseFormControl(phase);
        const length = this.phases.length;
        this.phases.insert(length, formGroup);
    }

    initFormValues(program: Program) {
        this.name.setValue(program.name);
        this.name.disable();
        this.numberOfPhases.setValue(program.phases.length);
        this.updatePhasesFormGroup(program.phases.length);
        program.phases.forEach((phase, index) => {
            const phaseControl = this.phases.controls[index];
            phaseControl.get('lengthInWeeks').setValue(phase.lengthInWeeks);
            for (const day of this.getDayList()) {
                phaseControl.get('schedule').get(day).setValue(phase.schedule[day], program);
            }
        });
    }

    resetControl(control: FormControl) {
        control.setValue(null);
        control.markAsTouched();
    }

    getDayList(): ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'] {
        return ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'];
    }

    getDayControl(day: 'day1' | 'day2' | 'day3' | 'day4' | 'day5' | 'day6' | 'day7', form: FormGroup): AbstractControl {
        return form.get('schedule').get(day);
    }

    onSubmit(form) {
        const program = this.form.getRawValue();
        try {
            let values: Partial < Program > ;
            values = {
                'id': this.getSlug(program.name),
                'name': program.name,
                'totalLengthInWeeks': this.sumWeeks(program.phases),
                'phases': program.phases,
                'dateCreated': new Date(),
                'photoURL': '',
            };
            this.formSubmit.emit(values);
        } catch (error) {
            this.toastService.failed(`Could not submit program`, error);
        }
    }

    sumWeeks(phases: any[]): number {
        if (phases.length === 0) { throw new Error(`Cannot sum weekLengths of 0 phases`); }
        let sum = 0;
        phases.forEach(phase => {
            sum += phase.lengthInWeeks;
        });
        if (sum < phases.length) { throw new Error(`Total length of weeks invalid`); }
        return sum;
    }

    getSlug(name: string) {
        return transformToSlug(name);
    }

    verifyProgramIsUnique(ctrl: AbstractControl): Promise < ValidationErrors | null > {
        return validateDocIDIsUnique(`programs`, ctrl, this.firestore);
    }

    async setWorkoutControlFromModal(dayControl: FormControl, options: {
        'id': string,
        'component': any,
        'cssClass' ?: string,
        'componentProps' ?: any
    }) {
        const modal = await this.modalController.create(options);
        modal.onDidDismiss().then(event => {
            if (event && event.data && event.data.workout) {
                dayControl.setValue(event.data.workout);
                dayControl.markAsDirty();
                dayControl.markAsTouched();
            }
        });
        return await modal.present();
    }

    async subscribeToWorkout(dayControl: FormControl) {
        const options = {
            'id': 'subscribe-to-workout',
            'component': SubscribeToWorkoutComponent,
            'cssClass': 'modal-short-form'
        };
        this.setWorkoutControlFromModal(dayControl, options);
    }

    async copyWorkout(dayControl: FormControl) {
        const options = {
            'id': 'copy-workout',
            'component': CopyWorkoutComponent,
            'cssClass': 'modal-short-form'
        };
        this.setWorkoutControlFromModal(dayControl, options);
    }

    async createCustomWorkout(dayControl: FormControl) {
        const options = {
            'id': 'create-custom-workout',
            'component': CreateCustomWorkoutComponent,
            'cssClass': 'modal-80-width',
        };
        this.setWorkoutControlFromModal(dayControl, options);
    }

    async editCustomWorkout(dayControl: FormControl, workout: Workout) {
        const options = {
            'id': 'edit-custom-workout',
            'component': EditCustomWorkoutComponent,
            'cssClass': 'modal-80-width',
            'componentProps': {
                'workout': workout
            }
        };
        this.setWorkoutControlFromModal(dayControl, options);
    }

    getListOfIntegers(i: number) {
        return new Array(i).map(x => x + 1);
    }
}
