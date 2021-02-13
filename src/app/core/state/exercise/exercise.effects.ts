import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { ExerciseAction, ExerciseActionType} from './exercise.actions';
import * as Exercises from './exercise.actions';
import { ExerciseService } from '../../firebase/exercise/exercise.service';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable()
export class ExerciseEffects {

    @Effect({'dispatch': false}) error$: Observable<ExerciseAction> = this.actions$.pipe(
        ofType(ExerciseActionType.RequestFailed),
        tap((action: Exercises.RequestFailed) => {
            this.toaster.failed('Request for exercise failed', action.error);
        })
    );

    @Effect() allRequested$: Observable < ExerciseAction > = this.actions$.pipe(
        ofType<ExerciseAction>(ExerciseActionType.AllRequested),
        switchMap((action: Exercises.AllRequested) => {
            return from(this.exerciseService.getAll()
                .then(exercises => new Exercises.AllLoaded(exercises))
                .catch(error => new Exercises.RequestFailed(error))
            );
        })
    );

    @Effect() refreshAllRequested$: Observable < ExerciseAction > = this.actions$.pipe(
        ofType<ExerciseAction>(ExerciseActionType.RefreshAllRequested),
        switchMap((action: Exercises.AllRequested) => {
            return from(this.exerciseService.getAllFromServer()
                .then(exercises => new Exercises.AllLoaded(exercises))
                .catch(error => new Exercises.RequestFailed(error))
            );
        })
    );

    @Effect() refreshOneRequested$: Observable < ExerciseAction > = this.actions$.pipe(
        ofType<ExerciseAction>(ExerciseActionType.RefreshOneRequested),
        switchMap((action: Exercises.RefreshOneRequested) => {
            return from(this.exerciseService.get(action.id, 'server')
                .then(exercise => new Exercises.OneLoaded(exercise))
                .catch(error => new Exercises.RequestFailed(error))
            );
        })
    );

    @Effect() createRequested$: Observable < ExerciseAction > = this.actions$.pipe(
        ofType<ExerciseAction>(ExerciseActionType.CreateRequested),
        switchMap((action: Exercises.CreateRequested) => {
            return from(this.exerciseService.create(action.exercise)
                .then((exercise) => new Exercises.Created(exercise))
                .catch(error => new Exercises.RequestFailed(error))
            );
        })
    );

    @Effect() updateRequested$: Observable < ExerciseAction > = this.actions$.pipe(
        ofType<ExerciseAction>(ExerciseActionType.UpdateRequested),
        switchMap((action: Exercises.UpdateRequested) => {
            return from(this.exerciseService.update(action.id, action.changes)
                .then(() => new Exercises.Updated(action.id, action.changes))
                .catch(error => new Exercises.RequestFailed(error))
            );
        })
    );

    @Effect() deleteRequested$: Observable < ExerciseAction > = this.actions$.pipe(
        ofType<ExerciseAction>(ExerciseActionType.DeleteRequested),
        switchMap((action: Exercises.DeleteRequested) => {
            return from(this.exerciseService.delete(action.id)
                .then(() => new Exercises.Deleted(action.id))
                .catch(error => new Exercises.RequestFailed(error))
            );
        })
    );

    @Effect({'dispatch': false}) formCompleted$: Observable < ExerciseAction > = this.actions$.pipe(
        ofType<ExerciseAction>(ExerciseActionType.Created, ExerciseActionType.Updated),
        tap(() => {
            this.modalController.dismiss();
            // this.router.navigateByUrl('/exercises');
        })
    );

    @Effect({'dispatch': false}) deleted$: Observable < ExerciseAction > = this.actions$.pipe(
        ofType<ExerciseAction>(ExerciseActionType.Deleted),
        tap((action: Exercises.CreateRequested) => {
            this.router.navigateByUrl('/exercises');
        })
    );

    constructor(
        private exerciseService: ExerciseService,
        private actions$: Actions,
        private modalController: ModalController,
        private toaster: ToastService,
        private router: Router,
    ) {}
}
