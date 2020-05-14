import {
    Injectable
} from '@angular/core';
import {
    Actions,
    Effect,
    ofType
} from '@ngrx/effects';

import {
    Observable,
    from
} from 'rxjs';
import {
    switchMap,
    pluck
} from 'rxjs/operators';
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
} from './auth.actions';
import { AuthService } from '../../firebase/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';


@Injectable()
export class AuthEffects {

    @Effect() loginWithEmailAction$: Observable < AuthAction > = this.actions$.pipe(
        ofType(AuthActionType.LoginWithEmailAndPassword),
        pluck('payload'),
        switchMap((payload: any) => {
            return from(this.authService.signInWithEmailAndPassword(payload.email, payload.password)
                .then(credential => {
                    return new LoginSuccessAction();
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
        pluck('payload'),
        switchMap(payload => {
            return from(this.authService.signInAsGuest()
                .then(credential => {
                    return new LoginSuccessAction();
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
        pluck('payload'),
        switchMap((payload: any) => {
            return from(this.authService.createUserWithEmailAndPassword(payload.email, payload.password)
                .then(_ => {
                    return new SignupSuccessAction();
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
        private store: Store < AppState >
    ) {
        this.authService.getUser().subscribe(async (authenticatedUser: any) => {
            if (authenticatedUser) {
                this.store.dispatch(new AuthenticatedAction({
                    'userData': authenticatedUser
                }));
            } else {
                this.store.dispatch(new NotAuthenticatedAction());
            }
        });
    }
}
