import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormControl, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Exercise } from 'src/app/core/state/exercises/exercises.state';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/state/app.state';
import { Workout } from 'src/app/core/state/workouts/workouts.state';
import { AllRequested } from 'src/app/core/state/exercises/exercises.actions';
import * as fromExercises from 'src/app/core/state/exercises/exercises.selector';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { transformToSlug } from 'src/util/slug/transformToSlug';
import { AngularFirestore } from '@angular/fire/firestore';
import { validateDocIDIsUnique } from 'src/util/verifyDocIsUnique/verifyDocIsUnique';
import { selectWorkoutByRouteURL } from 'src/app/core/state/workouts/workouts.selector';
import { first } from 'rxjs/operators';

@Component({
    'selector': 'workout-form',
    'templateUrl': './workout-form.component.html',
    'styleUrls': ['./workout-form.component.scss'],
})
export class WorkoutFormComponent implements OnInit {

    @Input() buttonText = 'Submit';
    @Output() formSubmit = new EventEmitter < Partial < Workout >> ();

    name = new FormControl('', {
        'updateOn': 'blur',
        'validators': Validators.required,
        'asyncValidators': this.verifyWorkoutIsUnique.bind(this)
    });
    exercises = new FormControl([], [Validators.required]);

    form: FormGroup;

    exerciseList$: Observable < Exercise[] > = of ([]);
    requestInProgress$: Observable < boolean > ;

    constructor(
        public store: Store < AppState > ,
        public toastService: ToastService,
        public firestore: AngularFirestore,
        public ref: ChangeDetectorRef,
    ) {
        this.store.dispatch(new AllRequested());
    }

    ngOnInit() {
        this.form = new FormGroup({
            'name': this.name,
            'exercises': this.exercises,
        });
        this.requestInProgress$ = this.store.select((state: AppState) => state.workouts.requestInProgress);
        this.store.select(selectWorkoutByRouteURL).pipe(first()).toPromise().then(workout => {
            if (workout) {
                this.initFormValues(workout);
            }
        });
        this.exerciseList$ = this.store.select(fromExercises.selectAll);
    }

    initFormValues(workout: Workout) {
        this.name.setValue(workout.name);
        this.name.disable();
        this.exercises.setValue(workout.exercises);
        // Required trigger change detection to update the view of mat-select
        this.ref.markForCheck();
    }

    onSubmit(form) {
        const workout = this.form.getRawValue();
        try {
            let values: Partial < Workout > ;
            values = {
                'id': this.getSlug(workout.name),
                'name': workout.name,
                'exercises': workout.exercises,
                'exerciseRoutines': {},
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

}
