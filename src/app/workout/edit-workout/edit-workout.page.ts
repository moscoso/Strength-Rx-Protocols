import { Component, OnInit } from '@angular/core';
import { Updated, UpdateRequested } from 'src/app/core/state/workouts/workouts.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/state/app.state';

@Component({
    'selector': 'app-edit-workout',
    'templateUrl': './edit-workout.page.html',
    'styleUrls': ['./edit-workout.page.scss'],
})
export class EditWorkoutPage implements OnInit {

    constructor(
        public store: Store < AppState > ,
    ) {}

    ngOnInit() {}

    onSubmit(workout) {
        this.store.dispatch(new UpdateRequested(workout.id, workout));
    }
}
