import { Injectable } from '@angular/core';
import { StateModule } from '../state.module';
import { Store } from '@ngrx/store';
import { selectParams, selectURL, selectRouterState, selectQueryParams } from './router.selectors';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';

/**
 * This service is responsible for selecting
 * router data from the Store
 */
@Injectable({ 'providedIn': StateModule })
export class RouterStateService {

    constructor(private store: Store) {}

    selectParams(): Observable < Params > {
        return this.store.select(selectParams);
    }

    selectState() {
        return this.store.select(selectRouterState);
    }

    selectQueryParams(): Observable < Params > {
        return this.store.select(selectQueryParams);
    }

    selectURL() {
        return this.store.select(selectURL);
    }
}
