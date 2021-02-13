import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { FireAuthService } from '../../firebase/auth/auth.service';
import * as ExerciseAction from './exercise.actions';
import { StateModule } from '../state.module';
import * as fromExercise from './exercise.selector';
import { Observable } from 'rxjs';
import { Dictionary } from '@ngrx/entity';
import { whenRequestCompletes } from 'src/util/operator/Operators';
import { Exercise } from './exercise.model';

/**
 * This service is responsible for dispatching actions to the Store
 * and selecting data from the Store related to Exercise
 */
@Injectable({ 'providedIn': StateModule })
export class ExerciseFacade {
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
        this.store.dispatch(new ExerciseAction.AllRequested());
    }

    /**
     * Dispatch a RefreshAllRequested action to the store
     */
    public refreshAll(): void {
        this.store.dispatch(new ExerciseAction.RefreshAllRequested());
    }

    /**
     * Dispatch a RefreshOneRequested action to the store
     */
    public refreshOne(id: string): void {
        this.store.dispatch(new ExerciseAction.RefreshOneRequested(id));
    }

    public selectExercise(id: string): Observable < Exercise > {
        return this.store.select(fromExercise.selectExerciseByID(id));
    }

    public selectExerciseByRouteURL(): Observable < Exercise > {
        return this.store.select(fromExercise.selectExerciseByRouteURL);
    }

    public selectRequestInProgress(): Observable < boolean > {
        return this.store.select(fromExercise.selectRequestInProgress);
    }

    public whenRequestCompletes(): Promise <boolean> {
        return whenRequestCompletes(this.selectRequestInProgress());
    }

    public selectAll(): Observable < Exercise[] > {
        return this.store.select(fromExercise.selectAll);
    }

    public selectIDs(): Observable < string[] | number[] > {
        return this.store.select(fromExercise.selectIds);
    }

    public selectExercises(): Observable < Dictionary < Exercise >> {
        return this.store.select(fromExercise.selectEntities);
    }

    public selectTotal(): Observable < number > {
        return this.store.select(fromExercise.selectTotal);
    }
}
