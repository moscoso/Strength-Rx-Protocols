import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import { FormControl, Validators, FormGroup, AbstractControl, ValidationErrors, FormArray } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Exercise } from 'src/app/core/state/exercises/exercises.state';
import { Workout, ExerciseRoutine } from 'src/app/core/state/workouts/workouts.state';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { transformToSlug } from 'src/util/slug/transformToSlug';
import { AngularFirestore } from '@angular/fire/firestore';
import { validateDocIDIsUnique } from 'src/util/verifyDocIsUnique/verifyDocIsUnique';
import { first } from 'rxjs/operators';
import { WorkoutStoreDispatcher } from 'src/app/core/state/workouts/workouts.dispatcher';
import { ExerciseStoreDispatcher } from 'src/app/core/state/exercises/exercises.dispatcher';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

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

    orderedList: Exercise[] = [];

    readonly INIT_EXERCISE_ROUTINE: ExerciseRoutine = {
        'sets': null,
        'reps': null,
        'percentageOfOneRepMax': null,
        'rateOfPerceivedExertion': null,
        'tempo': null,
        'rest': null,
    };

    constructor(
        public workoutService: WorkoutStoreDispatcher,
        public exerciseService: ExerciseStoreDispatcher,
        public toastService: ToastService,
        public firestore: AngularFirestore,
    ) {}

    ngOnInit() {
        // this.workoutService.loadAll();
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
                const oneExerciseAdded = exercises.length === this.orderedList.length + 1;
                const oneExerciseRemoved = exercises.length === this.orderedList.length - 1;
                if (oneExerciseAdded) {
                    const addedElement = exercises.filter(element => !this.orderedList.includes(
                        element))[0];
                    const index = exercises.indexOf(addedElement);
                    this.addExerciseRoutine(index);
                } else if (oneExerciseRemoved) {
                    const removedElement = this.orderedList.filter(element => !exercises.includes(
                        element))[0];
                    const index = this.orderedList.indexOf(removedElement);
                    this.exerciseRoutines.removeAt(index);
                }
                this.orderedList = exercises;
            });
        });
    }

    initFormValues(workout: Workout) {
        this.name.setValue(workout.name);
        this.name.disable();
        this.exercises.setValue(workout.exercises);
        this.orderedList = workout.exercises;
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
            let defaultValues: ExerciseRoutine = {...this.INIT_EXERCISE_ROUTINE};
            if (workout) {
                defaultValues = { ...workout.exerciseRoutines[exercise.id] };
            }
            const routineGroup: FormGroup = new FormGroup({
                'sets': new FormControl(defaultValues.sets),
                'reps': new FormControl(defaultValues.reps),
                '%1rm': new FormControl(defaultValues.percentageOfOneRepMax),
                'rpe': new FormControl(defaultValues.rateOfPerceivedExertion),
                'tempo': new FormControl(defaultValues.tempo),
                'rest': new FormControl(defaultValues.rest),
            });
            const length = this.exerciseRoutines.length;
            this.exerciseRoutines.insert(length, routineGroup);
        });
    }

    /**
     * Add a form control to the exerciseRoutines form array.
     * @param index the index to insert the form control at in the exerciseRoutines form array
     */
    addExerciseRoutine(index: number) {
        const defaultValues: ExerciseRoutine = {...this.INIT_EXERCISE_ROUTINE};
        const routineGroup: FormGroup = new FormGroup({
            'sets': new FormControl(defaultValues.sets),
            'reps': new FormControl(defaultValues.reps),
            '%1rm': new FormControl(defaultValues.percentageOfOneRepMax),
            'rpe': new FormControl(defaultValues.rateOfPerceivedExertion),
            'tempo': new FormControl(defaultValues.tempo),
            'rest': new FormControl(defaultValues.rest),
        });
        this.exerciseRoutines.insert(index, routineGroup);
    }

    onSubmit(form) {
        const workout = this.form.getRawValue();
        try {
            let values: Partial < Workout > ;
            values = {
                'id': this.getSlug(workout.name),
                'name': workout.name,
                'exercises': this.orderedList,
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
            exerciseRoutines[exercise.id] = routinesRaw[i];
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

    drop(event: CdkDragDrop < string[] > ) {
        this.rearrangeExerciseRoutineControls(event);
        moveItemInArray(this.orderedList, event.previousIndex, event.currentIndex);
    }

    rearrangeExerciseRoutineControls(event: CdkDragDrop < string[] > ) {
        const array = this.exerciseRoutines.getRawValue();
        moveItemInArray(array, event.previousIndex, event.currentIndex);
        this.exerciseRoutines.setValue(array);
    }

}
