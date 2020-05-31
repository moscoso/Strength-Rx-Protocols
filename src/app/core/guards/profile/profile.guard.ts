import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ToastController } from '@ionic/angular';
import { selectUserProfile } from '../../state/profile/profile.selector';

@Injectable({
    'providedIn': 'root'
})
/**
 * A route guard that checks if the user has a valid profile before activating the route
 */
export class ProfileGuard implements CanActivate {
    constructor(private store: Store, private router: Router, private toaster: ToastController) {}
    async canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Promise < boolean | UrlTree > {
        return this.store.select(selectUserProfile)
            .pipe(take(1)).toPromise()
            .then(async (profile) => {
                if (profile == null) {
                    const toast = await this.toaster.create({
                        'message': 'Please create your profile to continue!',
                        'duration': 3000,
                        'color': 'primary',
                        'position': 'top',
                    });
                    toast.present();
                    return this.router.parseUrl('/create-profile');
                } else {
                    return true;
                }
            }).catch((reason) => {
                window.alert(`Something went wrong!`);
                console.error('Auth Effects. Failed to select profile for authorized user');
                console.error(reason);
                return false;
            });
    }
}
