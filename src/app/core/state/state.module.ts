import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FirebaseModule } from '../firebase/firebase.module';
import { authReducer } from './auth/auth.reducer';
import { AuthEffects } from './auth/auth.effects';
import { AuthStoreDispatcher } from './auth/auth.dispatcher';
import { ExerciseReducer } from './exercises/exercises.reducer';

@NgModule({
    'imports': [

        EffectsModule.forRoot([
            AuthEffects,
        ]),

        StoreModule.forRoot({
            'auth': authReducer,
            'exercise': ExerciseReducer,
        }),

        FirebaseModule,

        StoreDevtoolsModule.instrument({ 'maxAge': 25, 'name': `Strength Rx Protocols` }),
    ],
    'providers': [
        AuthStoreDispatcher,
    ]
})
export class StateModule {}
