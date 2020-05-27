import { RouterStateSerializer } from '@ngrx/router-store';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { CustomRouterStoreState } from './router.state';

export class CustomSerializer implements RouterStateSerializer < CustomRouterStoreState > {
    serialize(routerState: RouterStateSnapshot): CustomRouterStoreState {
        let route: ActivatedRouteSnapshot = routerState.root;

        while (route.firstChild) {
            route = route.firstChild;
        }


        const {
            url,
            root: { queryParams },
        } = routerState;
        const { params } = route;

        // Only return an object including the URL, params and query params
        // instead of the entire snapshot
        return { url, params, queryParams };
    }
}


