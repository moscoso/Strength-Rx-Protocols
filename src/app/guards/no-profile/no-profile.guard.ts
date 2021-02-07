import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { first, timeout } from 'rxjs/operators';
import { ProfileFacade } from 'src/app/core/state/profile/profile.facade';
import { AuthFacade } from 'src/app/core/state/auth/auth.facade';
import { ToastService } from 'src/app/shared/toast/toast.service';
/**
 * A route guard that checks to make sure the user does not already have a valid profile before activating the route
 */
@Injectable({
    'providedIn': 'root'
})
export class NoProfileGuard implements CanActivate {
    constructor(
        private profileService: ProfileFacade,
        private authService: AuthFacade,
        private router: Router,
        private toaster: ToastService
    ) {}
    async canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise < boolean | UrlTree > {
        const authData = await this.authService.selectUserData().pipe(first(userData => userData != null)).toPromise();
        this.profileService.refreshOne(authData.uid);
        let timeExpired = false;
        await this.profileService.selectRequestInProgress().pipe(
            first(requestInProgress => requestInProgress === false),
            timeout(15000),
        ).toPromise().catch(() => {
            const header = `A request took too long.`;
            const message =  `Please check your internet connection and refresh the page`;
            this.toaster.failed(header, message);
            timeExpired = true;
        });
        if (timeExpired) {return false; }
        return this.profileService.selectUserAsProfile().pipe(first()).toPromise()
            .then(async (profile) => {
                if (profile == null) {
                    return true;
                } else {
                    await this.toaster.primary('You already have a profile');
                    return this.router.parseUrl('/profile');
                }
            });
    }
}
