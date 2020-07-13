import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { take, filter, first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ToastController } from '@ionic/angular';
import { AppState } from 'src/app/core/state/app.state';
import { ProfileStoreDispatcher } from 'src/app/core/state/profile/profiles.dispatcher';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { AuthStoreDispatcher } from 'src/app/core/state/auth/auth.dispatcher';


@Injectable({
    'providedIn': 'root'
})
/**
 * A route guard that checks if the user has a valid profile before activating the route
 */
export class ProfileGuard implements CanActivate {
    constructor(
        private router: Router,
        private toaster: ToastService,
        private profileService: ProfileStoreDispatcher,
        private authService: AuthStoreDispatcher,
    ) {}
    async canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Promise < boolean | UrlTree > {
        this.profileService.loadAll();
        await this.profileService.selectRequestInProgress().pipe(first(requestInProgress => requestInProgress ===
            false)).toPromise();
        await this.authService.selectUserData().pipe(first(userData => userData != null)).toPromise();
        return this.profileService.selectUserProfile()
            .pipe(
                take(1),
            ).toPromise()
            .then(async (profile) => {
                console.log(profile);
                if (profile) {
                    return true;
                } else {
                    await this.toaster.primary('Please create your profile to continue!');
                    return this.router.parseUrl('/create-profile');
                }
            }).catch((reason) => {
                this.toaster.failed(
                    'Profile failed to load. Check your internet connection and refresh the page', reason);
                return false;
            });
    }
}
