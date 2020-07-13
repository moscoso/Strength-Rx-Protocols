import { createEntityAdapter } from '@ngrx/entity';
import { Profile, ProfilesState } from './profile.state';
import { ProfileAction, ProfileActionType } from './profile.actions';


export const profilesAdapter = createEntityAdapter < Profile > ({
    'selectId': exercise => exercise.id,
    'sortComparer': (exerciseA, exerciseB) => exerciseA.lastName.localeCompare(exerciseB.lastName)
});
const initialState: ProfilesState = profilesAdapter.getInitialState({
    'requestInProgress': false,
    'error': null,
    'initialized': false,
});
export function profilesReducer(state: ProfilesState = initialState, action: ProfileAction): ProfilesState {
    switch (action.type) {
        case ProfileActionType.AllRequested:
            return {
                ...state,
                'requestInProgress': true,
                'error': null,
            };
        case ProfileActionType.AllLoaded:
            console.log(state);
            console.log(action.profiles);
            return profilesAdapter.setAll(action.profiles, {
                ...state,
                'requestInProgress': false,
                'initialized': action.profiles.length > 0,
            });
        case ProfileActionType.CreateRequested:
        case ProfileActionType.UpdateRequested:
        case ProfileActionType.DeleteRequested:
            return {
                ...state,
                'requestInProgress': true,
                'error': null,
            };
        case ProfileActionType.Created:
            return profilesAdapter.addOne(action.profile, {
                ...state,
                'requestInProgress': false,
            });
        case ProfileActionType.Updated:
            return profilesAdapter.updateOne({ 'id': action.id, 'changes': action.changes }, {
                ...state,
                'requestInProgress': false,
            });
        case ProfileActionType.Deleted:
            return profilesAdapter.removeOne(action.id, {
                ...state,
                'requestInProgress': false,
            });
        case ProfileActionType.SignedOut:
            return profilesAdapter.removeAll(state);
        case ProfileActionType.RequestFailed:
            return {
                ...state,
                'error': action.error,
                'requestInProgress': false,
            };
        default:
            return state;
    }
}


