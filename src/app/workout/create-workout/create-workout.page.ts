import { Component } from '@angular/core';
import { WorkoutFacade } from 'src/app/core/state/workout/workout.facade';

@Component({
    'selector': 'app-create-workout',
    'templateUrl': './create-workout.page.html',
    'styleUrls': ['./create-workout.page.scss'],
})
export class CreateWorkoutPage {

    constructor(
        public workoutService: WorkoutFacade
    ) {}

    onSubmit(workout) {
        this.workoutService.create(workout);
    }

}
