import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from, of } from 'rxjs';
import { switchMap, timeout, catchError, tap } from 'rxjs/operators';

import { ProfileAction, ProfileActionType } from './profile.actions';
import * as Profiles from './profile.actions';
import { ProfileService } from '../../firebase/profile/profile.service';
import { Router } from '@angular/router';

@Injectable()
export class ProfileEffects {

    /**
     * How long it takes for requests to timeout
     */
    TIMEOUT_WINDOW = 15000;

    @Effect() allRequested$: Observable < Profiles.ProfileAction > = this.actions$.pipe(
        ofType < ProfileAction > (ProfileActionType.AllRequested),
        switchMap((action: Profiles.AllRequested) => {
            return from(this.profileService.getAll()
                .then(profiles => {
                    return new Profiles.AllLoaded(profiles);
                })
                .catch(error => {
                    return new Profiles.RequestFailed({
                        'error': error
                    });
                })
            ).pipe(
                timeout(this.TIMEOUT_WINDOW),
                catchError((error) => {
                    console.error('The request timed out');
                    return of(new Profiles.RequestFailed({
                        'error': `The request timed out. ${this.TIMEOUT_WINDOW} ms`
                    }));
                })
            );
        }),
    );

    @Effect() createRequested$: Observable < ProfileAction > = this.actions$.pipe(
        ofType<ProfileAction>(ProfileActionType.CreateRequested),
        switchMap((action: Profiles.CreateRequested) => {
            return from(this.profileService.create(action.profile)
                .then((profile) => {
                    return new Profiles.Created(profile);
                })
                .catch(error => {
                    return new Profiles.RequestFailed({
                        'error': error
                    });
                })
            );
        })
    );

    @Effect({'dispatch': false}) createCompleted$: Observable < ProfileAction > = this.actions$.pipe(
        ofType<ProfileAction>(ProfileActionType.Created),
        tap((action: Profiles.CreateRequested) => {
            this.router.navigateByUrl('/');
        })
    );

    constructor(
        private profileService: ProfileService,
        private actions$: Actions,
        private router: Router,
    ) {}
}
