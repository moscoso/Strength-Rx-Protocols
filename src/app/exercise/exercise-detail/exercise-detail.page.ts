import { Component, OnInit } from '@angular/core';
import { Observable, pipe, of } from 'rxjs';
import { filter, take, first } from 'rxjs/operators';
import { Exercise } from 'src/app/core/state/exercises/exercises.state';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { EditExerciseComponent } from '../edit-exercise/edit-exercise.component';
import { ExerciseStoreDispatcher } from 'src/app/core/state/exercises/exercises.dispatcher';
import { ProfileStoreDispatcher } from 'src/app/core/state/profile/profiles.dispatcher';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
    'selector': 'app-exercise',
    'templateUrl': './exercise-detail.page.html',
    'styleUrls': ['./exercise-detail.page.scss'],
})
export class ExerciseDetailPage implements OnInit {

    exercise$: Observable < Exercise > ;
    isTrainer$: Observable < boolean > = of(false);
    alternateExercises: Exercise[] = [];

    constructor(
        public profileService: ProfileStoreDispatcher,
        public exerciseService: ExerciseStoreDispatcher,
        public modalCtrl: ModalController,
        public actionSheetCtrl: ActionSheetController,
    ) {}

    ngOnInit() {
        this.exerciseService.loadAll();
        this.exercise$ = this.exerciseService.selectExerciseByRouteURL();
        this.isTrainer$ = this.profileService.selectUserIsTrainer();

        this.exercise$.pipe(first(exercise => exercise != null), untilDestroyed(this)).subscribe(exercise => {
            const alternateExercises = [];
            if (!exercise.alternateIDs) { return; }
            exercise.alternateIDs.forEach(async (alternateID) => {
                const alternateExercise = await this.exerciseService.selectExercise(alternateID)
                    .pipe(first(e => e != null)).toPromise();
                alternateExercises.push(alternateExercise);
            });
            this.alternateExercises = alternateExercises;
        });
    }

    doRefresh(event): void {
        this.exerciseService.loadAll();
        this.exerciseService.selectRequestInProgress().pipe(
            filter(requestInProgress => requestInProgress === false),
            take(1),
        ).toPromise().then(() => {
            event.target.complete();
        });
    }

    async showEditModal(): Promise < void > {
        const modal = await this.modalCtrl.create({
            'id': 'edit-exercise',
            'component': EditExerciseComponent,
            'cssClass': 'modal-80-width'
        });
        await modal.present();
        return;
    }

    async showActionSheetToDelete(): Promise < void > {
        const actionSheet = await this.actionSheetCtrl.create({
            'id': 'delete-exercise',
            'header': 'Are you sure you want to delete?',
            'buttons': [
            {
                'text': 'Delete',
                'role': 'destructive',
                'icon': 'trash',
                'handler': () => { this.requestDelete(); }
            }, {
                'text': 'Cancel',
                'role': 'cancel'
            }],
        });
        actionSheet.present();
    }

    async requestDelete(): Promise < void > {
        const exercise = await this.exercise$.pipe(take(1)).toPromise();
        this.exerciseService.delete(exercise.id);
    }

}
