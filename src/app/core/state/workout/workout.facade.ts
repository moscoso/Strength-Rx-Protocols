import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { FireAuthService } from '../../firebase/auth/auth.service';
import * as WorkoutAction from './workout.actions';
import { StateModule } from '../state.module';
import * as fromWorkout from './workout.selector';
import { AllRequested } from './workout.actions';
import { Observable } from 'rxjs';
import { Dictionary } from '@ngrx/entity';
import { Workout } from './workout.model';

/**
 * This service is responsible for dispatching actions to the Store
 * and selecting data from the Store related to Workout
 */
@Injectable({ 'providedIn': StateModule })
export class WorkoutFacade {
    constructor(
        protected store: Store < AppState > ,
        protected fireAuth: FireAuthService
    ) {}

    /** Dispatch a CreateRequested action to the store */
    public create(workout: Workout): void {
        this.store.dispatch(new WorkoutAction.CreateRequested(workout));
    }

    /** Dispatch an UpdateRequested action to the store */
    public update(id: string, changes: Partial < Workout > ): void {
        this.store.dispatch(new WorkoutAction.UpdateRequested(id, changes));
    }

    /** Dispatch a DeleteRequested action to the store */
    public delete(id: string): void {
        this.store.dispatch(new WorkoutAction.DeleteRequested(id));
    }

    /**
     * Dispatch an AllRequested action to the store
     */
    public loadAll(): void {
        this.store.dispatch(new AllRequested());
    }

    public selectWorkout(id: string): Observable < Workout > {
        return this.store.select(fromWorkout.selectWorkoutByID(id));
    }

    public selectWorkoutByRouteURL(): Observable < Workout > {
        return this.store.select(fromWorkout.selectWorkoutByRouteURL);
    }

    public selectRequestInProgress(): Observable < boolean > {
        return this.store.select(fromWorkout.selectRequestInProgress);
    }

    public selectAll(): Observable < Workout[] > {
        return this.store.select(fromWorkout.selectAll);
    }

    public selectIDs(): Observable < string[] | number[] > {
        return this.store.select(fromWorkout.selectIds);
    }

    public selectWorkouts(): Observable < Dictionary < Workout >> {
        return this.store.select(fromWorkout.selectEntities);
    }

    public selectTotal(): Observable < number > {
        return this.store.select(fromWorkout.selectTotal);
    }
}
