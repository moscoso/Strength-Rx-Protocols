import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { ExerciseFacade } from 'src/app/core/state/exercises/exercises.facade';
import { Exercise } from 'src/app/core/state/exercises/exercise.model';
import { Program } from 'src/app/core/state/program/program.model';
import { WorkoutFacade } from 'src/app/core/state/workout/workouts.facade';
import {
    INIT_INTERVAL_SUPERSET,
    IntervalExerciseRoutine,
    IntervalPhase,
    IntervalSuperSet,
    Workout
} from 'src/app/core/state/workout/workout.model';

@Component({
    'selector': 'app-interval-phase-form',
    'templateUrl': './interval-phase-form.component.html',
    'styleUrls': ['./interval-phase-form.component.scss'],
})
export class IntervalPhaseFormComponent implements OnInit {

    @Input() workout: Workout;

    form: FormGroup;

    numberOfSupersets = new FormControl(1, [Validators.required, Validators.min(1), Validators.max(7)]);
    supersets: FormArray;
    requestInProgress$: Observable < boolean > ;
    exerciseList$: Observable < Exercise[] > = of ([]);

    defaultValue: Program;

    constructor(
        public workoutService: WorkoutFacade,
        public exerciseService: ExerciseFacade,
    ) {}

    ngOnInit() {
        this.supersets = new FormArray([this.buildSupersetFormControl()]);
        this.form = new FormGroup({
            'numberOfSupersets': this.numberOfSupersets,
            'supersets': this.supersets
        });
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
        this.numberOfSupersets.valueChanges.subscribe((n: number) => {
            this.updateSupersetsFormGroup(n);
        });
    }

    initFormValues(workout: Workout) {
        const intervalPhase = workout.intervalPhase;
        if (intervalPhase != null) {
            this.numberOfSupersets.setValue(intervalPhase.supersets.length);
            this.supersets = new FormArray([]);
            intervalPhase.supersets.forEach((superset, index) => {
                this.supersets.insert(index, this.buildSupersetFormControl(superset));
            });
        }
    }

    updateSupersetsFormGroup(n: number) {
        const difference = Math.abs(this.supersets.length - n);
        const phasesAdded = this.supersets.length < n;
        const phasesRemoved = this.supersets.length > n;
        if (phasesAdded) {
            for (let i = 0; i < difference; i++) {
                this.appendSupersetFormcontrol();
            }
        } else if (phasesRemoved) {
            for (let i = 0; i < difference; i++) {
                const lastIndex = this.supersets.length - 1;
                this.supersets.removeAt(lastIndex);
            }
        }
    }

    buildSupersetFormControl(superset: IntervalSuperSet = INIT_INTERVAL_SUPERSET): FormGroup {

        const exerciseRoutines: FormArray = new FormArray([]);
        superset.exerciseRoutines.forEach(routine => {
            exerciseRoutines.insert(exerciseRoutines.length, this.buildExerciseRoutineFormControl(routine));
        });

        return new FormGroup({
            'sets': new FormControl(superset.sets, [Validators.required, Validators.min(1), Validators.max(100)]),
            'exerciseRoutines': exerciseRoutines
        });
    }

    buildExerciseRoutineFormControl(exerciseRoutine: IntervalExerciseRoutine = {'exercise': null, 'reps': 'AMRAP', 'duration': 30}) {
        return new FormGroup({
            'exercise': new FormControl(exerciseRoutine.exercise),
            'reps': new FormControl(exerciseRoutine.reps, Validators.required),
            'duration': new FormControl(exerciseRoutine.duration),
        });
    }

    appendSupersetFormcontrol(superset: IntervalSuperSet = INIT_INTERVAL_SUPERSET): void {
        const formGroup: FormGroup = this.buildSupersetFormControl(superset);
        const length = this.supersets.length;
        this.supersets.insert(length, formGroup);
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

    addExerciseRoutine(exerciseRoutines: FormArray): void {
        const exerciseRoutine: FormGroup = new FormGroup({
            'exercise': new FormControl(null),
            'reps': new FormControl('AMRAP', Validators.required),
            'duration': new FormControl(30),
        });
        exerciseRoutines.insert(exerciseRoutines.length, exerciseRoutine);
    }

    removeExerciseRoutine(exerciseRoutines: FormArray, index: number): void {
        exerciseRoutines.removeAt(index);
    }

    resetControl(control: FormControl) {
        control.setValue(null);
        control.markAsTouched();
    }

    getListOfIntegers(i: number) {
        return new Array(i).map(x => x + 1);
    }

    getExerciseRoutinesControls(superset: FormGroup): AbstractControl[] {
        const controls = (superset.controls.exerciseRoutines as FormArray).controls;
        return controls;
    }

    public getValue(): IntervalPhase {
        const supersetsRaw = this.supersets.getRawValue();
        return {
            'supersets': supersetsRaw,
        };
    }
}
