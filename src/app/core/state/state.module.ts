import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthStoreDispatcher } from './auth/auth.dispatcher';
import { appReducers } from './app.reducer';
import { CustomSerializer } from './router/customSerializer';
import { appEffects } from './app.effects';
import { FirebaseModule } from '../firebase/firebase.module';
@NgModule({
    'imports': [
        EffectsModule.forRoot(appEffects),
        StoreModule.forRoot(appReducers),
        StoreRouterConnectingModule.forRoot({ 'stateKey': 'router', 'serializer': CustomSerializer}, ),
        StoreDevtoolsModule.instrument({ 'maxAge': 25, 'name': `Strength Rx Protocols` }),
        FirebaseModule,
    ],
    'providers': [
        AuthStoreDispatcher,
    ]
})
export class StateModule {}
