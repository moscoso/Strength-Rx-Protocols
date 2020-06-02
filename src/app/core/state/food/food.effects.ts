import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { FoodAction, FoodActionType} from './food.actions';
import * as Foods from './food.actions';
import { ModalController } from '@ionic/angular';
import { FoodService } from '../../firebase/food/food.service';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Injectable()
export class FoodEffects {

    @Effect({'dispatch': false}) error$: Observable<FoodAction> = this.actions$.pipe(
        ofType(FoodActionType.RequestFailed),
        tap((action: Foods.RequestFailed) => {
            this.toaster.failed('Something went wrong', action.error.error.code);
        })
    );

    @Effect() allRequested$: Observable < FoodAction > = this.actions$.pipe(
        ofType<FoodAction>(FoodActionType.AllRequested),
        switchMap((action: Foods.AllRequested) => {
            return from(this.foodService.getAll()
                .then(foods => {
                    return new Foods.AllLoaded(foods);
                })
                .catch(error => {
                    return new Foods.RequestFailed({
                        'error': error
                    });
                })
            );
        })
    );

    @Effect() createRequested$: Observable < FoodAction > = this.actions$.pipe(
        ofType<FoodAction>(FoodActionType.CreateRequested),
        switchMap((action: Foods.CreateRequested) => {
            return from(this.foodService.create(action.food)
                .then((food) => {
                    return new Foods.Created(food);
                })
                .catch(error => {
                    return new Foods.RequestFailed({
                        'error': error
                    });
                })
            );
        })
    );

    @Effect({'dispatch': false}) createCompleted$: Observable < FoodAction > = this.actions$.pipe(
        ofType<FoodAction>(FoodActionType.Created),
        tap((action: Foods.CreateRequested) => {
            this.modalController.dismiss('create-food');
        })
    );

    constructor(
        private foodService: FoodService,
        private actions$: Actions,
        private modalController: ModalController,
        private toaster: ToastService,
    ) {}
}
