import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { AuthStoreDispatcher } from './core/state/auth/auth.dispatcher';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


@Component({
    'selector': 'app-root',
    'templateUrl': 'app.component.html',
    'styleUrls': ['app.component.scss']
})
export class AppComponent implements OnInit {
    public mainPages: MenuItem[] = [
        {
            'label': 'Exercises',
            'icon': 'fitness',
            'link': '/exercises'
        },
        {
            'label': 'Workouts',
            'icon': 'fitness',
            'link': '/workouts'
        },
        {
            'label': 'Profile',
            'icon': '',
            'link': '/profile'
        },
    ];

    public accountPages: MenuItem [] = [
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

    public isAuthenticated: Observable<boolean> = of(false);

    constructor(
        private platform: Platform,
        private authDispatcher: AuthStoreDispatcher,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {});
    }

    ngOnInit() {
        this.isAuthenticated = this.authDispatcher.getState().pipe(map(state => state.isAuthenticated));
    }

    logout() {
        this.authDispatcher.logout();
    }
}

interface MenuItem {
    label: string;
    icon: string;
    link: string;
}
