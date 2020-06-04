import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from '../../firebase/auth/auth.service';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Injectable({
    'providedIn': 'root'
})
/**
 * A route guard that checks if the user is authenticated before activating the route
 */
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router, private toast: ToastService) {}
    async canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Promise < boolean | UrlTree > {
        const user = await this.authService.getUser().pipe(take(1)).toPromise().catch(reason => {
            console.error(reason);
            this.toast.failed(`You don't have permission to view this page`, `Please login`);
            return this.router.parseUrl('/');

        });
        if (user) {
            return true;
        } else {
            this.toast.failed(`You don't have permission to view this page`, `Please login`);
            return this.router.parseUrl('/');
        }
    }
}
