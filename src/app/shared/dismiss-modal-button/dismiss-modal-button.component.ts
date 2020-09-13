import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
    'selector': 'dismiss-modal-button',
    'templateUrl': './dismiss-modal-button.component.html',
})
export class DismissModalButtonComponent implements OnInit {

    overlayExists = false;
    @Input() buttonText = 'Dismiss';
    @Input() modalID: string;

    constructor(private modalController: ModalController) {}

    ngOnInit() {
        this.checkForOverlay();
    }

    async checkForOverlay() {
        const overlay = await this.modalController.getTop();
        this.overlayExists = overlay != null;
    }

    dismiss() {
        this.modalController.dismiss(this.modalID);
    }

}
