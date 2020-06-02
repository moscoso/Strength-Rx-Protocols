import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { CheckInAction, CheckInActionType} from './check-in.actions';
import * as CheckIns from './check-in.actions';
import { ModalController } from '@ionic/angular';
import { CheckInService } from '../../firebase/check-in/check-in.service';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Injectable()
export class CheckInEffects {

    @Effect({'dispatch': false}) error$: Observable<CheckInAction> = this.actions$.pipe(
        ofType(CheckInActionType.RequestFailed),
        tap((action: CheckIns.RequestFailed) => {
            this.toaster.failed('Something went wrong', action.error.error.code);
        })
    );


    @Effect() allRequested$: Observable < CheckInAction > = this.actions$.pipe(
        ofType<CheckInAction>(CheckInActionType.AllRequested),
        switchMap((action: CheckIns.AllRequested) => {
            return from(this.checkInService.getAll()
                .then(checkIns => {
                    return new CheckIns.AllLoaded(checkIns);
                })
                .catch(error => {
                    return new CheckIns.RequestFailed({
                        'error': error
                    });
                })
            );
        })
    );

    @Effect() createRequested$: Observable < CheckInAction > = this.actions$.pipe(
        ofType<CheckInAction>(CheckInActionType.CreateRequested),
        switchMap((action: CheckIns.CreateRequested) => {
            return from(this.checkInService.create(action.checkIn)
                .then((checkIn) => {
                    return new CheckIns.Created(checkIn);
                })
                .catch(error => {
                    return new CheckIns.RequestFailed({
                        'error': error
                    });
                })
            );
        })
    );

    @Effect({'dispatch': false}) createCompleted$: Observable < CheckInAction > = this.actions$.pipe(
        ofType<CheckInAction>(CheckInActionType.Created),
        tap((action: CheckIns.CreateRequested) => {
            this.modalController.dismiss();
        })
    );

    constructor(
        private checkInService: CheckInService,
        private actions$: Actions,
        private modalController: ModalController,
        private toaster: ToastService,
    ) {}
}
