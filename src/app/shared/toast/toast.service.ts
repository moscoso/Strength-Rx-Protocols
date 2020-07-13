import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    'providedIn': 'root'
})
export class ToastService {

    constructor(private toastController: ToastController) {}


    async dismiss() {
        const overlay = await this.toastController.getTop();
        if (overlay) {
            this.toastController.dismiss();
        }
    }

    /**
     * Creates a generic toast with primary color then presents it
     * @param message the message to appear on the toast
     * @param duration how long the toast should appear for (in ms)
     */
    async primary(message: string, duration = 3000): Promise < void > {
        const toast = await this.toastController.create({
            'message': message,
            'duration': duration,
            'color': 'primary',
            'buttons': [{
                'text': 'Ok',
                'role': 'cancel'
            }],
        });
        toast.present();
    }

    /**
     * Creates a generic toast with the success color then presents it
     * @param message the message to appear on the toast
     * @param duration how long the toast should appear for (in ms)
     */
    async success(message: string, duration = 3000): Promise < void > {
        const toast = await this.toastController.create({
            'message': message,
            'duration': duration,
            'color': 'success',
            'buttons': [{
                'text': 'Ok',
                'role': 'cancel'
            }],
        });
        toast.present();
    }

    /**
     * Creates a generic failed toast with the failed color then presents it
     * @param message the message to appear on the toast
     * @param duration how long the toast should appear for (in ms)
     */
    async failed(header: string, message: string, duration = 10000): Promise < void > {
        const toast = await this.toastController.create({
            'header': header,
            'message': message,
            'duration': duration,
            'color': 'danger',
            'buttons': [{
                'text': 'Ok',
                'role': 'cancel'
            }],
        });
        toast.present();
    }
}
