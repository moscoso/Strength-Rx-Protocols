import { Component, OnInit } from '@angular/core';
import { WorkoutStoreDispatcher } from 'src/app/core/state/workout/workouts.dispatcher';

@Component({
    'selector': 'app-create-workout',
    'templateUrl': './create-workout.page.html',
    'styleUrls': ['./create-workout.page.scss'],
})
export class CreateWorkoutPage implements OnInit {

    constructor(
        public workoutService: WorkoutStoreDispatcher
    ) {}

    ngOnInit() {}

    onSubmit(workout) {
        this.workoutService.create(workout);
    }

}
