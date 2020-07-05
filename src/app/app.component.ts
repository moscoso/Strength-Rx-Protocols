import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AllRequested } from './core/state/profile/profile.actions';
import { AuthStoreDispatcher } from './core/state/auth/auth.dispatcher';

@Component({
    'selector': 'app-root',
    'templateUrl': 'app.component.html',
    'styleUrls': ['app.component.scss']
})
export class AppComponent implements OnInit {
    public mainPages: MenuItem[] = [
        {
            'label': 'Exercises',
            'icon': 'barbell',
            'link': '/exercises'
        },
        {
            'label': 'Workouts',
            'icon': 'fitness',
            'link': '/workouts'
        },
        {
            'label': 'Profile',
            'icon': 'people-outline',
            'link': '/profile'
        },
        {
            'label': 'Clients',
            'icon': 'list-outline',
            'link': '/clients'
        },
        {
            'label': 'Foods',
            'src': '/assets/icon/food.svg',
            'link': '/foods'
        },
        {
            'label': 'Meals',
            'src': '/assets/icon/meal.svg',
            'link': '/meals'
        },
        {
            'label': 'Check In',
            'icon': 'checkbox-outline',
            'link': '/check-in',
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

    public isAuthenticated$: Observable<boolean> = of(false);

    constructor(
        private platform: Platform,
        private store: Store,
        private authService: AuthStoreDispatcher,
    ) {
        this.initializeApp();
        this.store.dispatch(new AllRequested());
    }

    initializeApp() {
        this.platform.ready().then(() => {});
    }

    ngOnInit() {
        this.isAuthenticated$ = this.authService.selectAuthenticated();
    }

    logout() {
        this.authService.logout();
    }
}

interface MenuItem {
    label: string;
    icon?: string;
    src?: string;
    link: string;
}
