import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AppState } from '../core/state/app.state';
import { filter, take } from 'rxjs/operators';
import { Workout } from '../core/state/workouts/workouts.state';
import * as fromWorkouts from '../core/state/workouts/workouts.selector';
import { AllRequested } from '../core/state/workouts/workouts.actions';
import { CreateWorkoutPage } from '../create-workout/create-workout.page';
@Component({
    'selector': 'app-workouts',
    'templateUrl': './workouts.page.html',
    'styleUrls': ['./workouts.page.scss'],
})
export class WorkoutsPage implements OnInit {

    workouts$: Observable < Workout[] > = of ([]);
    requestInProgress$: Observable < boolean > = of (false);

    constructor(
        public modalController: ModalController,
        public store: Store,
    ) {}

    ngOnInit(): void {
        this.store.dispatch(new AllRequested());
        this.workouts$ = this.store.select(fromWorkouts.selectAll);
        this.requestInProgress$ = this.store.select((state: AppState) => state.exercises.requestInProgress);
    }

    doRefresh(event): void {
        this.store.dispatch(new AllRequested());
        this.store.select((state: AppState) => state.exercises.requestInProgress).pipe(
            filter(requestInProgress => requestInProgress === false),
            take(1),
        ).toPromise().then(() => {
            event.target.complete();
        });
    }

    async presentModal(): Promise < void > {
        const modal = await this.modalController.create({
            'id': 'create-workout',
            'component': CreateWorkoutPage
        });
        await modal.present();
        return;
    }

}
