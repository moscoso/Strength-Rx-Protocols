import {
    Component,
    Input,
    OnInit
} from '@angular/core';
import {
    AngularFirestore
} from '@angular/fire/firestore';
import { ProfileService } from 'src/app/core/firebase/profile/profile.service';
import { Profile } from 'src/app/core/state/profile/profile.state';
import { ProfileStoreDispatcher } from 'src/app/core/state/profile/profiles.dispatcher';
import { first } from 'rxjs/operators';

/**
 * Generated class for the UserItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    'selector': 'user-item',
    'templateUrl': 'user-item.html'
})
export class UserItemComponent implements OnInit {

    @Input() id: string;

    profile: Profile;

    constructor(
        private profileService: ProfileStoreDispatcher,
    ) {

    }

    ngOnInit() {
        this.initProfile();
    }

    async initProfile() {
        this.profile = await this.profileService.selectProfile(this.id).pipe(first(profile => profile != null)).toPromise();
    }

    getAvatar(profile: Profile): string {
        return this.profileService.getAvatar(profile);
    }

}
