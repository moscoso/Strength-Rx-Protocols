import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Workout } from 'src/app/core/state/workout/workout.model';

@Component({
    'selector': 'app-create-custom-workout',
    'templateUrl': './create-custom-workout.component.html',
    'styleUrls': ['./create-custom-workout.component.scss'],
})
export class CreateCustomWorkoutComponent implements OnInit {

    constructor(
        public modalController: ModalController
    ) {}

    ngOnInit() {}

    onSubmit(workout: Workout) {
        this.modalController.dismiss({'workout': workout}, undefined, 'create-custom-workout');
    }

}
