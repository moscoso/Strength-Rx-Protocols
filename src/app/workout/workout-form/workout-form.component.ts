import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { FormControl, Validators, FormGroup, AbstractControl, ValidationErrors, FormArray } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Exercise } from 'src/app/core/state/exercises/exercises.state';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/state/app.state';
import { Workout, ExerciseRoutine } from 'src/app/core/state/workouts/workouts.state';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { transformToSlug } from 'src/util/slug/transformToSlug';
import { AngularFirestore } from '@angular/fire/firestore';
import { validateDocIDIsUnique } from 'src/util/verifyDocIsUnique/verifyDocIsUnique';
import { first } from 'rxjs/operators';
import { WorkoutStoreDispatcher } from 'src/app/core/state/workouts/workouts.dispatcher';
import { ExerciseStoreDispatcher } from 'src/app/core/state/exercises/exercises.dispatcher';

@Component({
    'selector': 'workout-form',
    'templateUrl': './workout-form.component.html',
    'styleUrls': ['./workout-form.component.scss'],
})
export class WorkoutFormComponent implements OnInit {

    @Input() buttonText = 'Submit';
    @Output() formSubmit = new EventEmitter < Partial < Workout >> ();

    form: FormGroup;

    name = new FormControl('', {
        'updateOn': 'blur',
        'validators': Validators.required,
        'asyncValidators': this.verifyWorkoutIsUnique.bind(this)
    });
    exercises = new FormControl([], [Validators.required]);
    exerciseRoutines = new FormArray([]);

    exerciseList$: Observable < Exercise[] > = of ([]);
    requestInProgress$: Observable < boolean > ;

    constructor(
        public workoutService: WorkoutStoreDispatcher,
        public exerciseService: ExerciseStoreDispatcher,
        public toastService: ToastService,
        public firestore: AngularFirestore,
    ) {
    }

    ngOnInit() {
        this.workoutService.loadAll();
        this.form = new FormGroup({
            'name': this.name,
            'exercises': this.exercises,
            'exerciseRoutines': this.exerciseRoutines,
        });
        this.requestInProgress$ = this.workoutService.selectRequestInProgress();
        this.exerciseService.loadAll();
        this.exerciseList$ = this.exerciseService.selectAll();

        this.workoutService.selectWorkoutByRouteURL().pipe(first()).toPromise().then(workout => {
            if (workout) {
                this.initFormValues(workout);
            }

            this.exercises.valueChanges.subscribe((exercises: Exercise[]) => {
                this.setExerciseRoutineFormArray(exercises, workout);
            });
        });
    }

    initFormValues(workout: Workout) {
        this.name.setValue(workout.name);
        this.name.disable();
        this.exercises.setValue(workout.exercises);
        this.setExerciseRoutineFormArray(workout.exercises, workout);
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
                defaultValues = {...workout.exerciseRoutines[exercise.name]};
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
        const workout = this.form.getRawValue();
        try {
            let values: Partial < Workout > ;
            values = {
                'id': this.getSlug(workout.name),
                'name': workout.name,
                'exercises': workout.exercises,
                'exerciseRoutines': this.getExerciseRoutinesValue(workout),
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
        return validateDocIDIsUnique(`workouts`, ctrl, this.firestore);
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
        return this.exercises.value[index].name;
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
