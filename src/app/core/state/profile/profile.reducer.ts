import { profilesAdapter, ProfilesState, PROFILES_INIT_STATE } from './profile.state';
import { ProfileAction, ProfileActionType } from './profile.actions';

export function profilesReducer(state: ProfilesState = PROFILES_INIT_STATE, action: ProfileAction): ProfilesState {
    switch (action.type) {
        case ProfileActionType.AllRequested:
        case ProfileActionType.CreateRequested:
        case ProfileActionType.UpdateRequested:
        case ProfileActionType.DeleteRequested:
        case ProfileActionType.RefreshAllRequested:
        case ProfileActionType.RefreshOneRequested:
            return {
                ...state,
                'requestInProgress': true,
                'error': null,
            };
        case ProfileActionType.AllLoaded:
            return profilesAdapter.setAll(action.profiles, {
                ...state,
                'requestInProgress': false,
                'initialized': action.profiles.length > 0,
            });
        case ProfileActionType.OneLoaded:
            return profilesAdapter.setOne(action.profile, {
                ...state,
                'requestInProgress': false,
            });
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
