import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import * as ProgramAction from './program.actions';
import { StateModule } from '../state.module';
import { Program } from './program.state';
import {
    selectProgramByID,
    selectProgramByRouteURL,
    selectRequestInProgress,
    selectAll,
    selectEntities,
    selectTotal,
    selectIds,
} from './program.selector';
import { AllRequested } from './program.actions';
import { Observable } from 'rxjs';
import { Dictionary } from '@ngrx/entity';

/**
 * This service is responsible for dispatching program actions to the Store and selecting
 * program data from the Store
 */
@Injectable({ 'providedIn': StateModule })
export class ProgramStoreDispatcher {
    constructor(
        protected store: Store < AppState > ,
    ) {}

    /** Dispatch a CreateRequested action to the store */
    public create(program: Program): void {
        this.store.dispatch(new ProgramAction.CreateRequested(program));
    }

    /** Dispatch an UpdateRequested action to the store */
    public update(id: string, changes: Partial < Program > ): void {
        this.store.dispatch(new ProgramAction.UpdateRequested(id, changes));
    }

    /** Dispatch a DeleteRequested action to the store */
    public delete(id: string): void {
        this.store.dispatch(new ProgramAction.DeleteRequested(id));
    }

    /**
     * Dispatch an AllRequested action to the store
     */
    public loadAll(): void {
        this.store.dispatch(new AllRequested());
    }

    public selectProgram(id: string): Observable < Program > {
        return this.store.select(selectProgramByID(id));
    }

    public selectProgramByRouteURL(): Observable < Program > {
        return this.store.select(selectProgramByRouteURL);
    }

    public selectRequestInProgress(): Observable < boolean > {
        return this.store.select(selectRequestInProgress);
    }

    public selectAll(): Observable < Program[] > {
        return this.store.select(selectAll);
    }

    public selectIDs(): Observable < string[] | number[] > {
        return this.store.select(selectIds);
    }

    public selectPrograms(): Observable < Dictionary < Program >> {
        return this.store.select(selectEntities);
    }

    public selectTotal(): Observable < number > {
        return this.store.select(selectTotal);
    }
}
