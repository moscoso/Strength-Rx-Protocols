import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from, of } from 'rxjs';
import { switchMap, timeout, catchError, tap } from 'rxjs/operators';

import { ProfileAction, ProfileActionType } from './profile.actions';
import * as Profiles from './profile.actions';
import { ProfileService } from '../../firebase/profile/profile.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { ModalController } from '@ionic/angular';

@Injectable()
export class ProfileEffects {

    /**
     * How long it takes for requests to timeout
     */
    TIMEOUT_WINDOW = 15000;


    @Effect({ 'dispatch': false }) error$: Observable < ProfileAction > = this.actions$.pipe(
        ofType(ProfileActionType.RequestFailed),
        tap((action: Profiles.RequestFailed) => {
            console.log(action);
            this.toaster.failed('Request for profile failed', action.error);
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
            this.router.navigateByUrl('/');
        })
    );

    @Effect({ 'dispatch': false }) updated$: Observable < ProfileAction > = this.actions$.pipe(
        ofType < ProfileAction > (ProfileActionType.Updated),
        tap((action: Profiles.Updated) => {
            this.modalController.dismiss();
            this.router.navigateByUrl('/profile');
        })
    );

    constructor(
        private profileService: ProfileService,
        private actions$: Actions,
        private router: Router,
        private modalController: ModalController,
        private toaster: ToastService,
    ) {}
}
