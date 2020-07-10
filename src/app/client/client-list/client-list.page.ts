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
        this.clientList$ = this.clientService.selectAll();
    }

    getDateFromTimestamp(timestamp) {
        if (timestamp.toDate) {
            return timestamp.toDate();
        } else {
            return timestamp;
        }
    }
}
