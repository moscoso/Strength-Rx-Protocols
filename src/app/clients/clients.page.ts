import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllClients } from '../core/state/profile/profile.selector';
import { Profile } from '../core/state/profile/profile.state';
import { Observable, of } from 'rxjs';

@Component({
    'selector': 'app-clients',
    'templateUrl': './clients.page.html',
    'styleUrls': ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {

    clientList$: Observable<Profile[]> = of([]);

    constructor(public store: Store) {}

    ngOnInit() {
        this.clientList$ = this.store.select(selectAllClients);
    }

}
