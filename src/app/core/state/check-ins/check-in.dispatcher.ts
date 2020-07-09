import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { FireAuthService } from '../../firebase/auth/auth.service';
import * as CheckInAction from './check-in.actions';
import { StateModule } from '../state.module';
import { CheckIn } from './check-in.state';
import {
    selectCheckInByID,
    selectCheckInByRouteURL,
    selectRequestInProgress,
    selectAll,
    selectEntities,
    selectTotal,
    selectIds
} from './check-in.selector';
import { AllRequested } from './check-in.actions';
import { Observable } from 'rxjs';
import { Dictionary } from '@ngrx/entity';

/**
 * This service is responsible for dispatching checkIn actions to the Store and selecting
 * auth data from the Store
 */
@Injectable({ 'providedIn': StateModule })
export class CheckInStoreDispatcher {
    constructor(
        protected store: Store < AppState > ,
        protected fireAuth: FireAuthService
    ) {}

    /** Dispatch a CreateRequested action to the store */
    public create(checkIn: CheckIn): void {
        this.store.dispatch(new CheckInAction.CreateRequested(checkIn));
    }

    /** Dispatch an UpdateRequested action to the store */
    public update(id: string, changes: Partial < CheckIn > ): void {
        this.store.dispatch(new CheckInAction.UpdateRequested(id, changes));
    }

    /** Dispatch a DeleteRequested action to the store */
    public delete(id: string): void {
        this.store.dispatch(new CheckInAction.DeleteRequested(id));
    }

    /**
     * Dispatch an AllRequested action to the store
     */
    public loadAll(): void {
        this.store.dispatch(new AllRequested());
    }

    public selectCheckIn(id: string): Observable < CheckIn > {
        return this.store.select(selectCheckInByID(id));
    }

    public selectCheckInByRouteURL(): Observable < CheckIn > {
        return this.store.select(selectCheckInByRouteURL);
    }

    public selectRequestInProgress(): Observable < boolean > {
        return this.store.select(selectRequestInProgress);
    }

    public selectAll(): Observable < CheckIn[] > {
        return this.store.select(selectAll);
    }

    public selectIDs(): Observable < string[] | number[] > {
        return this.store.select(selectIds);
    }

    public selectCheckIns(): Observable < Dictionary < CheckIn >> {
        return this.store.select(selectEntities);
    }

    public selectTotal(): Observable < number > {
        return this.store.select(selectTotal);
    }
}
