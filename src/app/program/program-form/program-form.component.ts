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
        'asyncValidators': this.verifyWorkoutIsUnique.bind(this)
    });
    workouts = new FormControl([], [Validators.required]);
    exerciseRoutines = new FormArray([]);

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
            'exercises': this.workouts,
            'exerciseRoutines': this.exerciseRoutines,
        });
        this.requestInProgress$ = this.workoutService.selectRequestInProgress();
        this.workoutService.loadAll();
        this.workoutList$ = this.workoutService.selectAll();

        this.programService.selectProgramByRouteURL().pipe(first()).toPromise().then(program => {
            if (program) {
                this.initFormValues(program);
            }

            this.workouts.valueChanges.subscribe((exercises: Exercise[]) => {
                // this.setExerciseRoutineFormArray(exercises, program);
            });
        });
    }

    initFormValues(program: Program) {
        this.name.setValue(program.name);
        this.name.disable();
        // this.workouts.setValue(program.workouts);
        // this.setExerciseRoutineFormArray(program.exercises, program);
    }


    /**
     * Set the exerciseRoutines form array by inserting a new FormGroup
     * for each exercise in the value of the exercises formControl.
     * In other words, creating a sub form for each exercise.
     * @param exercises the value from the exercises formControl.
     * @param workout if it exists, it provides the default values for the exercise routine
     */
    setExerciseRoutineFormArray(exercises: Exercise[], workout: Workout) {
        this.exerciseRoutines = new FormArray([]);
        exercises.forEach((exercise) => {
            let defaultValues: ExerciseRoutine = {
                'sets': null,
                'reps': null,
                'minutes': null,
                'seconds': null
            };
            if (workout) {
                defaultValues = { ...workout.exerciseRoutines[exercise.name] };
            }
            const routineGroup: FormGroup = new FormGroup({
                'sets': new FormControl(defaultValues.sets),
                'reps': new FormControl(defaultValues.reps),
                'minutes': new FormControl(defaultValues.minutes),
                'seconds': new FormControl(defaultValues.seconds),
            });
            const length = this.exerciseRoutines.length;
            this.exerciseRoutines.insert(length, routineGroup);
        });
    }

    onSubmit(form) {
        const program = this.form.getRawValue();
        try {
            let values: Partial < Program > ;
            values = {
                'id': this.getSlug(program.name),
                'name': program.name,
                'workouts': program.workouts,
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

    verifyWorkoutIsUnique(ctrl: AbstractControl): Promise < ValidationErrors | null > {
        return validateDocIDIsUnique(`programs`, ctrl, this.firestore);
    }

    getExerciseRoutinesValue(workout: Workout) {
        const routinesRaw = this.exerciseRoutines.getRawValue();
        const exerciseRoutines = {};
        workout.exercises.forEach((exercise, i) => {
            exerciseRoutines[exercise.name] = routinesRaw[i];
        });
        return exerciseRoutines;
    }

    /**
     * Get the name of an exercise from the exercises control specified by index
     * @param index the index of the exercises value array
     */
    getExerciseName(index: number) {
        return this.workouts.value[index].name;
    }

    /**
     * A function to compare the option values with the selected values.
     * @param e1 the first argument is a value from an option.
     * @param e2 the second is a value from the selection.
     * @returns a boolean should be returned.
     */

    compareExercises(e1: Exercise, e2: Exercise): boolean {
        return e1 && e2 ? e1.id === e2.id : e1 === e2;
    }

}
