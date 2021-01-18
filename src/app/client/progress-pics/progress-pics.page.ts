import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { first, pluck } from 'rxjs/operators';
import { ProfileStoreDispatcher } from 'src/app/core/state/profile/profiles.dispatcher';
import { RouterStoreDispatcher } from 'src/app/core/state/router/router.dispatcher';
import { Profile } from 'src/app/core/state/profile/profile.state';

@Component({
    'selector': 'app-progress-pics',
    'templateUrl': './progress-pics.page.html',
    'styleUrls': ['./progress-pics.page.scss'],
})
export class ProgressPicsPage implements OnInit {

    progressPics$: Observable < any > = of ([]);
    clientID: string;

    public iAmTrainer$: Observable < boolean > = of (false);

    constructor(
        public firestore: AngularFirestore,
        public profileService: ProfileStoreDispatcher,
        public routerService: RouterStoreDispatcher,
        
    ) {}

    ngOnInit() {
        this.fetchClientID();
        this.iAmTrainer$ = this.profileService.selectUserIsTrainer();
    }

    async fetchClientID() {
        this.profileService.loadAll();
        const router = await this.routerService.selectState().pipe(first()).toPromise();
        const routeID = router.state.params.id;
        let profile$: Observable < Profile > ;
        if (routeID) {
            profile$ = this.profileService.selectProfile(routeID);
        } else {
            profile$ = this.profileService.selectUserAsProfile();
        }
        this.clientID = await profile$.pipe(first(profile => profile != null), pluck('id')).toPromise();
    }
}
