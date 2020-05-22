import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CreateRequested } from '../core/state/exercises/exercises.actions';
import { Exercise } from '../core/state/exercises/exercises.state';
import { AppState } from '../core/state/app.state';
import { Observable } from 'rxjs';

@Component({
    'selector': 'app-create-exercise',
    'templateUrl': './create-exercise.page.html',
    'styleUrls': ['./create-exercise.page.scss'],
})
export class CreateExercisePage implements OnInit {

    name = new FormControl('', [Validators.required]);
    videoURL = new FormControl('', []);
    instructions = new FormControl('', []);

    form: FormGroup;

    requestInProgress: Observable<boolean>;

    constructor(
        public modalController: ModalController,
        public store: Store,
    ) {}

    ngOnInit() {
        this.form = new FormGroup({
            'name': this.name,
            'videoURL': this.videoURL,
            'instructions': this.instructions,
        });

        this.requestInProgress = this.store.select((state: AppState) => state.exercises.requestInProgress);
    }

    dismiss() {
        this.modalController.dismiss('create-exercise');
    }

    onSubmit(form) {
        const exercise: Exercise = {
            'id': form.name,
            'name': form.name,
            'videoURL': form.videoURL,
            'instructions': form.instructions,
        };
        this.store.dispatch(new CreateRequested(exercise));
    }

}
