import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from } from 'rxjs';
import { switchMap, pluck, tap } from 'rxjs/operators';
import {
    AuthActionType,
    AuthAction,
    AuthFailed,
    LoginFailed,
    LoginCompleted,
    ResetPasswordFailed,
    PasswordResetCompleted,
    SignupFailed,
    SignupCompleted,
    LoginWithEmailAttempted,
    SignupRequested,
    NotAuthenticated,
    LoginAsNewAccountCompleted,
    LoginWithEmailAsNewAccountAttempted,
} from './auth.actions';
import { FireAuthService } from '../../firebase/auth/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Injectable()
export class AuthEffects {
    @Effect({ 'dispatch': false }) loggedIn$: Observable < AuthAction > = this.actions$.pipe(
        ofType(
            AuthActionType.LoginCompleted,
        ),
        tap(() => {
            this.toaster.dismiss();
            this.router.navigateByUrl('/dashboard');
        })
    );

    @Effect({ 'dispatch': false }) loggedInAsNewAccount$: Observable < AuthAction > = this.actions$.pipe(
        ofType(
            AuthActionType.LoginAsNewAccountCompleted,
        ),
        tap((action: LoginAsNewAccountCompleted) => {
            this.toaster.dismiss();
            this.router.navigateByUrl(`/start-membership?planType=${action.plan.planType}&planLength=${action.plan.planLength}`);
        })
    );

    @Effect({ 'dispatch': false }) signedUp$: Observable < AuthAction > = this.actions$.pipe(
        ofType(
            AuthActionType.SignupCompleted),
        tap(() => {
            this.toaster.dismiss();
            this.toaster.success('Sign up completed!');
            this.router.navigateByUrl('/create-profile');
        })
    );

    @Effect({ 'dispatch': false }) loginFailed$: Observable < AuthAction > = this.actions$.pipe(
        ofType(AuthActionType.LoginFailed),
        tap(async (action: LoginFailed) => {
            this.toaster.failed('Login Failed', action.error.message);
        })
    );

    @Effect({ 'dispatch': false }) signupFailed$: Observable < AuthAction > = this.actions$.pipe(
        ofType(AuthActionType.SignupFailed),
        tap((action: SignupFailed) => {
            this.toaster.failed('SignUp Failed', action.error.message);
        })
    );

    @Effect({ 'dispatch': false }) resetPasswordFailed$: Observable < AuthAction > = this.actions$.pipe(
        ofType(AuthActionType.PasswordResetFailed),
        tap((action: ResetPasswordFailed) => {
            this.toaster.failed('Password Reset Failed', action.error.message);
        })
    );

    @Effect({ 'dispatch': false }) paswordResetCompleted$: Observable < AuthAction > = this.actions$.pipe(
        ofType(AuthActionType.PasswordResetCompleted),
        tap(() => {
            this.toaster.success('Password Reset Successfully');
            this.router.navigateByUrl('/login');
        })
    );

    @Effect({ 'dispatch': false }) AuthFailed$: Observable < AuthAction > = this.actions$.pipe(
        ofType(AuthActionType.AuthFailed),
        tap(async (action: AuthFailed) => {
            this.toaster.failed('Something went wrong', action.error.message);
        })
    );

    @Effect() loginWithEmail$: Observable < AuthAction > = this.actions$.pipe(
        ofType(AuthActionType.LoginWithEmailAndPasswordAttempted),
        switchMap((action: LoginWithEmailAttempted) => {
            return from(this.authService.signInWithEmailAndPassword(action.email, action.password)
                .then(() => new LoginCompleted())
                .catch(error => new LoginFailed(error))
            );
        })
    );

    @Effect() loginWithEmailAsNewAccount$: Observable < AuthAction > = this.actions$.pipe(
        ofType(AuthActionType.LoginWithEmailAndPasswordAsNewAccountAttempted),
        switchMap((action: LoginWithEmailAsNewAccountAttempted) => {
            return from(this.authService.signInWithEmailAndPassword(action.email, action.password)
                .then(() => new LoginAsNewAccountCompleted(action.plan))
                .catch(error => new LoginFailed(error))
            );
        })
    );

    @Effect() loginAsGuest$: Observable < AuthAction > = this.actions$.pipe(
        ofType(AuthActionType.LoginAsGuest),
        switchMap(action => {
            return from(this.authService.signInAsGuest()
                .then(() => new LoginCompleted())
                .catch(error => new LoginFailed(error))
            );
        })
    );

    @Effect() logout$: Observable < AuthAction > = this.actions$.pipe(
        ofType(AuthActionType.LogoutRequested),
        tap(_ => {
            this.router.navigateByUrl('/');
        }),
        switchMap(_ => {
            return from(this.authService.signOut()
                .then(async () => new NotAuthenticated())
                .catch(error => new AuthFailed(error))
            );
        })
    );

    @Effect() resetPassword$: Observable < AuthAction > = this.actions$.pipe(
        ofType(AuthActionType.PasswordResetRequested),
        pluck('payload'),
        switchMap((payload: any) => {
            return from(this.authService.sendPasswordResetEmail(payload.email)
                .then(() => new PasswordResetCompleted())
                .catch(error => new ResetPasswordFailed(error))
            );
        })
    );

    @Effect() signup$: Observable < AuthAction > = this.actions$.pipe(
        ofType(AuthActionType.SignupRequested),
        switchMap((action: SignupRequested) => {
            return from(this.authService.createUserWithEmailAndPassword(action.email, action.password)
                .then(() => new SignupCompleted())
                .catch(error => new SignupFailed(error))
            );
        })
    );

    constructor(
        private authService: FireAuthService,
        private actions$: Actions,
        private router: Router,
        private toaster: ToastService,
    ) {}
}
