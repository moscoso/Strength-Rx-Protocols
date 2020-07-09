import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { MealAction, MealActionType} from './meals.actions';
import * as Meals from './meals.actions';
import { ModalController } from '@ionic/angular';
import { MealService } from '../../firebase/meal/meal.service';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { Router } from '@angular/router';

@Injectable()
export class MealEffects {

    @Effect({'dispatch': false}) error$: Observable<MealAction> = this.actions$.pipe(
        ofType(MealActionType.RequestFailed),
        tap((action: Meals.RequestFailed) => {
            this.toaster.failed('Something went wrong', action.error.error.code);
        })
    );

    @Effect() allRequested$: Observable < MealAction > = this.actions$.pipe(
        ofType<MealAction>(MealActionType.AllRequested),
        switchMap((action: Meals.AllRequested) => {
            return from(this.mealService.getAll()
                .then(meals => new Meals.AllLoaded(meals))
                .catch(error => new Meals.RequestFailed(error)
            ));
        })
    );

    @Effect() createRequested$: Observable < MealAction > = this.actions$.pipe(
        ofType<MealAction>(MealActionType.CreateRequested),
        switchMap((action: Meals.CreateRequested) => {
            return from(this.mealService.create(action.meal)
                .then((meal) => new Meals.Created(meal))
                .catch(error => new Meals.RequestFailed(error))
            );
        })
    );

    @Effect() updateRequested$: Observable < MealAction > = this.actions$.pipe(
        ofType<MealAction>(MealActionType.CreateRequested),
        switchMap((action: Meals.CreateRequested) => {
            return from(this.mealService.update(action.meal.id, action.meal)
                .then(() => new Meals.Updated(action.meal.id, action.meal))
                .catch(error => new Meals.RequestFailed(error))
            );
        })
    );

    @Effect() deleteRequested$: Observable < MealAction > = this.actions$.pipe(
        ofType<MealAction>(MealActionType.DeleteRequested),
        switchMap((action: Meals.DeleteRequested) => {
            return from(this.mealService.delete(action.id)
                .then(() => new Meals.Deleted(action.id))
                .catch(error => new Meals.RequestFailed(error))
            );
        })
    );

    @Effect({'dispatch': false}) formCompleted$: Observable < MealAction > = this.actions$.pipe(
        ofType<MealAction>(MealActionType.Created, MealActionType.Updated),
        tap(() => {
            this.modalController.dismiss();
            this.router.navigateByUrl('/exercises');
        })
    );

    @Effect({'dispatch': false}) deleted$: Observable < MealAction > = this.actions$.pipe(
        ofType<MealAction>(MealActionType.Deleted),
        tap((action: Meals.CreateRequested) => {
            this.router.navigateByUrl('/exercises');
        })
    );

    constructor(
        private mealService: MealService,
        private actions$: Actions,
        private modalController: ModalController,
        private toaster: ToastService,
        private router: Router
    ) {}
}
