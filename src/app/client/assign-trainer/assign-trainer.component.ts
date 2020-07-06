import { Component, OnInit, Input } from '@angular/core';
import { INIT_PROFILE, Profile } from 'src/app/core/state/profile/profile.state';
import { Observable, of } from 'rxjs';
import { ProfileStoreDispatcher } from 'src/app/core/state/profile/profiles.dispatcher';
import { AuthStoreDispatcher } from 'src/app/core/state/auth/auth.dispatcher';
import { take } from 'rxjs/operators';


@Component({
    'selector': 'assign-trainer',
    'templateUrl': './assign-trainer.component.html',
    'styleUrls': ['./assign-trainer.component.scss'],
})
export class AssignTrainerComponent implements OnInit {

    @Input() profile: Profile = INIT_PROFILE;

    public iAmTrainer$: Observable < boolean > = of (false);
    public profileIsClient$: Observable < boolean > = of (false);


    constructor(
        public profileService: ProfileStoreDispatcher,
        public authService: AuthStoreDispatcher,
    ) {}

    ngOnInit() {
        this.iAmTrainer$ = this.profileService.selectUserIsTrainer();
    }

    async assignTrainer() {
        const trainer: Profile = await this.profileService.selectUserProfile().pipe(take(1)).toPromise();
        this.profileService.update(this.profile.id, {'assignedTrainer': trainer});
    }
}
