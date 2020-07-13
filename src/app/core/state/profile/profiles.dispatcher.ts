import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { FireAuthService } from '../../firebase/auth/auth.service';
import * as ProfileAction from './profile.actions';
import { StateModule } from '../state.module';
import {
    selectProfileByID,
    selectProfileByRouteURL,
    selectRequestInProgress,
    selectAll,
    selectEntities,
    selectTotal,
    selectIds,
    selectUserProfile,
    selectUserIsTrainer,
    selectAllClients,
    selectAllTrainers,
    selectProfileBelongsToUser
} from './profile.selector';
import { Observable } from 'rxjs';
import { Dictionary } from '@ngrx/entity';
import { Profile } from './profile.state';
import { AllRequested } from './profile.actions';

/**
 * This service is responsible for dispatching profile actions to the Store and selecting
 * auth data from the Store
 */
@Injectable({ 'providedIn': StateModule })
export class ProfileStoreDispatcher {
    constructor(
        protected store: Store < AppState > ,
        protected fireAuth: FireAuthService
    ) {}

    /** Dispatch a CreateRequested action to the store */
    public create(profile: Profile): void {
        this.store.dispatch(new ProfileAction.CreateRequested(profile));
    }

    /** Dispatch an UpdateRequested action to the store */
    public update(id: string, changes: Partial < Profile > ): void {
        this.store.dispatch(new ProfileAction.UpdateRequested(id, changes));
    }

    /** Dispatch a DeleteRequested action to the store */
    public delete(id: string): void {
        this.store.dispatch(new ProfileAction.DeleteRequested(id));
    }

    /**
     * Dispatch an AllRequested action to the store
     */
    public loadAll(): void {
        this.store.dispatch(new AllRequested());
    }

    public selectProfile(id: string): Observable < Profile > {
        return this.store.select(selectProfileByID(id));
    }

    public selectProfileByRouteURL(): Observable < Profile > {
        return this.store.select(selectProfileByRouteURL);
    }

    public selectRequestInProgress(): Observable < boolean > {
        return this.store.select(selectRequestInProgress);
    }

    public selectAll(): Observable < Profile[] > {
        return this.store.select(selectAll);
    }

    public selectIDs(): Observable < string[] | number[] > {
        return this.store.select(selectIds);
    }

    public selectProfiles(): Observable < Dictionary < Profile >> {
        return this.store.select(selectEntities);
    }

    public selectTotal(): Observable < number > {
        return this.store.select(selectTotal);
    }

    /**
     * Select the authenticated user's profile
     */
    public selectUserProfile(): Observable< Profile> {
        return this.store.select(selectUserProfile);
    }

    public selectProfileBelongsToUser(): Observable <boolean> {
        return this.store.select(selectProfileBelongsToUser);
    }

    public selectUserIsTrainer(): Observable< boolean> {
        return this.store.select(selectUserIsTrainer);
    }

    public selectAllClients(): Observable< Profile[]> {
        return this.store.select(selectAllClients);
    }

    public selectAllTrainers(): Observable< Profile[]> {
        return this.store.select(selectAllTrainers);
    }
}
