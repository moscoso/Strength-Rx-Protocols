import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from '../../firebase/auth/auth.service';

@Injectable({
    'providedIn': 'root'
})
/**
 * A route guard that checks if the user is authenticated before activating the route
 */
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService) {}
    async canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Promise < boolean | UrlTree > {
        const user = await this.authService.getUser().pipe(take(1)).toPromise().catch(reason => {
            console.error(reason);
            window.alert(`Auth guard failed. ${reason}`);
            return false;
        });
        if (user) {
            return true;
        } else {
            window.alert(`You don't have permision to view this page`);
            return false;
        }
    }
}
