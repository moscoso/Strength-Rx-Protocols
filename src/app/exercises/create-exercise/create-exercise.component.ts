import { Component, OnInit } from '@angular/core';
import { CreateRequested } from 'src/app/core/state/exercises/exercises.actions';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/state/app.state';

@Component({
    'selector': 'app-create-exercise',
    'templateUrl': './create-exercise.component.html',
    'styleUrls': ['./create-exercise.component.scss'],
})
export class CreateExerciseComponent implements OnInit {

    constructor(
        public modalController: ModalController,
        public store: Store < AppState > ,
    ) {}

    ngOnInit() {}

    dismiss() {
        this.modalController.dismiss('create-exercise');
    }

    onSubmit(exercise: any) {
        this.store.dispatch(new CreateRequested(exercise));
    }

}
