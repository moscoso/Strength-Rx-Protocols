import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
    'selector': 'app-create-exercise',
    'templateUrl': './create-exercise.page.html',
    'styleUrls': ['./create-exercise.page.scss'],
})
export class CreateExercisePage implements OnInit {

    name = new FormControl('', [Validators.required]);
    videoURL = new FormControl('', [Validators.required]);
    instructions = new FormControl('', [Validators.required]);

    form: FormGroup;

    constructor(
        public modalController: ModalController
    ) {}

    ngOnInit() {
        this.form = new FormGroup({
            'name': this.name,
            'videoURL': this.videoURL,
            'instructions': this.instructions,
        });
    }

    dismiss() {
        this.modalController.dismiss('create-exercise');
    }

    onSubmit(form) {
        console.log(form);
        console.log(this.videoURL.value);
        console.log(this.name.value);
        console.log(this.instructions.value);
    }

}
