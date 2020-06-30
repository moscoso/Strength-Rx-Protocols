import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Profile } from 'src/app/core/state/profile/profile.state';
import { Store } from '@ngrx/store';
import { selectAllClients } from 'src/app/core/state/profile/profile.selector';

@Component({
    'selector': 'app-client-list',
    'templateUrl': './client-list.page.html',
    'styleUrls': ['./client-list.page.scss'],
})
export class ClientListPage implements OnInit {

    clientList$: Observable < Profile[] > = of ([]);

    constructor(public store: Store) {}

    ngOnInit() {
        this.clientList$ = this.store.select(selectAllClients);
    }

    getDateFromTimestamp(timestamp) {
        return timestamp.toDate();
    }
}
