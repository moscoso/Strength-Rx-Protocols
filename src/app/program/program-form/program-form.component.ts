import { Component, OnInit, Input, EventEmitter, Output, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { Program, ProgramPhase, INIT_PROGRAM_PHASE } from 'src/app/core/state/program/program.state';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
import { Workout, WorkoutDictionary } from 'src/app/core/state/workouts/workouts.state';
import { transformToSlug } from 'src/util/slug/transformToSlug';
import { validateDocIDIsUnique } from 'src/util/verifyDocIsUnique/verifyDocIsUnique';
import { WorkoutStoreDispatcher } from 'src/app/core/state/workouts/workouts.dispatcher';
import { ProgramStoreDispatcher } from 'src/app/core/state/program/program.dispatcher';

@Component({
    'selector': 'program-form',
    'templateUrl': './program-form.component.html',
    'styleUrls': ['./program-form.component.scss'],
})
export class ProgramFormComponent implements OnInit {
    @Input() buttonText = 'Submit';
    @Output() formSubmit = new EventEmitter < Partial < Program >> ();

    form: FormGroup;

    name = new FormControl('', {
        'updateOn': 'blur',
        'validators': Validators.required,
        'asyncValidators': this.verifyProgramIsUnique.bind(this)
    });
    numberOfPhases = new FormControl(1, [Validators.required, Validators.min(1), Validators.max(5)]);
    phases: FormArray;
    workoutList$: Observable < Workout[] > = of ([]);
    requestInProgress$: Observable < boolean > ;

    constructor(
        public workoutService: WorkoutStoreDispatcher,
        public programService: ProgramStoreDispatcher,
        public toastService: ToastService,
        public firestore: AngularFirestore,
    ) {}

    ngOnInit() {
        this.programService.loadAll();
        this.phases = new FormArray([this.initPhaseFormControl()]);
        this.form = new FormGroup({
            'name': this.name,
            'numberOfPhases': this.numberOfPhases,
            'phases': this.phases
        });
        this.requestInProgress$ = this.workoutService.selectRequestInProgress();
        this.workoutService.loadAll();
        this.workoutList$ = this.workoutService.selectAll();

        this.programService.selectProgramByRouteURL().pipe(first()).toPromise().then(program => {
            console.log(program);
            if (program) {
                this.initFormValues(program);
            }

            this.numberOfPhases.valueChanges.subscribe((n: number) => {
                this.updateExerciseRoutineFormArray(n);
            });
        });
    }

    /**
     * Set the phases FormArray by inserting a new FormGroup
     * for each exercise in the value of the exercises formControl.
     * In other words, create a sub-form for each exercise.
     * @param exercises the value from the exercises formControl.
     * @param workout if it exists, it provides the default values for the exercise routine
     */
    setExerciseRoutineFormArray(program: Program) {
        this.phases = new FormArray([]);
        program.phases.forEach((phase) => {
            const defaultValues: ProgramPhase = { ...INIT_PROGRAM_PHASE, ...phase };
            this.addPhaseFormcontrol(defaultValues);
        });
    }

    updateExerciseRoutineFormArray(n: number) {
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
            'lengthInWeeks': new FormControl(phase.lengthInWeeks, [Validators.required, Validators.min(1)]),
            'schedule': new FormGroup({
                'day1': new FormControl(phase.schedule.day1, [Validators.required]),
                'day2': new FormControl(phase.schedule.day2, []),
                'day3': new FormControl(phase.schedule.day3, []),
                'day4': new FormControl(phase.schedule.day4, []),
                'day5': new FormControl(phase.schedule.day5, []),
                'day6': new FormControl(phase.schedule.day6, []),
                'day7': new FormControl(phase.schedule.day7, []),
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
        this.updateExerciseRoutineFormArray(program.phases.length);
        program.phases.forEach((phase, index) => {
            this.phases.controls[index].get('lengthInWeeks').setValue(phase.lengthInWeeks);
            this.phases.controls[index].get('schedule').get('day1').setValue(this.getWorkout(phase.schedule.day1, program));
            this.phases.controls[index].get('schedule').get('day2').setValue(this.getWorkout(phase.schedule.day2, program));
            this.phases.controls[index].get('schedule').get('day3').setValue(this.getWorkout(phase.schedule.day3, program));
            this.phases.controls[index].get('schedule').get('day4').setValue(this.getWorkout(phase.schedule.day4, program));
            this.phases.controls[index].get('schedule').get('day5').setValue(this.getWorkout(phase.schedule.day5, program));
            this.phases.controls[index].get('schedule').get('day6').setValue(this.getWorkout(phase.schedule.day6, program));
            this.phases.controls[index].get('schedule').get('day7').setValue(this.getWorkout(phase.schedule.day7, program));
        });
    }

    getWorkout(workoutID: string, program: Program): Workout {
        return program.workouts[workoutID];
    }

    resetControl(control: FormControl) {
        control.setValue(null);
    }

    getDayList() {
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
                'workouts': this.mapWorkouts(program.phases),
                'phases': this.transformSchedule(program.phases),
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

    mapWorkouts(phases: any[]): WorkoutDictionary {
        if (phases.length === 0) { throw new Error(`Cannot map workouts of 0 phases`); }
        const map: WorkoutDictionary = {};
        phases.forEach(phase => {
            const days = Object.keys(phase.schedule);
            days.forEach(day => {
                const workout = phase.schedule[day];
                if (workout) {
                    map[workout.id] = workout;
                }
            });
        });
        return map;
    }

    /**
     * Transform phase schedule so that the schedule uses workout IDs instead of workout values
     */
    transformSchedule(phases: any[]): ProgramPhase[] {
        const transformedPhases = [];
        phases.forEach(phase => transformedPhases.push(phase));
        transformedPhases.forEach(phase => {
            const days = Object.keys(phase.schedule);
            days.forEach(day => {
                const workout = phase.schedule[day];
                if (workout) {
                    phase.schedule[day] = workout.id;
                }
            });
        });
        return transformedPhases;
    }

    getSlug(name: string) {
        return transformToSlug(name);
    }

    verifyProgramIsUnique(ctrl: AbstractControl): Promise < ValidationErrors | null > {
        return validateDocIDIsUnique(`programs`, ctrl, this.firestore);
    }

    /**
     * A function to compare the option values with the selected values.
     * @param e1 the first argument is a value from an option.
     * @param e2 the second is a value from the selection.
     * @returns a boolean should be returned.
     */

    compareWorkouts(e1: Workout, e2: Workout): boolean {
        return e1 && e2 ? e1.id === e2.id : e1 === e2;
    }

}
