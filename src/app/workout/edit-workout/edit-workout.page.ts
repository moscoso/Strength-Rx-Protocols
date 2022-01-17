import { Component } from '@angular/core';
import { WorkoutFacade } from 'src/app/core/state/workout/workout.facade';

@Component({
    'selector': 'app-edit-workout',
    'templateUrl': './edit-workout.page.html',
    'styleUrls': ['./edit-workout.page.scss'],
})
export class EditWorkoutPage {

    constructor(
        public workoutService: WorkoutFacade
    ) {}

    onSubmit(workout) {
        this.workoutService.update(workout.id, workout);
    }
}
