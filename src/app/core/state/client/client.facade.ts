import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { StateModule } from '../state.module';
import * as ClientAction from './client.actions';
import * as fromClient from './client.selector';
import { Observable } from 'rxjs';
import { Dictionary } from '@ngrx/entity';
import { AllRequested } from './client.actions';
import { Profile } from '../profile/profile.model';
import { Program } from '../program/program.model';
import { Client } from './client.model';

/**
 * This service is responsible for dispatching actions to the Store
 * and selecting data from the Store related to Client
 */
@Injectable({ 'providedIn': StateModule })
export class ClientFacade {
    constructor(
        protected store: Store < AppState > ,
    ) {}

    /** Dispatch an AssignProgramRequested action to the store */
    public assignProgram(clientID: string, program: Program): void {
        this.store.dispatch(new ClientAction.AssignProgramRequested(clientID, program));
    }

    /** Dispatch an AssignTrainerRequested action to the store */
    public assignTrainer(clientID: string, trainer: Profile): void {
        this.store.dispatch(new ClientAction.AssignTrainerRequested(clientID, trainer));
    }

    /** Dispatch a ClearProgramRequested action to the store */
    public clearProgram(clientID: string): void {
        this.store.dispatch(new ClientAction.ClearProgramRequested(clientID));
    }

    /** Dispatch an AllRequested action to the store */
    public loadAll(): void {
        this.store.dispatch(new AllRequested());
    }

    public selectClient(id: string): Observable < Client > {
        return this.store.select(fromClient.selectClientByID(id));
    }

    public selectClientByRouteURL(): Observable < Client > {
        return this.store.select(fromClient.selectClientByRouteURL);
    }

    public selectRequestInProgress(): Observable < boolean > {
        return this.store.select(fromClient.selectRequestInProgress);
    }

    public selectAll(): Observable < Client[] > {
        return this.store.select(fromClient.selectAll);
    }

    public selectIDs(): Observable < string[] | number[] > {
        return this.store.select(fromClient.selectIds);
    }

    public selectClients(): Observable < Dictionary < Client >> {
        return this.store.select(fromClient.selectEntities);
    }

    public selectTotal(): Observable < number > {
        return this.store.select(fromClient.selectTotal);
    }

    public selectUserAsClient(): Observable < Client > {
        return this.store.select(fromClient.selectUserAsClient);
    }

    public selectClientBelongsToUser(): Observable < boolean > {
        return this.store.select(fromClient.selectClientBelongsToUser);
    }

    public selectMyClients(): Observable < Client[] > {
        return this.store.select(fromClient.selectMyClients);
    }
    public selectUnassignedClients(): Observable < Client[] > {
        return this.store.select(fromClient.selectUnassignedClients);
    }
}
