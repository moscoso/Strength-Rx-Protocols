import { BaseRouterStoreState, RouterReducerState, SerializedRouterStateSnapshot } from '@ngrx/router-store';
import { Params } from '@angular/router';


export interface CustomRouterReducerState extends RouterReducerState<BaseRouterStoreState> {
    navigationId: number;
    state: CustomRouterStoreState;
}

export interface CustomRouterStoreState extends BaseRouterStoreState {
    url: string;
    params: Params;
    queryParams: Params;
}
