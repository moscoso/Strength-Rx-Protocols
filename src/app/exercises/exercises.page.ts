import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateExercisePage } from '../create-exercise/create-exercise.page';

@Component({
    'selector': 'app-exercises',
    'templateUrl': './exercises.page.html',
    'styleUrls': ['./exercises.page.scss'],
})
export class ExercisesPage implements OnInit {

    constructor(
        public modalController: ModalController
    ) {
    }

    ngOnInit(): void {}

    async presentModal(): Promise < void > {
        const modal = await this.modalController.create({
            'id': 'create-exercise',
            'component': CreateExercisePage
        });
        await modal.present();
        return;
    }
}
