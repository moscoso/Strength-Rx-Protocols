import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Workout } from 'src/app/core/state/workouts/workouts.state';
import { AllRequested, DeleteRequested } from 'src/app/core/state/workouts/workouts.actions';
import { Store } from '@ngrx/store';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { selectUserIsTrainer } from 'src/app/core/state/profile/profile.selector';
import { selectWorkoutByRouteURL } from 'src/app/core/state/workouts/workouts.selector';
import { filter, take } from 'rxjs/operators';
import { AppState } from 'src/app/core/state/app.state';
import { EditWorkoutPage } from '../edit-workout/edit-workout.page';

@Component({
    'selector': 'app-workout-detail',
    'templateUrl': './workout-detail.page.html',
    'styleUrls': ['./workout-detail.page.scss'],
})
export class WorkoutDetailPage implements OnInit {

    workout$: Observable < Workout > ;
    isTrainer$: Observable < boolean > ;

    constructor(
        public store: Store,
        public modalCtrl: ModalController,
        public actionSheetCtrl: ActionSheetController,
    ) {}

    ngOnInit() {
        this.store.dispatch(new AllRequested());
        this.workout$ = this.store.select(
            selectWorkoutByRouteURL
        );
        this.isTrainer$ = this.store.select(
            selectUserIsTrainer
        );
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

    async showEditModal(): Promise < void > {
        const modal = await this.modalCtrl.create({
            'id': 'edit-workout',
            'component': EditWorkoutPage
        });
        await modal.present();
        return;
    }

    async showActionSheetToDelete(): Promise < void > {
        const actionSheet = await this.actionSheetCtrl.create({
            'id': 'delete-workout',
            'header': 'Are you sure you want to delete?',
            'buttons': [
            {
                'text': 'Delete',
                'role': 'destructive',
                'icon': 'trash',
                'handler': () => {this.requestDelete(); }
            }, {
                'text': 'Cancel',
                'role': 'cancel'
            }],
        });
        actionSheet.present();
    }

    async requestDelete(): Promise < void > {
        const workout = await this.workout$.pipe(take(1)).toPromise();
        this.store.dispatch(new DeleteRequested(workout.id));
    }

}
