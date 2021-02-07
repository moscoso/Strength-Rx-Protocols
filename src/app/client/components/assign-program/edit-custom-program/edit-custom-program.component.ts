import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Program } from 'src/app/core/state/program/program.model';

@Component({
    'selector': 'app-edit-custom-program',
    'templateUrl': './edit-custom-program.component.html',
    'styleUrls': ['./edit-custom-program.component.scss'],
})
export class EditCustomProgramComponent implements OnInit {

    @Input() program: Program;
    customProgram: Program;

    constructor(public modalController: ModalController) {}

    ngOnInit() {
        this.customProgram = this.program;
    }

    onSubmit(program: Program) {
        this.modalController.dismiss({'program': program}, undefined, 'edit-custom-program');
    }

}
