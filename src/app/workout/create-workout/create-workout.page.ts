import { Component, OnInit } from '@angular/core';
import { WorkoutFacade } from 'src/app/core/state/workout/workout.facade';

@Component({
    'selector': 'app-create-workout',
    'templateUrl': './create-workout.page.html',
    'styleUrls': ['./create-workout.page.scss'],
})
export class CreateWorkoutPage implements OnInit {

    constructor(
        public workoutService: WorkoutFacade
    ) {}

    ngOnInit() {}

    onSubmit(workout) {
        this.workoutService.create(workout);
    }

}
