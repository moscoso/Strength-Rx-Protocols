import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { MealAction, MealActionType} from './meals.actions';
import * as Meals from './meals.actions';
import { ModalController } from '@ionic/angular';
import { MealService } from '../../firebase/meals/meal.service';

@Injectable()
export class MealEffects {

    @Effect() allRequested$: Observable < MealAction > = this.actions$.pipe(
        ofType<MealAction>(MealActionType.AllRequested),
        switchMap((action: Meals.AllRequested) => {
            return from(this.mealService.getAll()
                .then(meals => {
                    return new Meals.AllLoaded(meals);
                })
                .catch(error => {
                    return new Meals.RequestFailed({
                        'error': error
                    });
                })
            );
        })
    );

    @Effect() createRequested$: Observable < MealAction > = this.actions$.pipe(
        ofType<MealAction>(MealActionType.CreateRequested),
        switchMap((action: Meals.CreateRequested) => {
            return from(this.mealService.create(action.meal)
                .then(() => {
                    return new Meals.Created();
                })
                .catch(error => {
                    return new Meals.RequestFailed({
                        'error': error
                    });
                })
            );
        })
    );

    @Effect({'dispatch': false}) createCompleted$: Observable < MealAction > = this.actions$.pipe(
        ofType<MealAction>(MealActionType.Created),
        tap((action: Meals.CreateRequested) => {
            this.modalController.dismiss();
        })
    );

    constructor(
        private mealService: MealService,
        private actions$: Actions,
        private modalController: ModalController,
    ) {}
}
