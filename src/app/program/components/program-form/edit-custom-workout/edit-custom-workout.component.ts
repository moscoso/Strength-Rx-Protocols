import { Component, OnInit, Input } from '@angular/core';
import { Workout } from 'src/app/core/state/workouts/workouts.state';
import { ModalController } from '@ionic/angular';

@Component({
    'selector': 'edit-custom-workout',
    'templateUrl': './edit-custom-workout.component.html',
    'styleUrls': ['./edit-custom-workout.component.scss'],
})
export class EditCustomWorkoutComponent implements OnInit {

    @Input() workout: Workout;
    customWorkout: Workout;

    constructor(public modalController: ModalController) {}

    ngOnInit() {
        this.customWorkout = this.workout;
    }

    onSubmit(workout: Workout) {
        this.modalController.dismiss({'workout': workout}, undefined, 'edit-custom-workout');
    }

}
