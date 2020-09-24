import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Workout, ExerciseRoutine } from 'src/app/core/state/workouts/workouts.state';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { EditWorkoutPage } from '../edit-workout/edit-workout.page';
import { WorkoutStoreDispatcher } from 'src/app/core/state/workouts/workouts.dispatcher';
import { ProfileStoreDispatcher } from 'src/app/core/state/profile/profiles.dispatcher';

@Component({
    'selector': 'app-workout-detail',
    'templateUrl': './workout-detail.page.html',
    'styleUrls': ['./workout-detail.page.scss'],
})
export class WorkoutDetailPage implements OnInit {

    workout$: Observable < Workout > ;
    isTrainer$: Observable < boolean > ;

    constructor(
        public profileService: ProfileStoreDispatcher,
        public workoutService: WorkoutStoreDispatcher,
        public modalCtrl: ModalController,
        public actionSheetCtrl: ActionSheetController,
    ) {}

    ngOnInit() {
        this.workoutService.loadAll();
        this.workout$ = this.workoutService.selectWorkoutByRouteURL().pipe(first(workout => workout != null));
        this.isTrainer$ = this.profileService.selectUserIsTrainer();

        this.workout$.subscribe(x => console.log(x));
    }

    doRefresh(event): void {
        this.workoutService.loadAll();
        this.workoutService.selectRequestInProgress().pipe(
            first(requestInProgress => requestInProgress === false),
        ).toPromise().then(() => {
            event.target.complete();
        });
    }

    async showEditModal(): Promise < void > {
        const modal = await this.modalCtrl.create({
            'id': 'edit-workout',
            'component': EditWorkoutPage,
            'cssClass': 'modal-80-width'
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
        const workout = await this.workout$.pipe(first()).toPromise();
        this.workoutService.delete(workout.id);
    }

    getNotes(routine: ExerciseRoutine) {
        if (!routine) { console.warn('getNotes failed because routine is undefined'); return; }

        let note = '';
        if (routine.sets) { note += `Sets: ${routine.sets} `; }
        if (routine.reps) { note += `Reps: ${routine.reps} `; }
        if (routine.percentageOfOneRepMax) { note += `%1RM: ${routine.percentageOfOneRepMax} `; }
        if (routine.rateOfPerceivedExertion) { note += `RPE: ${routine.rateOfPerceivedExertion} `; }
        if (routine.tempo) { note += `Tempo: ${routine.rateOfPerceivedExertion} `; }
        if (routine.rest) { note += `Rest: ${routine.rateOfPerceivedExertion} `; }

        return note;
    }

}
