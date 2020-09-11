import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';

import { ProfileAction, ProfileActionType } from './profile.actions';
import * as Profiles from './profile.actions';
import { ProfileService } from '../../firebase/profile/profile.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { ModalController } from '@ionic/angular';
import { AuthActionType } from '../auth/auth.actions';

@Injectable()
export class ProfileEffects {

    @Effect({ 'dispatch': false }) error$: Observable < ProfileAction > = this.actions$.pipe(
        ofType(ProfileActionType.RequestFailed),
        tap((action: Profiles.RequestFailed) => {
            // this.toaster.failed('Request for profile failed', action.error);
        })
    );

    @Effect() allRequested$: Observable < Profiles.ProfileAction > = this.actions$.pipe(
        ofType < ProfileAction > (ProfileActionType.AllRequested),
        switchMap((action: Profiles.AllRequested) => {
            return from(this.profileService.getAll()
                .then(profiles => new Profiles.AllLoaded(profiles))
                .catch(error => new Profiles.RequestFailed(error))
            );
        }),
    );

    @Effect() refreshAllRequested$: Observable < Profiles.ProfileAction > = this.actions$.pipe(
        ofType<ProfileAction>(ProfileActionType.RefreshAllRequested),
        switchMap((action: Profiles.RefreshAllRequested) => {
            return from(this.profileService.getAllFromServer()
                .then(exercises => new Profiles.AllLoaded(exercises))
                .catch(error => new Profiles.RequestFailed(error))
            );
        })
    );

    @Effect() refreshOneRequested$: Observable < ProfileAction > = this.actions$.pipe(
        ofType<ProfileAction>(ProfileActionType.RefreshOneRequested),
        switchMap((action: Profiles.RefreshOneRequested) => {
            return from(this.profileService.get(action.id, 'server')
                .then(exercise => new Profiles.OneLoaded(exercise))
                .catch(error => new Profiles.RequestFailed(error))
            );
        })
    );

    @Effect() createRequested$: Observable < ProfileAction > = this.actions$.pipe(
        ofType < ProfileAction > (ProfileActionType.CreateRequested),
        switchMap((action: Profiles.CreateRequested) => {
            return from(this.profileService.create(action.profile)
                .then((profile) => new Profiles.Created(profile))
                .catch(error => new Profiles.RequestFailed(error))
            );
        })
    );

    @Effect() updateRequested$: Observable < ProfileAction > = this.actions$.pipe(
        ofType < ProfileAction > (ProfileActionType.UpdateRequested),
        switchMap((action: Profiles.UpdateRequested) => {
            return from(this.profileService.update(action.id, action.changes)
                .then(() => new Profiles.Updated(action.id, action.changes))
                .catch(error => new Profiles.RequestFailed(error))
            );
        })
    );

    @Effect({ 'dispatch': false }) created$: Observable < ProfileAction > = this.actions$.pipe(
        ofType < ProfileAction > (ProfileActionType.Created),
        tap((action: Profiles.Created) => {
            this.router.navigateByUrl('/choose-membership');
        })
    );

    @Effect({ 'dispatch': false }) updated$: Observable < ProfileAction > = this.actions$.pipe(
        ofType < ProfileAction > (ProfileActionType.Updated),
        tap((action: Profiles.Updated) => {
            this.modalController.dismiss();
            this.router.navigateByUrl('/profile');
        })
    );

    @Effect() signedOut$: Observable < ProfileAction > = this.actions$.pipe(
        ofType(AuthActionType.NotAuthenticated),
        map(action => new Profiles.SignedOut()));

    constructor(
        private profileService: ProfileService,
        private actions$: Actions,
        private router: Router,
        private modalController: ModalController,
        private toaster: ToastService,
    ) {}
}
