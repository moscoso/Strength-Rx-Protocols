import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Profile } from './profile.model';

/**
 * ProfilesState is expressed as an EntityState
 * which includes a dictionary of profiles and
 * a list of ids that identifies each profile
 */
export interface ProfilesState extends EntityState < Profile > {
    requestInProgress: boolean;
    error: any | null;
    initialized: boolean;
}

export const profilesAdapter = createEntityAdapter < Profile > ({
    'selectId': profile => profile.id,
    'sortComparer': (profileA, profileB) => profileA.lastName.localeCompare(profileB.lastName)
});

export const PROFILES_INIT_STATE: ProfilesState = profilesAdapter.getInitialState({
    'requestInProgress': false,
    'error': null,
    'initialized': false,
});
