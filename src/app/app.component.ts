import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';


@Component({
    'selector': 'app-root',
    'templateUrl': 'app.component.html',
    'styleUrls': ['app.component.scss']
})
export class AppComponent implements OnInit {
    public items: MenuItem[] = [
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
            'label': 'Login',
            'icon': '',
            'link': '/login'
        },
        {
            'label': 'Register',
            'icon': '',
            'link': '/register'
        },
        {
            'label': 'Profile',
            'icon': '',
            'link': '/profile'
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

    ngOnInit() { }
}

interface MenuItem {
    label: string;
    icon: string;
    link: string;
}
