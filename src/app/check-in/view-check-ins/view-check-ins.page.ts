import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProfileFacade } from 'src/app/core/state/profile/profile.facade';
import { RouterStoreDispatcher } from 'src/app/core/state/router/router.dispatcher';
import { first, pluck } from 'rxjs/operators';
import { nonNull } from 'src/util/predicate/Predicates';

@Component({
    'selector': 'view-check-ins',
    'templateUrl': './view-check-ins.page.html',
    'styleUrls': ['./view-check-ins.page.scss'],
})
export class ViewCheckInsPage implements OnInit {

    clientID: string;

    constructor(
        public firestore: AngularFirestore,
        public profileService: ProfileFacade,
        public routerService: RouterStoreDispatcher,
    ) {}

    ngOnInit() {
        this.fetchClientID();
    }

    async fetchClientID() {
        this.profileService.loadAll();
        const router = await this.routerService.selectState().pipe(first()).toPromise();
        const routeID = router.state.params.id;

        if (routeID) {
            this.clientID = await this.profileService.selectProfile(routeID)
                .pipe(first(nonNull), pluck('id')).toPromise();
        } else {
            this.clientID = await this.profileService.selectUserAsProfile()
                .pipe(first(nonNull), pluck('id')).toPromise();
        }
    }

}
