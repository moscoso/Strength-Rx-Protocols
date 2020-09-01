import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ProfileStoreDispatcher } from 'src/app/core/state/profile/profiles.dispatcher';
import { AuthStoreDispatcher } from 'src/app/core/state/auth/auth.dispatcher';
import { ToastService } from 'src/app/shared/toast/toast.service';
/**
 * A route guard that checks to make sure the user does not already have a valid profile before activating the route
 */
@Injectable({
    'providedIn': 'root'
})
export class NoProfileGuard implements CanActivate {
    constructor(
        private profileService: ProfileStoreDispatcher,
        private authService: AuthStoreDispatcher,
        private router: Router,
        private toaster: ToastService
    ) {}
    async canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise < boolean | UrlTree > {
        const authData = await this.authService.selectUserData().pipe(first(userData => userData != null)).toPromise();
        this.profileService.refreshOne(authData.uid);
        await this.profileService.selectRequestInProgress().pipe(first(requestInProgress => requestInProgress === false)).toPromise();
        return this.profileService.selectUserProfile().pipe(first()).toPromise()
            .then(async (profile) => {
                if (profile == null) {
                    return true;
                } else {
                    await this.toaster.primary('You already have a profile');
                    return this.router.parseUrl('/profile');
                }
            }).catch((reason) => {
                this.toaster.failed('Profile failed to load. Check your internet connection and refresh the page', reason);
                return false;
            });
    }
}
