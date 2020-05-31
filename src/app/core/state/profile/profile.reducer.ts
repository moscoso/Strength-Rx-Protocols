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
            return profilesAdapter.setAll(action.profiles, {
                ...state,
                'requestInProgress': false,
                'initialized': true,
            });
        case ProfileActionType.Created:
        case ProfileActionType.Updated:
        case ProfileActionType.Deleted:
            return {
                ...state,
                'requestInProgress': false,
                'error': null,
            };
        case ProfileActionType.CreateRequested:
            return profilesAdapter.addOne(action.profile, {
                ...state,
                'requestInProgress': true,
            });
        case ProfileActionType.UpdateRequested:
            return profilesAdapter.updateOne({ 'id': action.id, 'changes': action.changes }, {
                ...state,
                'requestInProgress': true,
            });
        case ProfileActionType.DeleteRequested:
            return profilesAdapter.removeOne(action.id, {
                ...state,
                'requestInProgress': true,
            });
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


