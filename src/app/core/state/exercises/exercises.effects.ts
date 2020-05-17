import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AppState } from '../app.state';
import { ExerciseAction, ExerciseActionType} from './exercises.actions';
import * as Exercises from './exercises.actions';
import { ExerciseService } from '../../firebase/entity/exercise.service';

@Injectable()
export class AuthEffects {

    @Effect() allExercisesRequested$: Observable < ExerciseAction > = this.actions$.pipe(
        ofType<ExerciseAction>(ExerciseActionType.AllRequested),
        switchMap((action: Exercises.AllExercisesRequested) => {
            return from(this.exerciseService.getAll()
                .then(exercises => {
                    return new Exercises.AllExercisesLoaded(exercises);
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
