import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {  ProfileAction, ProfileActionType} from './profile.actions';
import * as Profiles from './profile.actions';
import { ProfileService } from '../../firebase/profile/profile.service';

@Injectable()
export class WorkoutEffects {

    @Effect() allRequested$: Observable < Profiles.ProfileAction > = this.actions$.pipe(
        ofType<ProfileAction>(ProfileActionType.AllRequested),
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
            );
        })
    );

    constructor(
        private profileService: ProfileService,
        private actions$: Actions,
    ) {}
}
