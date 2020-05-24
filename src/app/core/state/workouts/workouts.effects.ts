import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { WorkoutAction, WorkoutActionType} from './workouts.actions';
import * as Workouts from './workouts.actions';
import { WorkoutService } from '../../firebase/entity/workout.service';

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

    constructor(
        private workoutService: WorkoutService,
        private actions$: Actions,
    ) {}
}
