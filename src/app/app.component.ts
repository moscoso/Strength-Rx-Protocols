import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { AuthFacade } from './core/state/auth/auth.facade';
import { ProfileFacade } from './core/state/profile/profile.facade';
import { RouterStoreDispatcher } from './core/state/router/router.dispatcher';
import { MenuItem } from './shared/menu-list/menu-list.component';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { SwUpdate } from '@angular/service-worker';
import { ToastService } from './shared/toast/toast.service';

@UntilDestroy()
@Component({
    'selector': 'app-root',
    'templateUrl': 'app.component.html',
    'styleUrls': ['app.component.scss']
})
export class AppComponent implements OnInit {
    public landingPages: MenuItem[] = [
        {
            'label': 'Coaches',
            'icon': 'people',
            'scrollID': 'coaches'
        },
        {
            'label': 'Transformations',
            'icon': 'people',
            'scrollID': 'transformations'
        },
        {
            'label': 'Services',
            'icon': 'people',
            'scrollID': 'services'
        },
        {
            'label': 'Store',
            'icon': 'shirt-outline',
            'href': 'https://strength-rx.myshopify.com/collections/all'
        }

    ];

    public trainerFeatures: MenuItem[] = [
        {
            'label': 'Profile',
            'icon': 'people-outline',
            'link': '/profile'
        },
        {
            'label': 'Master Programs',
            'icon': 'calendar-outline',
            'link': '/programs'
        },
        {
            'label': 'Master Workouts',
            'icon': 'fitness',
            'link': '/workouts'
        },
        {
            'label': 'Exercises',
            'icon': 'barbell',
            'link': '/exercises'
        },
        {
            'label': 'Clients',
            'icon': 'list-outline',
            'link': '/clients'
        },
        // {
        //     'label': 'Store',
        //     'icon': 'shirt-outline',
        //     'href': 'https://strength-rx.myshopify.com/collections/all'
        // },
    ];

    public clientFeatures: MenuItem[] = [
        {
            'label': 'Profile',
            'icon': 'people-outline',
            'link': '/profile'
        },
        {
            'label': 'Training Calendar',
            'icon': 'today-outline',
            'link': '/calendar',
        },
        {
            'label': 'Check In',
            'icon': 'checkbox-outline',
            'link': '/check-in',
        },
        {
            'label': 'Store',
            'icon': 'shirt-outline',
            'href': 'https://strength-rx.myshopify.com/collections/all'
        },
        {
            'label': 'Reviews',
            'icon': 'videocam-outline',
            'link': '/reviews',
        },
        {
            'label': 'Progress Pics',
            'icon': 'aperture-outline',
            'link': '/progress-pics',
        },
        {
            'label': 'Billing',
            'icon': 'card-outline',
            'link': '/billing'
        }

    ];

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
    public iAmTrainer$: Observable < boolean > = of (false);
    public url$: Observable < string > = of ('/');

    constructor(
        private platform: Platform,
        private profileService: ProfileFacade,
        private routerService: RouterStoreDispatcher,
        private authService: AuthFacade,
        private serviceWorkerUpdate: SwUpdate,
        private toastService: ToastService,
    ) {
        this.initializeApp();
    }

    async initializeApp() {
        this.platform.ready().then(() => {});
        this.profileService.loadAll();
        this.iAmTrainer$ = this.profileService.selectUserIsTrainer();
        this.addAvatarToMenu();
        this.profileService.selectUserAsProfile().pipe(
            untilDestroyed(this)
        ).subscribe(profile => {
            this.addAvatarToMenu();
        });
    }

    ngOnInit() {
        this.isAuthenticated$ = this.authService.selectAuthenticated();
        this.url$ = this.routerService.selectURL();
        if (this.serviceWorkerUpdate.isEnabled) {
            this.serviceWorkerUpdate.available.subscribe(() => {
                if (confirm('New version available. Load New Version?')) {
                    window.location.reload();
                }
            });
        }

        this.serviceWorkerUpdate.activated.subscribe(() => {
            this.toastService.primary('New Version Activated!');
        });
    }

    logout() {
        this.authService.logout();
    }

    async addAvatarToMenu() {
        const avatar = await this.profileService.getProfilePic();
        delete this.trainerFeatures[0].icon;
        this.trainerFeatures[0].img = avatar;
        delete this.clientFeatures[0].icon;
        this.clientFeatures[0].img = avatar;
    }
}
