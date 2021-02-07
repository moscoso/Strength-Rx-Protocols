import { Component, OnInit } from '@angular/core';
import { WorkoutFacade } from 'src/app/core/state/workout/workouts.facade';

@Component({
    'selector': 'app-edit-workout',
    'templateUrl': './edit-workout.page.html',
    'styleUrls': ['./edit-workout.page.scss'],
})
export class EditWorkoutPage implements OnInit {

    constructor(
        public workoutService: WorkoutFacade
    ) {}

    ngOnInit() {}

    onSubmit(workout) {
        this.workoutService.update(workout.id, workout);
    }
}
