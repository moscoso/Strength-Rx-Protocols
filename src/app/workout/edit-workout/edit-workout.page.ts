import { Component, OnInit } from '@angular/core';
import { WorkoutStoreDispatcher } from 'src/app/core/state/workouts/workouts.dispatcher';

@Component({
    'selector': 'app-edit-workout',
    'templateUrl': './edit-workout.page.html',
    'styleUrls': ['./edit-workout.page.scss'],
})
export class EditWorkoutPage implements OnInit {

    constructor(
        public workoutService: WorkoutStoreDispatcher
    ) {}

    ngOnInit() {}

    onSubmit(workout) {
        this.workoutService.update(workout.id, workout);
    }
}
