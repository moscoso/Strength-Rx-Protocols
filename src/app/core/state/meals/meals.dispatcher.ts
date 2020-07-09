import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { FireAuthService } from '../../firebase/auth/auth.service';
import * as MealAction from './meals.actions';
import { StateModule } from '../state.module';
import { Meal } from './meals.state';
import {
    selectMealByID,
    selectMealByRouteURL,
    selectRequestInProgress,
    selectAll,
    selectEntities,
    selectTotal,
    selectIds
} from './meals.selector';
import { AllRequested } from './meals.actions';
import { Observable } from 'rxjs';
import { Dictionary } from '@ngrx/entity';

/**
 * This service is responsible for dispatching meal actions to the Store and selecting
 * auth data from the Store
 */
@Injectable({ 'providedIn': StateModule })
export class MealStoreDispatcher {
    constructor(
        protected store: Store < AppState > ,
        protected fireAuth: FireAuthService
    ) {}

    /** Dispatch a CreateRequested action to the store */
    public create(meal: Meal): void {
        this.store.dispatch(new MealAction.CreateRequested(meal));
    }

    /** Dispatch an UpdateRequested action to the store */
    public update(id: string, changes: Partial < Meal > ): void {
        this.store.dispatch(new MealAction.UpdateRequested(id, changes));
    }

    /** Dispatch a DeleteRequested action to the store */
    public delete(id: string): void {
        this.store.dispatch(new MealAction.DeleteRequested(id));
    }

    /**
     * Dispatch an AllRequested action to the store
     */
    public loadAll(): void {
        this.store.dispatch(new AllRequested());
    }

    public selectMeal(id: string): Observable < Meal > {
        return this.store.select(selectMealByID(id));
    }

    public selectMealByRouteURL(): Observable < Meal > {
        return this.store.select(selectMealByRouteURL);
    }

    public selectRequestInProgress(): Observable < boolean > {
        return this.store.select(selectRequestInProgress);
    }

    public selectAll(): Observable < Meal[] > {
        return this.store.select(selectAll);
    }

    public selectIDs(): Observable < string[] | number[] > {
        return this.store.select(selectIds);
    }

    public selectMeals(): Observable < Dictionary < Meal >> {
        return this.store.select(selectEntities);
    }

    public selectTotal(): Observable < number > {
        return this.store.select(selectTotal);
    }
}
