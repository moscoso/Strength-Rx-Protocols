import { AllRequested, RefreshAllRequested, RefreshOneRequested } from './profile.actions';
import { AppState } from '../app.state';
import { Dictionary } from '@ngrx/entity';
import { FireAuthService } from '../../firebase/auth/auth.service';
import { firstNonNullValue } from 'src/util/operator/Operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from './profile.model';
import { StateModule } from '../state.module';
import { Store } from '@ngrx/store';
import * as fromProfile from './profile.selector';
import * as ProfileAction from './profile.actions';

/**
 * This service is responsible for dispatching actions to the Store
 * and selecting data from the Store related to Profile
 */
@Injectable({ 'providedIn': StateModule })
export class ProfileFacade {

    selectAll$: Observable < Profile[] > = this.store.select(fromProfile.selectAll);
    selectIDs$: Observable < string[] | number[] > = this.store.select(fromProfile.selectIds);
    selectTotal$: Observable < number > = this.store.select(fromProfile.selectTotal);

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
        return this.store.select(fromProfile.selectProfileByID(id));
    }

    public selectProfileByRouteURL(): Observable < Profile > {
        return this.store.select(fromProfile.selectProfileByRouteURL);
    }

    public selectRequestInProgress(): Observable < boolean > {
        return this.store.select(fromProfile.selectRequestInProgress);
    }

    public selectProfiles(): Observable < Dictionary < Profile >> {
        return this.store.select(fromProfile.selectEntities);
    }

    /**
     * Select the authenticated user's profile
     */
    public selectUserAsProfile(): Observable < Profile > {
        return this.store.select(fromProfile.selectUserProfile);
    }

    /**
     * Select the profile picture that belongs to the authenticated user
     */
    public async getProfilePic(): Promise < string > {
        const profile = await this.selectUserAsProfile()
            .pipe(firstNonNullValue).toPromise();
        return this.getAvatar(profile);
    }

    /**
     * Select a flag indicating whether or not the currently
     * viewed profile (based on route URL) belongs to the
     * authenticated user
     */
    public selectProfileBelongsToUser(): Observable < boolean > {
        return this.store.select(fromProfile.selectProfileBelongsToUser);
    }

    /**
     * Select a flag indicating whether the user is a trainer
     */
    public selectUserIsTrainer(): Observable < boolean > {
        return this.store.select(fromProfile.selectUserIsTrainer);
    }

    public selectAllClients(): Observable < Profile[] > {
        return this.store.select(fromProfile.selectAllClients);
    }

    public selectAllTrainers(): Observable < Profile[] > {
        return this.store.select(fromProfile.selectAllTrainers);
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
