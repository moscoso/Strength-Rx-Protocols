import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { FireAuthService } from 'src/app/core/firebase/auth/auth.service';

@Injectable({
    'providedIn': 'root'
})
/**
 * A route guard that checks if the user is authenticated before activating the route
 */
export class AuthGuard implements CanActivate {
    constructor(private authService: FireAuthService, private router: Router, private toast: ToastService) {}
    async canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Promise < boolean | UrlTree > {
        const user = await this.authService.getUser().pipe(take(1)).toPromise();
        if (user) {
            return true;
        } else {
            this.toast.failed(`Authentication required`, `Please login`);
            return this.router.parseUrl('/login');
        }
    }
}
