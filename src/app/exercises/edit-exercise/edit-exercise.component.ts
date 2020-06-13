import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/state/app.state';
import { UpdateRequested } from 'src/app/core/state/exercises/exercises.actions';

@Component({
    'selector': 'app-edit-exercise',
    'templateUrl': './edit-exercise.component.html',
    'styleUrls': ['./edit-exercise.component.scss'],
})
export class EditExerciseComponent implements OnInit {
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
