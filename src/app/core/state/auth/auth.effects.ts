import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from } from 'rxjs';
import { switchMap, pluck, tap, take, map } from 'rxjs/operators';
import {
    AuthActionType,
    AuthAction,
    AuthErrorAction,
    LoginFailedAction,
    LoginSuccessAction,
    NotAuthenticatedAction,
    ResetPasswordFailedAction,
    ResetPasswordSuccessAction,
    SignupErrorAction,
    SignupSuccessAction,
    AuthenticatedAction,
    LoginWithEmailAction,
    SignupAction,
} from './auth.actions';
import { AuthService } from '../../firebase/auth/auth.service';
import { AppState } from '../app.state';
import { UserInfo } from './auth.state';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable()
export class AuthEffects {
    @Effect({ 'dispatch': false }) notAuthenticated$: Observable < AuthAction > = this.actions$.pipe(
        ofType(AuthActionType.NotAuthenticated),
        tap(() => {
            this.router.navigateByUrl('/');
        })
    );

    @Effect() loginWithEmailAction$: Observable < AuthAction > = this.actions$.pipe(
        ofType(AuthActionType.LoginWithEmailAndPassword),
        switchMap((action: LoginWithEmailAction) => {
            return from(this.authService.signInWithEmailAndPassword(action.email, action.password)
                .then(credential => {
                    return new LoginSuccessAction(credential);
                })
                .catch(error => {
                    return new LoginFailedAction({
                        'error': error
                    });
                })
            );
        })
    );

    @Effect() loginAsGuestAction$: Observable < AuthAction > = this.actions$.pipe(
        ofType(AuthActionType.LoginAsGuest),
        switchMap(action => {
            return from(this.authService.signInAsGuest()
                .then(credential => {
                    return new LoginSuccessAction(credential);
                })
                .catch(error => {
                    return new LoginFailedAction({
                        'error': error
                    });
                })
            );
        })
    );

    @Effect() logoutAction$: Observable < AuthAction > = this.actions$.pipe(
        ofType(AuthActionType.LogoutRequested),
        switchMap(_ => {
            return from(this.authService.signOut()
                .then(() => {
                    return new NotAuthenticatedAction();
                })
                .catch(error => {
                    return new AuthErrorAction({
                        'error': error
                    });
                })
            );
        })
    );

    @Effect() resetPasswordAction$: Observable < AuthAction > = this.actions$.pipe(
        ofType(AuthActionType.ResetPasswordRequested),
        pluck('payload'),
        switchMap((payload: any) => {
            return from(this.authService.sendPasswordResetEmail(payload.email)
                .then(_ => {
                    return new ResetPasswordSuccessAction();
                })
                .catch(error => {
                    return new ResetPasswordFailedAction({
                        'error': error
                    });
                })
            );
        })
    );

    @Effect() signupAction$: Observable < AuthAction > = this.actions$.pipe(
        ofType(AuthActionType.SignupRequested),
        switchMap((action: SignupAction) => {
            return from(this.authService.createUserWithEmailAndPassword(action.email, action.password)
                .then(credential => {
                    return new SignupSuccessAction(credential);
                })
                .catch(error => {
                    return new SignupErrorAction(error);
                })
            );
        })
    );

    constructor(
        private authService: AuthService,
        private actions$: Actions,
        private store: Store < AppState > ,
        private router: Router,
        private toaster: ToastController,
    ) {
        this.authService.getUser().subscribe(async (authenticatedUser: firebase.User) => {
            if (authenticatedUser) {
                const userInfo = this.scrapeUserInfo(authenticatedUser);
                this.store.dispatch(new AuthenticatedAction(userInfo));
            } else {
                this.store.dispatch(new NotAuthenticatedAction());
            }
        });
    }

    /**
     * Scrape the provided firebase.User object into a POJO matching the UserInfo interface.
     * @param authenticatedUser an authenticated user account
     */
    private scrapeUserInfo(authenticatedUser: firebase.User): UserInfo {
        const userInfo: UserInfo = {
            'displayName': authenticatedUser.displayName,
            'email': authenticatedUser.email,
            'phoneNumber': authenticatedUser.phoneNumber,
            'providerId': authenticatedUser.providerId,
            'uid': authenticatedUser.uid,
            'photoURL': authenticatedUser.photoURL,
        };
        return userInfo;
    }
}
