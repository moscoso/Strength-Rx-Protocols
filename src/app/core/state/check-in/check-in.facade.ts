import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { StateModule } from '../state.module';
import { CheckIn } from './check-in.model';
import * as CheckInAction from './check-in.actions';
import * as fromCheckIn from './check-in.selector';


/**
 * This service is responsible for dispatching actions to the Store
 * and selecting data from the Store related to Check-In
 */
@Injectable({ 'providedIn': StateModule })
export class CheckInFacade {
    constructor(
        protected store: Store < AppState > ,
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
        this.store.dispatch(new CheckInAction.AllRequested());
    }

    public selectCheckIn(id: string): Observable < CheckIn > {
        return this.store.select(fromCheckIn.selectCheckInByID(id));
    }

    public selectCheckInByRouteURL(): Observable < CheckIn > {
        return this.store.select(fromCheckIn.selectCheckInByRouteURL);
    }

    public selectRequestInProgress(): Observable < boolean > {
        return this.store.select(fromCheckIn.selectRequestInProgress);
    }

    public selectAll(): Observable < CheckIn[] > {
        return this.store.select(fromCheckIn.selectAll);
    }

    public selectIDs(): Observable < string[] | number[] > {
        return this.store.select(fromCheckIn.selectIds);
    }

    public selectCheckIns(): Observable < Dictionary < CheckIn >> {
        return this.store.select(fromCheckIn.selectEntities);
    }

    public selectTotal(): Observable < number > {
        return this.store.select(fromCheckIn.selectTotal);
    }
}
