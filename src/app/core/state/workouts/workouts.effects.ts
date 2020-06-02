import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { WorkoutAction, WorkoutActionType} from './workouts.actions';
import * as Workouts from './workouts.actions';
import { WorkoutService } from '../../firebase/workout/workout.service';
import { ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Injectable()
export class WorkoutEffects {

    @Effect({'dispatch': false}) error$: Observable<WorkoutAction> = this.actions$.pipe(
        ofType(WorkoutActionType.RequestFailed),
        tap((action: Workouts.RequestFailed) => {
            this.toaster.failed('Something went wrong', action.error.error.code);
        })
    );

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
                .then((workout) => {
                    return new Workouts.Created(workout);
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
        private toaster: ToastService,
    ) {}
}
