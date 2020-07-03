import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { WorkoutAction, WorkoutActionType } from './workouts.actions';
import * as Workouts from './workouts.actions';
import { WorkoutService } from '../../firebase/workout/workout.service';
import { ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { Router } from '@angular/router';

@Injectable()
export class WorkoutEffects {

    @Effect({ 'dispatch': false }) error$: Observable < WorkoutAction > = this.actions$.pipe(
        ofType(WorkoutActionType.RequestFailed),
        tap((action: Workouts.RequestFailed) => {
            console.log(action);
            this.toaster.failed('Workouts failed', action.error.message);
        })
    );

    @Effect() allRequested$: Observable < WorkoutAction > = this.actions$.pipe(
        ofType < WorkoutAction > (WorkoutActionType.AllRequested),
        switchMap((action: Workouts.AllRequested) => {
            return from(this.workoutService.getAll()
                .then(workouts => {
                    return new Workouts.AllLoaded(workouts);
                })
                .catch(error => new Workouts.RequestFailed(error))
            );
        })
    );

    @Effect() createRequested$: Observable < WorkoutAction > = this.actions$.pipe(
        ofType < WorkoutAction > (WorkoutActionType.CreateRequested),
        switchMap((action: Workouts.CreateRequested) => {
            return from(this.workoutService.create(action.workout)
                .then((workout) => {
                    return new Workouts.Created(workout);
                })
                .catch(error => new Workouts.RequestFailed(error))
            );
        })
    );


    @Effect() updateRequested$: Observable < WorkoutAction > = this.actions$.pipe(
        ofType < WorkoutAction > (WorkoutActionType.UpdateRequested),
        switchMap((action: Workouts.UpdateRequested) => {
            return from(this.workoutService.update(action.id, action.changes)
                .then(() => {
                    return new Workouts.Updated(action.id, action.changes);
                })
                .catch(error => new Workouts.RequestFailed(error))
            );
        })
    );

    @Effect() deleteRequested$: Observable < WorkoutAction > = this.actions$.pipe(
        ofType < WorkoutAction > (WorkoutActionType.DeleteRequested),
        switchMap((action: Workouts.DeleteRequested) => {
            return from(this.workoutService.delete(action.id)
                .then(() => {
                    return new Workouts.Deleted(action.id);
                })
                .catch(error => new Workouts.RequestFailed(error))
            );
        })
    );

    @Effect({ 'dispatch': false }) formCompleted$: Observable < WorkoutAction > = this.actions$.pipe(
        ofType < WorkoutAction > (WorkoutActionType.Created, WorkoutActionType.Updated),
        tap((action: Workouts.CreateRequested) => {
            this.modalController.dismiss();
        })
    );

    @Effect({'dispatch': false}) deleteCompleted$: Observable < WorkoutAction > = this.actions$.pipe(
        ofType<WorkoutAction>(WorkoutActionType.Deleted),
        tap((action: Workouts.CreateRequested) => {
            this.router.navigateByUrl('/workouts');
        })
    );

    constructor(
        private workoutService: WorkoutService,
        private actions$: Actions,
        private modalController: ModalController,
        private toaster: ToastService,
        private router: Router,
    ) {}

    /**
     * Generate a RequestFailed action
     * @param error the error to pass to the payload
     */
    private requestFailed(error): Workouts.RequestFailed {
        console.error(error);
        return ;
    }
}
