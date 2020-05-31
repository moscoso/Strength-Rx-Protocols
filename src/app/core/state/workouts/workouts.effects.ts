import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { WorkoutAction, WorkoutActionType} from './workouts.actions';
import * as Workouts from './workouts.actions';
import { WorkoutService } from '../../firebase/workout/workout.service';
import { ModalController } from '@ionic/angular';

@Injectable()
export class WorkoutEffects {

    @Effect() allRequested$: Observable < WorkoutAction > = this.actions$.pipe(
        ofType<WorkoutAction>(WorkoutActionType.AllRequested),
        switchMap((action: Workouts.AllRequested) => {
            return from(this.workoutService.getAll()
                .then(workouts => {
                    return new Workouts.AllLoaded(workouts);
                })
                .catch(error => {
                    return new Workouts.RequestFailed({
                        'error': error
                    });
                })
            );
        })
    );

    @Effect() createRequested$: Observable < WorkoutAction > = this.actions$.pipe(
        ofType<WorkoutAction>(WorkoutActionType.CreateRequested),
        switchMap((action: Workouts.CreateRequested) => {
            return from(this.workoutService.create(action.workout)
                .then(() => {
                    return new Workouts.Created();
                })
                .catch(error => {
                    return new Workouts.RequestFailed({
                        'error': error
                    });
                })
            );
        })
    );

    @Effect({'dispatch': false}) createCompleted$: Observable < WorkoutAction > = this.actions$.pipe(
        ofType<WorkoutAction>(WorkoutActionType.Created),
        tap((action: Workouts.CreateRequested) => {
            this.modalController.dismiss();
        })
    );

    constructor(
        private workoutService: WorkoutService,
        private actions$: Actions,
        private modalController: ModalController,
    ) {}
}
