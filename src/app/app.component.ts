import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AppState } from './core/state/app.state';
import { selectURL } from './core/state/router/router.selectors';

@Component({
    'selector': 'app-root',
    'templateUrl': 'app.component.html',
    'styleUrls': ['app.component.scss']
})
export class AppComponent implements OnInit {
    public selectedRoute = '';
    public items: MenuItem[] = [
        {
            'label': 'Exercises',
            'icon': 'fitness',
            'link': '/exercises'
        },
        {
            'label': 'Login',
            'icon': '',
            'link': '/login'
        },
        {
            'label': 'Register',
            'icon': '',
            'link': '/register'
        },
    ];

    constructor(
        private platform: Platform,
        private store: Store<AppState>,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {});
    }

    ngOnInit() {
        this.store.select(selectURL).subscribe(url => {
            this.selectedRoute = url;
        });
    }
}

interface MenuItem {
    label: string;
    icon: string;
    link: string;
}
