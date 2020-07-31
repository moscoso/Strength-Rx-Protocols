import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
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

    requestInProgress$: Observable < boolean > = of (false);
    exercise$: Observable < Exercise > ;
    isTrainer$: Observable < boolean > = of (false);
    alternateExercises: Exercise[] = [];
    loading = true;

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
        this.requestInProgress$ = this.exerciseService.selectRequestInProgress();
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

    async doRefresh(event): Promise < void > {
        this.refresh();
        this.exerciseService.selectRequestInProgress().pipe(
            first(requestInProgress => requestInProgress === false),
        ).toPromise().then(() => {event.target.complete(); });
    }

    async refresh(): Promise <void> {
        const exercise = await this.exercise$.pipe(first()).toPromise();
        this.exerciseService.refreshOne(exercise.id);
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
        const exercise = await this.exercise$.pipe(first()).toPromise();
        this.exerciseService.delete(exercise.id);
    }

}
