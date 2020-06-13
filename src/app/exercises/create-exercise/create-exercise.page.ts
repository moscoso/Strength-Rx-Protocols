import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControl, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CreateRequested } from '../../core/state/exercises/exercises.actions';
import { AppState } from '../../core/state/app.state';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
    'selector': 'app-create-exercise',
    'templateUrl': './create-exercise.page.html',
    'styleUrls': ['./create-exercise.page.scss'],
})
export class CreateExercisePage implements OnInit {

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
