import { Component, OnInit } from '@angular/core';
import { AuthFacade } from 'src/app/core/state/auth/auth.facade';

@Component({
    'selector': 'logout-button',
    'templateUrl': './logout-button.component.html',
    'styleUrls': ['./logout-button.component.scss'],
})
export class LogoutButtonComponent implements OnInit {

    constructor(public authService: AuthFacade) {}

    ngOnInit() {}

    logout() {
        this.authService.logout();
    }
}
