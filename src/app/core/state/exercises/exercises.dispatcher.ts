import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { FireAuthService } from '../../firebase/auth/auth.service';
import * as ExerciseAction from './exercises.actions';
import { StateModule } from '../state.module';
import { Exercise } from './exercises.state';
import {
    selectExerciseByID,
    selectExerciseByRouteURL,
    selectRequestInProgress,
    selectAll,
    selectEntities,
    selectTotal,
    selectIds
} from './exercises.selector';
import { AllRequested } from './exercises.actions';
import { Observable } from 'rxjs';
import { Dictionary } from '@ngrx/entity';

/**
 * This service is responsible for dispatching exercise actions to the Store and selecting
 * auth data from the Store
 */
@Injectable({ 'providedIn': StateModule })
export class ExerciseStoreDispatcher {
    constructor(
        protected store: Store < AppState > ,
        protected fireAuth: FireAuthService
    ) {}

    /** Dispatch a CreateRequested action to the store */
    public create(exercise: Exercise): void {
        this.store.dispatch(new ExerciseAction.CreateRequested(exercise));
    }

    /** Dispatch an UpdateRequested action to the store */
    public update(id: string, changes: Partial < Exercise > ): void {
        this.store.dispatch(new ExerciseAction.UpdateRequested(id, changes));
    }

    /** Dispatch a DeleteRequested action to the store */
    public delete(id: string): void {
        this.store.dispatch(new ExerciseAction.DeleteRequested(id));
    }

    /**
     * Dispatch an AllRequested action to the store
     */
    public loadAll(): void {
        this.store.dispatch(new AllRequested());
    }

    public selectExercise(id: string): Observable < Exercise > {
        return this.store.select(selectExerciseByID(id));
    }

    public selectExerciseByRouteURL(): Observable < Exercise > {
        return this.store.select(selectExerciseByRouteURL);
    }

    public selectRequestInProgress(): Observable < boolean > {
        return this.store.select(selectRequestInProgress);
    }

    public selectAll(): Observable < Exercise[] > {
        return this.store.select(selectAll);
    }

    public selectIDs(): Observable < string[] | number[] > {
        return this.store.select(selectIds);
    }

    public selectExercises(): Observable < Dictionary < Exercise >> {
        return this.store.select(selectEntities);
    }

    public selectTotal(): Observable < number > {
        return this.store.select(selectTotal);
    }
}
