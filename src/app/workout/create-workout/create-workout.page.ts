import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/state/app.state';
import { CreateRequested } from '../../core/state/workouts/workouts.actions';

@Component({
    'selector': 'app-create-workout',
    'templateUrl': './create-workout.page.html',
    'styleUrls': ['./create-workout.page.scss'],
})
export class CreateWorkoutPage implements OnInit {

    constructor(
        public store: Store < AppState > ,
    ) {}

    ngOnInit() {}

    onSubmit(workout) {
        this.store.dispatch(new CreateRequested(workout));
    }

}
