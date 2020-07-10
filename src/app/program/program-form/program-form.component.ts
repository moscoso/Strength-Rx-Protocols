import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Program } from 'src/app/core/state/program/program.state';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Exercise } from 'src/app/core/state/exercises/exercises.state';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
import { Workout, ExerciseRoutine } from 'src/app/core/state/workouts/workouts.state';
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
    day1 = new FormControl(null, [Validators.required]);
    day2 = new FormControl(null, []);
    day3 = new FormControl(null, []);
    day4 = new FormControl(null, []);
    day5 = new FormControl(null, []);
    day6 = new FormControl(null, []);
    day7 = new FormControl(null, []);

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
        this.form = new FormGroup({
            'name': this.name,
            'day1': this.day1,
            'day2': this.day2,
            'day3': this.day3,
            'day4': this.day4,
            'day5': this.day5,
            'day6': this.day6,
            'day7': this.day7,
        });
        this.requestInProgress$ = this.workoutService.selectRequestInProgress();
        this.workoutService.loadAll();
        this.workoutList$ = this.workoutService.selectAll();

        this.programService.selectProgramByRouteURL().pipe(first()).toPromise().then(program => {
            if (program) {
                this.initFormValues(program);
            }
        });

        console.log(this.day2.value);
    }

    initFormValues(program: Program) {
        this.name.setValue(program.name);
        this.name.disable();
        this.day1.setValue(program.schedule.day1);
        this.day2.setValue(program.schedule.day2);
        this.day3.setValue(program.schedule.day3);
        this.day4.setValue(program.schedule.day4);
        this.day5.setValue(program.schedule.day5);
        this.day6.setValue(program.schedule.day6);
        this.day7.setValue(program.schedule.day7);
    }

    onSubmit(form) {
        const program = this.form.getRawValue();
        try {
            let values: Partial < Program > ;
            const workouts = [
                program.day1,
                program.day2,
                program.day3,
                program.day4,
                program.day5,
                program.day6,
                program.day7
            ].filter(workout => workout != null);
            values = {
                'id': this.getSlug(program.name),
                'name': program.name,
                'workouts': workouts,
                'schedule': {
                    'day1': program.day1,
                    'day2': program.day2,
                    'day3': program.day3,
                    'day4': program.day4,
                    'day5': program.day5,
                    'day6': program.day6,
                    'day7': program.day7,
                },
                'dateCreated': new Date(),
                'photoURL': '',
            };
            this.formSubmit.emit(values);
        } catch (error) {
            this.toastService.failed(`Could not submit workout`, error);
        }
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
