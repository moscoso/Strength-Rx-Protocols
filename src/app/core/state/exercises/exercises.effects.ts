import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { ExerciseAction, ExerciseActionType} from './exercises.actions';
import * as Exercises from './exercises.actions';
import { ExerciseService } from '../../firebase/exercise/exercise.service';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable()
export class ExerciseEffects {

    @Effect({'dispatch': false}) error$: Observable<ExerciseAction> = this.actions$.pipe(
        ofType(ExerciseActionType.RequestFailed),
        tap((action: Exercises.RequestFailed) => {
            this.toaster.failed('Something went wrong', action.error.error.code);
        })
    );

    @Effect() allRequested$: Observable < ExerciseAction > = this.actions$.pipe(
        ofType<ExerciseAction>(ExerciseActionType.AllRequested),
        switchMap((action: Exercises.AllRequested) => {
            return from(this.exerciseService.getAll()
                .then(exercises => {
                    return new Exercises.AllLoaded(exercises);
                })
                .catch(error => {
                    return new Exercises.RequestFailed({
                        'error': error
                    });
                })
            );
        })
    );

    @Effect() createRequested$: Observable < ExerciseAction > = this.actions$.pipe(
        ofType<ExerciseAction>(ExerciseActionType.CreateRequested),
        switchMap((action: Exercises.CreateRequested) => {
            return from(this.exerciseService.create(action.exercise)
                .then((exercise) => {
                    return new Exercises.Created(exercise);
                })
                .catch(error => {
                    return new Exercises.RequestFailed({
                        'error': error
                    });
                })
            );
        })
    );

    @Effect() updateRequested$: Observable < ExerciseAction > = this.actions$.pipe(
        ofType<ExerciseAction>(ExerciseActionType.UpdateRequested),
        switchMap((action: Exercises.UpdateRequested) => {
            return from(this.exerciseService.update(action.id, action.changes)
                .then(() => {
                    return new Exercises.Updated(action.id, action.changes);
                })
                .catch(error => {
                    return new Exercises.RequestFailed({
                        'error': error
                    });
                })
            );
        })
    );

    @Effect() deleteRequested$: Observable < ExerciseAction > = this.actions$.pipe(
        ofType<ExerciseAction>(ExerciseActionType.DeleteRequested),
        switchMap((action: Exercises.DeleteRequested) => {
            return from(this.exerciseService.delete(action.id)
                .then(() => {
                    return new Exercises.Deleted(action.id);
                })
                .catch(error => {
                    return new Exercises.RequestFailed({
                        'error': error
                    });
                })
            );
        })
    );

    @Effect({'dispatch': false}) createCompleted$: Observable < ExerciseAction > = this.actions$.pipe(
        ofType<ExerciseAction>(ExerciseActionType.Created),
        tap((action: Exercises.CreateRequested) => {
            this.modalController.dismiss();
        })
    );

    @Effect({'dispatch': false}) deleteCompleted$: Observable < ExerciseAction > = this.actions$.pipe(
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
