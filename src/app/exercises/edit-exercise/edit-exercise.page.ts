import { Component, OnInit } from '@angular/core';
import { UpdateRequested } from 'src/app/core/state/exercises/exercises.actions';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/state/app.state';

@Component({
    'selector': 'app-edit-exercise',
    'templateUrl': './edit-exercise.page.html',
    'styleUrls': ['./edit-exercise.page.scss'],
})
export class EditExercisePage implements OnInit {
    constructor(
        public modalController: ModalController,
        public store: Store < AppState > ,
    ) {}

    ngOnInit() {}

    dismiss() {
        this.modalController.dismiss('edit-exercise');
    }

    onSubmit(exercise: any) {
        this.store.dispatch(new UpdateRequested(exercise.id, exercise));
    }
}
