import { Component, OnInit, Input } from '@angular/core';
import { INIT_PROFILE, Profile } from 'src/app/core/state/profile/profile.state';
import { Observable, of } from 'rxjs';
import { ProfileStoreDispatcher } from 'src/app/core/state/profile/profiles.dispatcher';


@Component({
    'selector': 'app-assign-trainer',
    'templateUrl': './assign-trainer.component.html',
    'styleUrls': ['./assign-trainer.component.scss'],
})
export class AssignTrainerComponent implements OnInit {

    @Input() profile: Profile = INIT_PROFILE;

    public iAmTrainer$: Observable < boolean > = of (false);
    public profileIsMe$: Observable < boolean > = of (false);
    public profileIsClient$: Observable < boolean > = of (false);


    constructor(
        public profileService: ProfileStoreDispatcher,
    ) {}

    ngOnInit() {
        this.iAmTrainer$ = this.profileService.selectUserIsTrainer();
        this.profileIsClient$ = this.profileService.selectUserIsNotTrainer();
        this.profileIsMe$ = this.profileService.selectProfileBelongsToUser();
    }
}
