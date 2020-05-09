import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
    'selector': 'app-create-exercise',
    'templateUrl': './create-exercise.page.html',
    'styleUrls': ['./create-exercise.page.scss'],
})
export class CreateExercisePage implements OnInit {


    videoURL = '';
    name = '';
    instructions = '';

    constructor(
        public modalController: ModalController
    ) {}

    ngOnInit() {}

    dismiss() {
        this.modalController.dismiss('create-exercise');
    }

    onSubmit() {
        console.log(this.videoURL);
        console.log(this.name);
        console.log(this.instructions);
    }

}
