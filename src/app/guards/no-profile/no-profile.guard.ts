import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { take, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ToastController } from '@ionic/angular';
import { AppState } from 'src/app/core/state/app.state';

@Injectable({
    'providedIn': 'root'
})
/**
 * A route guard that checks to make sure the user does not already have a valid profile before activating the route
 */
export class NoProfileGuard implements CanActivate {
    constructor(private store: Store, private router: Router, private toaster: ToastController) {}
    async canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Promise < boolean | UrlTree > {
        return this.store.select((appState: AppState) => appState)
            .pipe(
                filter(appState => appState.auth.userID != null && appState.profiles.initialized),
                take(1),
            ).toPromise()
            .then(async (appState) => {
                const profile = appState.profiles.entities[appState.auth.userID];
                if (profile == null) {
                    return true;
                } else {
                    const toast = await this.toaster.create({
                        'message': 'You already have a profile',
                        'duration': 10000,
                        'color': 'primary',
                        'position': 'bottom',
                        'buttons': [{
                            'text': 'Ok',
                            'role': 'cancel'
                        }],
                    });
                    toast.present();
                    return this.router.parseUrl('/profile');
                }
            }).catch((reason) => {
                window.alert(`Something went wrong!`);
                console.error('Auth Effects. Failed to select profile for authorized user');
                console.error(reason);
                return false;
            });
    }
}
