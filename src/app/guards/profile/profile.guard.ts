import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ProfileFacade } from 'src/app/core/state/profile/profile.facade';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { AuthFacade } from 'src/app/core/state/auth/auth.facade';

/**
 * A route guard that checks if the user has a valid profile before activating the route
 */
@Injectable({
    'providedIn': 'root'
})
export class ProfileGuard implements CanActivate {
    constructor(
        private router: Router,
        private toaster: ToastService,
        private profileService: ProfileFacade,
        private authService: AuthFacade,
    ) {}
    async canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise < boolean | UrlTree > {
        const authData = await this.authService.selectUserData().pipe(first(userData => userData != null)).toPromise();
        this.profileService.refreshOne(authData.uid);
        await this.profileService.selectRequestInProgress().pipe(first(requestInProgress => requestInProgress === false)).toPromise();
        return this.profileService.selectUserAsProfile().pipe(first()).toPromise()
            .then(async (profile) => {
                if (profile) {
                    return true;
                } else {
                    await this.toaster.primary('Please create your profile to continue!');
                    return this.router.parseUrl('/create-profile');
                }
            }).catch((reason) => {
                this.toaster.failed('Profile failed to load. Check your internet connection and refresh the page', reason);
                return false;
            });
    }
}
