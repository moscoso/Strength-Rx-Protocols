import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthEffects } from './auth/auth.effects';
import { AuthStoreDispatcher } from './auth/auth.dispatcher';
import { appReducers } from './app.reducer';
import { ExerciseEffects } from './exercises/exercises.effects';
@NgModule({
    'imports': [
        EffectsModule.forRoot([
            AuthEffects,
            ExerciseEffects,
        ]),
        StoreModule.forRoot(appReducers),
        StoreRouterConnectingModule.forRoot({ 'stateKey': 'router' }),
        StoreDevtoolsModule.instrument({ 'maxAge': 25, 'name': `Strength Rx Protocols` }),
    ],
    'providers': [
        AuthStoreDispatcher,
    ]
})
export class StateModule {}
