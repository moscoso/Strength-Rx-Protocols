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
import {
    Workout,
    StandardExerciseRoutine,
    INIT_STANDARD_EXERCISE_ROUTINE,
    IntervalExerciseRoutine
} from 'src/app/core/state/workouts/workouts.state';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { transformToSlug } from 'src/util/slug/transformToSlug';
import { AngularFirestore } from '@angular/fire/firestore';
import { validateDocIDIsUnique } from 'src/util/verifyDocIsUnique/verifyDocIsUnique';
import { first } from 'rxjs/operators';
import { WorkoutStoreDispatcher } from 'src/app/core/state/workouts/workouts.dispatcher';
import { ExerciseStoreDispatcher } from 'src/app/core/state/exercises/exercises.dispatcher';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Delta } from 'src/util/delta/Delta';

@Component({
    'selector': 'workout-form',
    'templateUrl': './workout-form.component.html',
    'styleUrls': ['./workout-form.component.scss'],
})
export class WorkoutFormComponent implements OnInit {

    @Input() isCustom = false;
    @Input() buttonText = 'Submit';
    @Input() workout: Workout;
    @Output() formSubmit = new EventEmitter < Partial < Workout >> ();

    form: FormGroup;

    name = new FormControl('', {
        'updateOn': 'blur',
        'validators': Validators.required,
        'asyncValidators': this.verifyWorkoutIsUnique.bind(this)
    });
    standardExercises = new FormControl([], [Validators.required]);
    standardExerciseRoutines = new FormArray([]);
    standardPhase = new FormGroup({
        'exercises': this.standardExercises,
        'exerciseRoutines': this.standardExerciseRoutines,
    });

    intervalSupersets = new FormArray([]);
    intervalPhase = new FormGroup({
        'supersets': this.intervalSupersets,
    });

    exerciseList$: Observable < Exercise[] > = of ([]);
    requestInProgress$: Observable < boolean > ;

    orderedList: Exercise[] = [];
    intervalOrderedList: Exercise[] = [];

    defaultValue: Workout;

    constructor(
        public workoutService: WorkoutStoreDispatcher,
        public exerciseService: ExerciseStoreDispatcher,
        public toastService: ToastService,
        public firestore: AngularFirestore,
    ) {}

    ngOnInit() {
        this.workoutService.loadAll();
        this.form = new FormGroup({
            'name': this.name,
            'standardPhase': this.standardPhase,
            'intervalPhase': this.intervalPhase,
        });
        this.requestInProgress$ = this.workoutService.selectRequestInProgress();
        this.exerciseService.loadAll();
        this.exerciseList$ = this.exerciseService.selectAll();
        if (this.workout) {
            this.initFormValues(this.workout);
        } else {
            this.workoutService.selectWorkoutByRouteURL().pipe(first(workout => workout != null)).toPromise()
                .then(workout => { this.initFormValues(workout); });
        }
        this.standardExercises.valueChanges.subscribe((exercises: Exercise[]) => {
            this.updateExerciseRoutineFormArray(exercises);
        });
    }

    initFormValues(workout: Workout) {
        this.defaultValue = workout;
        this.name.setValue(workout.name);
        this.standardPhase.get('exerciseRoutines').setValue(workout.standardPhase.exerciseRoutines);
        this.orderedList = workout.standardPhase.exercises;
        // this.intervalPhase.get('exerciseRoutines').setValue(workout.intervalPhase.exerciseRoutines);
        // this.intervalOrderedList = workout.intervalPhase.exercises;
        this.setExerciseRoutineFormArray(workout);
    }

    /**
     * Set the exerciseRoutines form array by inserting a new FormGroup
     * for each exercise in the value of the exercises formControl.
     * In other words, create a sub-form for each exercise.
     * @param workout it provides the default values for the exercise routine
     */
    setExerciseRoutineFormArray(workout: Workout) {
        this.standardExerciseRoutines = new FormArray([]);
        workout.standardPhase.exercises.forEach((exercise) => {
            const defaultValues = { ...INIT_STANDARD_EXERCISE_ROUTINE, ...workout.standardPhase.exerciseRoutines[exercise.id] };
            const formGroup: FormGroup = this.initExerciseRoutineFormControl(defaultValues);
            const length = this.standardExerciseRoutines.length;
            this.standardExerciseRoutines.insert(length, formGroup);
        });

        // workout.intervalPhase.exercises.forEach((exercise) => {
        //     const defaultValues2 = { ...INIT_INTERVAL_EXERCISE_ROUTINE, ...workout.intervalPhase.exerciseRoutines[exercise.id] };
        //     const formGroup: FormGroup = this.initIntervalRoutineFormControl(defaultValues2);
        //     const length = this.intervalExerciseRoutines.length;
        //     this.intervalExerciseRoutines.insert(length, formGroup);
        // });
    }

