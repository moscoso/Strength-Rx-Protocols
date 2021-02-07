import { Component, OnInit, Input } from '@angular/core';
import { Profile } from 'src/app/core/state/profile/profile.model';
import { Observable, of } from 'rxjs';
import { ProfileFacade } from 'src/app/core/state/profile/profile.facade';
import { first } from 'rxjs/operators';
import { ClientFacade } from 'src/app/core/state/client/client.facade';

@Component({
    'selector': 'assign-trainer',
    'templateUrl': './assign-trainer.component.html',
    'styleUrls': ['./assign-trainer.component.scss'],
})
export class AssignTrainerComponent implements OnInit {

    @Input() clientID: string;

    public assignedTrainer: Profile;
    public iAmTrainer$: Observable < boolean > = of (false);

    constructor(
        public profileService: ProfileFacade,
        public clientService: ClientFacade,
    ) {}

    ngOnInit() {
        this.iAmTrainer$ = this.profileService.selectUserIsTrainer();

        this.clientService.loadAll();
        this.clientService.selectClient(this.clientID).pipe(first(client => client != null)).subscribe(client =>
            this.assignedTrainer = client.assignedTrainer
        );
    }

    async assignTrainer() {
        const trainer: Profile = await this.profileService.selectUserAsProfile().pipe(first()).toPromise();
        this.clientService.assignTrainer(this.clientID, trainer);
    }

    getProfileLink(p: Profile) {
        return `/profile/${p.id}`;
    }
}
