import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Program } from 'src/app/core/state/program/program.model';

@Component({
    'selector': 'app-create-custom-program',
    'templateUrl': './create-custom-program.component.html',
    'styleUrls': ['./create-custom-program.component.scss'],
})
export class CreateCustomProgramComponent implements OnInit {

    constructor(
        public modalController: ModalController
    ) {}

    ngOnInit() {}

    onSubmit(program: Program) {
        this.modalController.dismiss({ 'program': program }, undefined, 'create-custom-program');
    }


}
