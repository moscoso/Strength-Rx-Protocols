import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from } from 'rxjs';
import { switchMap, pluck, tap, take, map } from 'rxjs/operators';
import {
    AuthActionType,
    AuthAction,
    AuthFailed,
    LoginFailed,
    LoginCompleted,
    NotAuthenticatedAction,
    ResetPasswordFailed,
    PasswordResetCompleted,
    SignupFailed,
    SignupCompleted,
    LoginWithEmailAttempted,
    SignupRequested,
    AuthenticatedAction,
} from './auth.actions';
import { AuthService } from '../../firebase/auth/auth.service';
import { AppState } from '../app.state';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Injectable()
export class AuthEffects {
    @Effect({ 'dispatch': false }) rerouteToHomePage$: Observable < AuthAction > = this.actions$.pipe(
        ofType(AuthActionType.LogoutRequested, AuthActionType.LoginCompleted, AuthActionType.SignupCompleted),
        tap(() => {
            this.router.navigateByUrl('/');
        })
    );

    // @Effect({ 'dispatch': false }) loginSuccess$: Observable < AuthAction > = this.actions$.pipe(
    //     ofType(AuthActionType.LoginCompleted),
    //     tap((action) => {
    //         this.toaster.success('Welcome back!');
    //     })
    // );

    @Effect({ 'dispatch': false }) signupSuccess$: Observable < AuthAction > = this.actions$.pipe(
        ofType(AuthActionType.SignupCompleted),
        tap(async () => {
            this.toaster.success('Sign up completed!');
        })
    );

    @Effect({ 'dispatch': false }) loginFailed$: Observable < AuthAction > = this.actions$.pipe(
        ofType(AuthActionType.LoginFailed),
        tap(async (action: LoginFailed) => {
            this.toaster.failed('Login Failed', action.error.code);
        })
    );

    @Effect({ 'dispatch': false }) AuthFailed$: Observable < AuthAction > = this.actions$.pipe(
        ofType(AuthActionType.AuthFailed),
        tap(async (action: AuthFailed) => {
            this.toaster.failed('Something went wrong', action.error.code);
        })
    );

    @Effect({ 'dispatch': false }) signupFailed$: Observable < AuthAction > = this.actions$.pipe(
        ofType(AuthActionType.SignupFailed),
        tap(async (action: SignupFailed) => {
            this.toaster.failed('Login Failed', action.error.code);
        })
    );

    @Effect({ 'dispatch': false }) resetPasswordFailed$: Observable < AuthAction > = this.actions$.pipe(
        ofType(AuthActionType.PasswordResetFailed),
        tap(async (action: ResetPasswordFailed) => {
            this.toaster.failed('Password Reset Failed', action.error.code);
        })
    );

    @Effect({ 'dispatch': false }) paswordResetCompleted$: Observable < AuthAction > = this.actions$.pipe(
        ofType(AuthActionType.PasswordResetCompleted),
        tap(async (action: PasswordResetCompleted) => {
            this.toaster.success('Password Reset Successfully');
            this.router.navigateByUrl('/login');
        })
    );

    @Effect() loginWithEmail$: Observable < AuthAction > = this.actions$.pipe(
        ofType(AuthActionType.LoginWithEmailAndPasswordAttempted),
        switchMap((action: LoginWithEmailAttempted) => {
            return from(this.authService.signInWithEmailAndPassword(action.email, action.password)
                .then(() => {
                    return new LoginCompleted();
                })
                .catch(error => {
                    return new LoginFailed({error});
                })
            );
        })
    );

    @Effect() loginAsGuest$: Observable < AuthAction > = this.actions$.pipe(
        ofType(AuthActionType.LoginAsGuest),
        switchMap(action => {
            return from(this.authService.signInAsGuest()
                .then(() => {
                    return new LoginCompleted();
                })
                .catch(error => {
                    return new LoginFailed({error});
                })
            );
        })
    );

    @Effect() logout$: Observable < AuthAction > = this.actions$.pipe(
        ofType(AuthActionType.LogoutRequested),
        switchMap(_ => {
            return from(this.authService.signOut()
                .then(async () => {
                    return new NotAuthenticatedAction();
                })
                .catch(error => {
                    return new AuthFailed({error});
                })
            );
        })
    );

    @Effect() resetPassword$: Observable < AuthAction > = this.actions$.pipe(
        ofType(AuthActionType.PasswordResetRequested),
        pluck('payload'),
        switchMap((payload: any) => {
            return from(this.authService.sendPasswordResetEmail(payload.email)
                .then(() => new PasswordResetCompleted())
                .catch(error => new ResetPasswordFailed({error}))
            );
        })
    );

    @Effect() signup$: Observable < AuthAction > = this.actions$.pipe(
        ofType(AuthActionType.SignupRequested),
        switchMap((action: SignupRequested) => {
            return from(this.authService.createUserWithEmailAndPassword(action.email, action.password)
                .then(() => new SignupCompleted())
                .catch(error => new SignupFailed({error})));
        })
    );

    constructor(
        private authService: AuthService,
        private actions$: Actions,
        private store: Store < AppState > ,
        private router: Router,
        private toaster: ToastService,
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
    private scrapeUserInfo(authenticatedUser: firebase.User): any {
        const userInfo: any = {
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
