import { Component, OnInit } from '@angular/core';
import { AuthStoreDispatcher } from 'src/app/core/state/auth/auth.dispatcher';

@Component({
    'selector': 'logout-button',
    'templateUrl': './logout-button.component.html',
    'styleUrls': ['./logout-button.component.scss'],
})
export class LogoutButtonComponent implements OnInit {

    constructor(public authService: AuthStoreDispatcher) {}

    ngOnInit() {}

    logout() {
        this.authService.logout();
    }
}
