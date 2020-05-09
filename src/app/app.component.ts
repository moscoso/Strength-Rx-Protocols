import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';

@Component({
    'selector': 'app-root',
    'templateUrl': 'app.component.html',
    'styleUrls': ['app.component.scss']
})
export class AppComponent implements OnInit {
    public selectedIndex = 0;

    public items: MenuItem[] = [
        {
            'label': 'Exercises',
            'icon': 'fitness',
            'link': '/exercises'
        },
        {
            'label': 'Exercises',
            'icon': 'fitness',
            'link': '/exercises'
        },
    ];

    constructor(
        private platform: Platform,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {});
    }

    ngOnInit() {

    }
}

interface MenuItem {
    label: string;
    icon: string;
    link: string;
}
