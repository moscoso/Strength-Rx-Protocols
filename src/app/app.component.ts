import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';

@Component({
    'selector': 'app-root',
    'templateUrl': 'app.component.html',
    'styleUrls': ['app.component.scss']
})
export class AppComponent implements OnInit {
    public selectedIndex = 0;
    public appPages = [
    {
        'title': 'Inbox',
        'url': '/folder/Inbox',
        'icon': 'mail'
    },
    {
        'title': 'Outbox',
        'url': '/folder/Outbox',
        'icon': 'paper-plane'
    }, ];
    public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

    constructor(
        private platform: Platform,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {});
    }

    ngOnInit() {
        const path = window.location.pathname.split('folder/')[1];
        if (path !== undefined) {
            this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
        }
    }
}