    initExerciseRoutineFormControl(routine: StandardExerciseRoutine): FormGroup {
        return new FormGroup({
            'sets': new FormControl(routine.sets),
            'reps': new FormControl(routine.reps),
            '%1rm': new FormControl(routine.percentageOfOneRepMax),
            'rpe': new FormControl(routine.rateOfPerceivedExertion),
            'tempo': new FormControl(routine.tempo),
            'rest': new FormControl(routine.rest),
        });
    }

    initIntervalRoutineFormControl(routine: IntervalExerciseRoutine): FormGroup {
        return new FormGroup({
            'duration': new FormControl(routine.duration)
        });
    }

    updateExerciseRoutineFormArray(exercises: Exercise[]) {
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
            this.standardExerciseRoutines.removeAt(index);
        }
        this.orderedList = exercises;
    }

    /**
     * Add a form control to the exerciseRoutines form array.
     * @param index the index to insert the form control at in the exerciseRoutines form array
     */
    addExerciseRoutine(index: number) {
        const defaultValues: StandardExerciseRoutine = { ...INIT_STANDARD_EXERCISE_ROUTINE };
        const routineGroup: FormGroup = new FormGroup({
            'sets': new FormControl(defaultValues.sets),
            'reps': new FormControl(defaultValues.reps),
            '%1rm': new FormControl(defaultValues.percentageOfOneRepMax),
            'rpe': new FormControl(defaultValues.rateOfPerceivedExertion),
            'tempo': new FormControl(defaultValues.tempo),
            'rest': new FormControl(defaultValues.rest),
        });
        this.standardExerciseRoutines.insert(index, routineGroup);
    }

    onSubmit(form) {
        try {
            const values = this.createWorkoutFromForm();
            if (this.defaultValue === undefined || this.isCustom) {
                this.formSubmit.emit(values);
            } else {
                const changes = { ...Delta.object(this.defaultValue, values), 'id': this.defaultValue.id };
                this.formSubmit.emit(changes);
            }
        } catch (error) {
            this.toastService.failed(`Could not submit workout`, error);
        }
    }

    createWorkoutFromForm(): Partial < Workout > {
        const workout: Workout = this.form.getRawValue();
        let values: Partial < Workout > ;
        values = {
            'id': this.getSlug(workout.name),
            'name': workout.name,
            'standardPhase': workout.standardPhase,
            'intervalPhase': workout.intervalPhase,
            // 'exercises': this.orderedList,
            // 'exerciseRoutines': this.getExerciseRoutinesValue(workout),
            'dateCreated': new Date(),
            'photoURL': '',
        };
        return values;
    }

    nameHasChanged() {
        return this.defaultValue !== undefined && this.defaultValue.name !== this.name.value;
    }

    getSlug(name: string) {
        return transformToSlug(name);
    }

    verifyWorkoutIsUnique(ctrl: AbstractControl): Promise < ValidationErrors | null > {
        if (this.isCustom) { return Promise.resolve(null); }
        return validateDocIDIsUnique(`workouts`, ctrl, this.firestore);
    }

    getExerciseRoutinesValue(workout: Workout) {
        const routinesRaw = this.standardExerciseRoutines.getRawValue();
        const exerciseRoutines = {};
        // workout.exercises.forEach((exercise, i) => {
        //     exerciseRoutines[exercise.id] = routinesRaw[i];
        // });
        return exerciseRoutines;
    }

    /**
     * Get the name of an exercise from the exercises control specified by index
     * @param index the index of the exercises value array
     */
    getExerciseName(index: number) {
        return this.standardExercises.value[index].name;
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

    drop(event: CdkDragDrop < string[] > ) {
        this.rearrangeExerciseRoutineControls(event);
        this.rearrangeOrderedList(event);
    }

    rearrangeOrderedList(event: CdkDragDrop < string[] > ) {
        const array = [...this.orderedList];
        moveItemInArray(array, event.previousIndex, event.currentIndex);
        this.orderedList = array;
    }

    rearrangeExerciseRoutineControls(event: CdkDragDrop < string[] > ) {
        const array = this.standardExerciseRoutines.getRawValue();
        moveItemInArray(array, event.previousIndex, event.currentIndex);
        this.standardExerciseRoutines.setValue(array);
    }

}
