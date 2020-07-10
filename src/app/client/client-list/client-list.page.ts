import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ClientStoreDispatcher } from 'src/app/core/state/client/client.dispatcher';
import { Client } from 'src/app/core/state/client/client.state';

@Component({
    'selector': 'app-client-list',
    'templateUrl': './client-list.page.html',
    'styleUrls': ['./client-list.page.scss'],
})
export class ClientListPage implements OnInit {

    clientList$: Observable < Client[] > = of ([]);

    constructor(public clientService: ClientStoreDispatcher) {}

    ngOnInit() {
        this.clientService.loadAll();
        this.clientList$ = this.clientService.selectAll();
        this.clientList$.subscribe(x => console.log(x));
    }

    getDateFromTimestamp(timestamp) {
        if (timestamp.toDate) {
            return timestamp.toDate();
        } else {
            return timestamp;
        }
    }

    getAvatar(client: Client) {
        const photoURLExists = client.photoURL != null && client.photoURL.length > 0;
        return photoURLExists ?  client.photoURL : this.getInitialsAvatar(client);
    }

    getInitialsAvatar(client: Client) {
        return `https://ui-avatars.com/api/?name=${client.firstName}+${client.lastName}`;
    }
}
