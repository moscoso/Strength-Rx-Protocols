import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { AuthStoreDispatcher } from './core/state/auth/auth.dispatcher';
import { ProfileStoreDispatcher } from './core/state/profile/profiles.dispatcher';
import { RouterStoreDispatcher } from './core/state/router/router.dispatcher';
import { MenuItem } from './shared/menu-list/menu-list.component';

@Component({
    'selector': 'app-root',
    'templateUrl': 'app.component.html',
    'styleUrls': ['app.component.scss']
})
export class AppComponent implements OnInit {
    public landingPages: MenuItem[] = [
    {
        'label': 'About Us',
        'icon': 'people',
        'scrollID': 'about'
    },
    {
        'label': 'Transformations',
        'icon': 'people',
        'scrollID': 'transformations'
    }];

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
    }, ];

    public accountPages: MenuItem[] = [
    {
        'label': 'Login',
        'icon': '',
        'link': '/login'
    },
    {
        'label': 'Register',
        'icon': '',
        'link': '/register'
    }, ];

    public isAuthenticated$: Observable < boolean > = of (false);
    public url$: Observable < string > = of ('/');

    constructor(
        private platform: Platform,
        private profileService: ProfileStoreDispatcher,
        private routerService: RouterStoreDispatcher,
        private authService: AuthStoreDispatcher,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {});
        this.profileService.loadAll();
    }

    ngOnInit() {
        this.isAuthenticated$ = this.authService.selectAuthenticated();
        this.url$ = this.routerService.selectURL();
    }

    logout() {
        this.authService.logout();
    }
}
