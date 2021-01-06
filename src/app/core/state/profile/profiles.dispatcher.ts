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
import { AllRequested, RefreshAllRequested, RefreshOneRequested } from './profile.actions';
import { first } from 'rxjs/operators';

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

    /**
     * Dispatch a RefreshAllRequested action to the store
     */
    public refreshAll(): void {
        this.store.dispatch(new RefreshAllRequested());
    }

    /**
     * Dispatch a RefreshOneRequested action to the store
     */
    public refreshOne(id: string): void {
        this.store.dispatch(new RefreshOneRequested(id));
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
    public selectUserAsProfile(): Observable < Profile > {
        return this.store.select(selectUserProfile);
    }

    /**
     * Select the Avatar that belongs to the authenticated user
     */
    public async getUserAvatar(): Promise < string > {
        const profile = await this.selectUserAsProfile()
            .pipe(first(user => user != null)).toPromise();
        return this.getAvatar(profile);
    }

    /**
     * Select a flag indicating whether or not the currently
     * viewed profile (based on route URL) belongs to the
     * authenticated user
     */
    public selectProfileBelongsToUser(): Observable < boolean > {
        return this.store.select(selectProfileBelongsToUser);
    }

    /**
     * Select a flag indicating whether the user is a trainer
     */
    public selectUserIsTrainer(): Observable < boolean > {
        return this.store.select(selectUserIsTrainer);
    }

    public selectAllClients(): Observable < Profile[] > {
        return this.store.select(selectAllClients);
    }

    public selectAllTrainers(): Observable < Profile[] > {
        return this.store.select(selectAllTrainers);
    }

    /**
     * Get the Avatar of a profile. If no photoURL exists for the profile,
     * fallback to genetating an avatar using their initials.
     * @param profile the profile to get the Avatar of
     */
    public getAvatar(profile: Profile): string {
        const photoURLExists = profile.photoURL != null && profile.photoURL.length > 0;
        return photoURLExists ? profile.photoURL : this.getInitialsAvatar(profile);
    }

    public getInitialsAvatar(profile: Profile): string {
        return `https://ui-avatars.com/api/?name=${profile.firstName}+${profile.lastName}&size=200&background=3880ff&color=fff`;
    }
}
