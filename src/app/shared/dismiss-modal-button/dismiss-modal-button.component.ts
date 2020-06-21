import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
    'selector': 'dismiss-modal-button',
    'templateUrl': './dismiss-modal-button.component.html',
})
export class DismissModalButtonComponent implements OnInit {

    @Input() modalID: string;

    constructor(private modalController: ModalController) {}

    ngOnInit() {}

    dismiss() {
        this.modalController.dismiss(this.modalID);
    }

}
