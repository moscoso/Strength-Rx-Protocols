import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateExercisePage } from '../create-exercise/create-exercise.page';
import * as fromExercises from '../core/state/exercises/exercises.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Exercise } from '../core/state/exercises/exercises.state';
import { AllExercisesRequested } from '../core/state/exercises/exercises.actions';
import { AppState } from '../core/state/app.state';
import { takeUntil, take, filter } from 'rxjs/operators';

@Component({
    'selector': 'app-exercises',
    'templateUrl': './exercises.page.html',
    'styleUrls': ['./exercises.page.scss'],
})
export class ExercisesPage implements OnInit {

    exercises$: Observable<Exercise[]>;
    requestInProgress$: Observable<boolean>;

    constructor(
        public modalController: ModalController,
        public store: Store,
    ) {}

    ngOnInit(): void {
        this.store.dispatch(new AllExercisesRequested());
        this.exercises$ = this.store.select(fromExercises.selectAll);
        this.requestInProgress$ = this.store.select((state: AppState) => state.exercises.requestInProgress);
    }

    doRefresh(event): void {
        console.log('Begin async operation');
        this.store.dispatch(new AllExercisesRequested());
        this.store.select((state: AppState) => state.exercises.requestInProgress).pipe(
            filter(requestInProgress => requestInProgress === false),
            take(1),
        ).toPromise().then(() => {
            event.target.complete();
        });
    }

    async presentModal(): Promise < void > {
        const modal = await this.modalController.create({
            'id': 'create-exercise',
            'component': CreateExercisePage
        });
        await modal.present();
        return;
    }
}
