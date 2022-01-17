import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ClientFacade } from 'src/app/core/state/client/client.facade';
import { Client } from 'src/app/core/state/client/client.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
    'selector': 'app-client-list',
    'templateUrl': './client-list.page.html',
    'styleUrls': ['./client-list.page.scss'],
})
export class ClientListPage implements OnInit {

    clientList$: Observable < any[] > = of ([]);
    events = [];

    constructor(public clientService: ClientFacade, public firestore: AngularFirestore) {}

    ngOnInit() {
        this.clientService.loadAll();
        this.clientList$ = this.clientService.selectAll();
        this.getActivityFeed();
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

    async getActivityFeed() {
        const events = await this.firestore.collection('events').get().toPromise();
        this.events = events.docs.map(doc => doc.data());
    }
}
