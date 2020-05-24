import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ExerciseAction, ExerciseActionType} from './exercises.actions';
import * as Exercises from './exercises.actions';
import { ExerciseService } from '../../firebase/entity/exercise.service';

@Injectable()
export class ExerciseEffects {

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
                .then(() => {
                    return new Exercises.Created();
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
                    return new Exercises.Updated();
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
                    return new Exercises.Deleted();
                })
                .catch(error => {
                    return new Exercises.RequestFailed({
                        'error': error
                    });
                })
            );
        })
    );

    constructor(
        private exerciseService: ExerciseService,
        private actions$: Actions,
    ) {}
}
