import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { FireAuthService } from '../../firebase/auth/auth.service';
import * as ClientAction from './client.actions';
import { StateModule } from '../state.module';
import {
    selectClientByID,
    selectClientByRouteURL,
    selectRequestInProgress,
    selectAll,
    selectEntities,
    selectTotal,
    selectIds,
    selectUserClient,
    selectMyClients,
    selectUnassignedClients,
    selectClientBelongsToUser
} from './client.selector';
import { Observable } from 'rxjs';
import { Dictionary } from '@ngrx/entity';
import { Client } from './client.state';
import { AllRequested } from './client.actions';
import { Program } from '../program/program.state';
import { Profile } from '../profile/profile.state';

/**
 * This service is responsible for dispatching client actions to the Store and selecting
 * auth data from the Store
 */
@Injectable({ 'providedIn': StateModule })
export class ClientStoreDispatcher {
    constructor(
        protected store: Store < AppState > ,
        protected fireAuth: FireAuthService
    ) {}

    /** Dispatch an AssignProgramRequested action to the store */
    public assignProgram(clientID: string, program: Program): void {
        this.store.dispatch(new ClientAction.AssignProgramRequested(clientID, program));
    }

    /** Dispatch an AssignTrainerRequested action to the store */
    public assignTrainer(clientID: string, trainer: Profile): void {
        this.store.dispatch(new ClientAction.AssignTrainerRequested(clientID, trainer));
    }

    /**
     * Dispatch an AllRequested action to the store
     */
    public loadAll(): void {
        this.store.dispatch(new AllRequested());
    }

    public selectClient(id: string): Observable < Client > {
        return this.store.select(selectClientByID(id));
    }

    public selectClientByRouteURL(): Observable < Client > {
        return this.store.select(selectClientByRouteURL);
    }

    public selectRequestInProgress(): Observable < boolean > {
        return this.store.select(selectRequestInProgress);
    }

    public selectAll(): Observable < Client[] > {
        return this.store.select(selectAll);
    }

    public selectIDs(): Observable < string[] | number[] > {
        return this.store.select(selectIds);
    }

    public selectClients(): Observable < Dictionary < Client >> {
        return this.store.select(selectEntities);
    }

    public selectTotal(): Observable < number > {
        return this.store.select(selectTotal);
    }

    public selectUserClient(): Observable< Client> {
        return this.store.select(selectUserClient);
    }

    public selectClientBelongsToUser(): Observable <boolean> {
        return this.store.select(selectClientBelongsToUser);
    }

    public selectMyClients(): Observable< Client[]> {
        return this.store.select(selectMyClients);
    }
    public selectUnassignedClients(): Observable< Client[]> {
        return this.store.select(selectUnassignedClients);
    }
}
