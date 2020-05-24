import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AppState } from '../core/state/app.state';
import { Workout } from '../core/state/workouts/workouts.state';
import { CreateRequested } from '../core/state/workouts/workouts.actions';
import * as fromExercises from '../core/state/exercises/exercises.selector';
import { Exercise } from '../core/state/exercises/exercises.state';
import { AllRequested } from '../core/state/exercises/exercises.actions';

@Component({
    'selector': 'app-create-workout',
    'templateUrl': './create-workout.page.html',
    'styleUrls': ['./create-workout.page.scss'],
})
export class CreateWorkoutPage implements OnInit {

    name = new FormControl('', [Validators.required]);
    exercises = new FormControl([], [Validators.required]);

    form: FormGroup;

    exerciseList$: Observable < Exercise[] > = of ([]);
    requestInProgress$: Observable < boolean > ;

    constructor(
        public modalController: ModalController,
        public store: Store < AppState > ,
    ) {
        this.store.dispatch(new AllRequested());
    }

    ngOnInit() {
        this.form = new FormGroup({
            'name': this.name,
            'exercises': this.exercises,
        });
        this.exerciseList$ = this.store.select(fromExercises.selectAll);
        this.requestInProgress$ = this.store.select((state: AppState) => state.workouts.requestInProgress);
    }

    dismiss() {
        this.modalController.dismiss('create-workout');
    }

    onSubmit(form) {
        const workout: Workout = {
            'id': form.id,
            'name': form.name,
            'exercises': form.exercises,
            'exerciseRoutines': {},
        };
        this.store.dispatch(new CreateRequested(workout));
    }

}
