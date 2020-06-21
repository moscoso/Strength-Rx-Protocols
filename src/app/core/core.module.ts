import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FirebaseModule } from './firebase/firebase.module';
import { StateModule } from './state/state.module';


@NgModule({
    'imports': [
        FirebaseModule,
        StateModule,
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only'
            );
        }
    }
}
