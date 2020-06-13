import { Component, OnInit } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromExercises from '../../core/state/exercises/exercises.selector';
import { AllRequested, DeleteRequested } from 'src/app/core/state/exercises/exercises.actions';
import { filter, take } from 'rxjs/operators';
import { AppState } from 'src/app/core/state/app.state';
import { Exercise } from 'src/app/core/state/exercises/exercises.state';
import { selectUserIsTrainer } from 'src/app/core/state/profile/profile.selector';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { EditExerciseComponent } from '../edit-exercise/edit-exercise.component';


@Component({
    'selector': 'app-exercise',
    'templateUrl': './exercise-detail.page.html',
    'styleUrls': ['./exercise-detail.page.scss'],
})
export class ExerciseDetailPage implements OnInit {

    exercise$: Observable < Exercise > ;
    isTrainer$: Observable < boolean > ;

    constructor(
        public store: Store,
        public modalCtrl: ModalController,
        public actionSheetCtrl: ActionSheetController,
    ) {}

    ngOnInit() {
        this.store.dispatch(new AllRequested());
        this.exercise$ = this.store.select(
            fromExercises.selectExerciseByRouteURL
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
            'id': 'edit-exercise',
            'component': EditExerciseComponent
        });
        await modal.present();
        return;
    }

    async showActionSheetToDelete(): Promise < void > {
        const actionSheet = await this.actionSheetCtrl.create({
            'id': 'exerciseDelete',
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
        const exercise = await this.exercise$.pipe(take(1)).toPromise();
        this.store.dispatch(new DeleteRequested(exercise.id));
    }

}
