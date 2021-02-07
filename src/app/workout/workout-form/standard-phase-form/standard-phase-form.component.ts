import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { Exercise } from 'src/app/core/state/exercises/exercise.model';
import { ExerciseStoreDispatcher } from 'src/app/core/state/exercises/exercises.dispatcher';
import { INIT_STANDARD_EXERCISE_ROUTINE, StandardExerciseRoutine, StandardPhase, Workout } from 'src/app/core/state/workout/workout.model';
import { WorkoutStoreDispatcher } from 'src/app/core/state/workout/workouts.dispatcher';


@Component({
    'selector': 'app-standard-phase-form',
    'templateUrl': './standard-phase-form.component.html',
    'styleUrls': ['./standard-phase-form.component.scss'],
})
export class StandardPhaseFormComponent implements OnInit {

    @Input() workout: Workout;

    exercises = new FormControl([], [Validators.required]);
    exerciseRoutines = new FormArray([]);
    standardPhase = new FormGroup({
        'exercises': this.exercises,
        'exerciseRoutines': this.exerciseRoutines,
    });

    exerciseList$: Observable < Exercise[] > = of ([]);
    requestInProgress$: Observable < boolean > ;
    orderedList: Exercise[] = [];

    constructor(
        public workoutService: WorkoutStoreDispatcher,
        public exerciseService: ExerciseStoreDispatcher,
    ) {}

    ngOnInit() {
        this.workoutService.loadAll();
        this.requestInProgress$ = this.workoutService.selectRequestInProgress();
        this.exerciseService.loadAll();
        this.exerciseList$ = this.exerciseService.selectAll();
        if (this.workout) {
            this.initFormValues(this.workout);
        } else {
            this.workoutService.selectWorkoutByRouteURL().pipe(first(workout => workout != null)).toPromise()
                .then(workout => { this.initFormValues(workout); });
        }
        this.exercises.valueChanges.subscribe((exercises: Exercise[]) => {
            this.updateExerciseRoutineFormArray(exercises);
        });
    }

    initFormValues(workout: Workout) {
        if (workout.standardPhase != null) {
            this.exercises.setValue(workout.standardPhase.exercises);
            this.orderedList = workout.standardPhase.exercises;
            this.setExerciseRoutineFormArray(workout);
        }
    }

    /**
     * Set the exerciseRoutines form array by inserting a new FormGroup
     * for each exercise in the value of the exercises formControl.
     * In other words, create a sub-form for each exercise.
     * @param workout it provides the default values for the exercise routine
     */
    setExerciseRoutineFormArray(workout: Workout) {
        this.exerciseRoutines = new FormArray([]);
        workout.standardPhase.exercises.forEach((exercise) => {
            const defaultValues = { ...INIT_STANDARD_EXERCISE_ROUTINE, ...workout.standardPhase.exerciseRoutines[exercise.id] };
            const formGroup: FormGroup = this.buildExerciseRoutineFormGroup(defaultValues);
            const length = this.exerciseRoutines.length;
            this.exerciseRoutines.insert(length, formGroup);
        });
    }

    /**
     * Update the exerciseRoutineFormArray by either inserting or removing an exerciseRoutine FormGroup.
     * @param exercises the list of exercises
     */
    updateExerciseRoutineFormArray(exercises: Exercise[]) {
        const oneExerciseAdded = exercises.length === this.orderedList.length + 1;
        const oneExerciseRemoved = exercises.length === this.orderedList.length - 1;
        if (oneExerciseAdded) {
            const addedElement = exercises.filter(element => !this.orderedList.includes(element))[0];
            const index = exercises.indexOf(addedElement);
            this.exerciseRoutines.insert(index, this.buildExerciseRoutineFormGroup());
        } else if (oneExerciseRemoved) {
            const removedElement = this.orderedList.filter(element => !exercises.includes(element))[0];
            const index = this.orderedList.indexOf(removedElement);
            this.exerciseRoutines.removeAt(index);
        }
        this.orderedList = exercises;
    }

    /**
     * Creates a FormGroup that represents a Standard ExerciseRoutine
     * @param routine the routine to create the FormGroup from. If undefined, it uses a default value
     */
    buildExerciseRoutineFormGroup(routine: StandardExerciseRoutine = { ...INIT_STANDARD_EXERCISE_ROUTINE }): FormGroup {
        return new FormGroup({
            'sets': new FormControl(routine.sets),
            'reps': new FormControl(routine.reps),
            '%1rm': new FormControl(routine['%1rm']),
            'rpe': new FormControl(routine.rpe),
            'tempo': new FormControl(routine.tempo),
            'rest': new FormControl(routine.rest),
            'restAfterExercise': new FormControl(routine.restAfterExercise),
        });
    }

    /**
     * Get the name of an exercise from the exercises control specified by index
     * @param index the index of the exercises value array
     */
    getExerciseName(index: number) {
        return this.orderedList[index].name;
    }

    public getValue(): StandardPhase {
        const routinesRaw = this.exerciseRoutines.getRawValue();
        const exerciseRoutines: {
            [exerciseID: string]: StandardExerciseRoutine } = {};
        this.orderedList.forEach((exercise, i) => {
            exerciseRoutines[exercise.id] = routinesRaw[i];
        });
        return {
            'exercises': this.orderedList,
            exerciseRoutines
        };
    }

    /**
     * A function to compare the option values with the selected values.
     * @param e1 the first argument is a value from an option.
     * @param e2 the second is a value from the selection.
     * @returns a boolean should be returned.
     */
    compareExercises(e1: Exercise, e2: Exercise): boolean {
        return e1 && e1.id && e2 && e2.id ? e1.id === e2.id : e1 === e2;
    }

    /**
     * This is the handler for the drag & drop event.
     * It rearranges both the exercise list preview and the exercise form Controls
     * @param event emitted when the user drops a draggable item inside a drop container
     */
    drop(event: CdkDragDrop < string[] > ) {
        this.rearrangeExerciseRoutineControls(event);
        this.rearrangeOrderedList(event);
    }

    /**
     * This rearranges the exercise list that determines the order and is displayed as a preview
     * @param event emitted when the user drops a draggable item inside a drop container
     */
    rearrangeOrderedList(event: CdkDragDrop < string[] > ) {
        const array = [...this.orderedList];
        moveItemInArray(array, event.previousIndex, event.currentIndex);
        this.orderedList = array;
    }

    /**
     * This rearranges the form controls for the exercise routines
     * @param event emitted when the user drops a draggable item inside a drop container
     */
    rearrangeExerciseRoutineControls(event: CdkDragDrop < string[] > ) {
        const array = this.exerciseRoutines.getRawValue();
        moveItemInArray(array, event.previousIndex, event.currentIndex);
        this.exerciseRoutines.setValue(array);
    }


    isValid() {
        return this.standardPhase.valid;
    }
}
