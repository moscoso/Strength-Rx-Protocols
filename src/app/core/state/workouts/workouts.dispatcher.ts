import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { FireAuthService } from '../../firebase/auth/auth.service';
import * as WorkoutAction from './workouts.actions';
import { StateModule } from '../state.module';
import { Workout } from './workouts.state';
import {
    selectWorkoutByID,
    selectWorkoutByRouteURL,
    selectRequestInProgress,
    selectAll,
    selectEntities,
    selectTotal,
    selectIds
} from './workouts.selector';
import { AllRequested } from './workouts.actions';
import { Observable } from 'rxjs';
import { Dictionary } from '@ngrx/entity';

/**
 * This service is responsible for dispatching auth actions to the Store and selecting
 * auth data from the Store
 */
@Injectable({ 'providedIn': StateModule })
export class WorkoutStoreDispatcher {
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
        return this.store.select(selectWorkoutByID(id));
    }

    public selectWorkoutByRouteURL(): Observable < Workout > {
        return this.store.select(selectWorkoutByRouteURL);
    }

    public selectRequestInProgress(): Observable < boolean > {
        return this.store.select(selectRequestInProgress);
    }

    public selectAll(): Observable < Workout[] > {
        return this.store.select(selectAll);
    }

    public selectIDs(): Observable < string[] | number[] > {
        return this.store.select(selectIds);
    }

    public selectWorkouts(): Observable < Dictionary < Workout >> {
        return this.store.select(selectEntities);
    }

    public selectTotal(): Observable < number > {
        return this.store.select(selectTotal);
    }
}
