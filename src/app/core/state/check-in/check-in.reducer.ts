import { checkInsAdapter, CheckInsState, CHECK_INS_INIT_STATE } from './check-in.state';
import { CheckInAction, CheckInActionType } from './check-in.actions';

export function checkInsReducer(state: CheckInsState = CHECK_INS_INIT_STATE, action: CheckInAction): CheckInsState {
    switch (action.type) {
        case CheckInActionType.AllRequested:
        case CheckInActionType.CreateRequested:
        case CheckInActionType.UpdateRequested:
        case CheckInActionType.DeleteRequested:
            return {
                ...state,
                'requestInProgress': true,
                'error': null,
            };
        case CheckInActionType.AllLoaded:
            return checkInsAdapter.setAll(action.checkIns, {
                ...state,
                'requestInProgress': false,
            });
        case CheckInActionType.Created:
            return checkInsAdapter.addOne(action.checkIn, {
                ...state,
                'requestInProgress': false,
            });
        case CheckInActionType.Updated:
            return checkInsAdapter.updateOne({ 'id': action.id, 'changes': action.changes }, {
                ...state,
                'requestInProgress': false,
            });
        case CheckInActionType.Deleted:
            return checkInsAdapter.removeOne(action.id, {
                ...state,
                'requestInProgress': false,
            });
        case CheckInActionType.RequestFailed:
            return {
                ...state,
                'error': action.error,
                'requestInProgress': false,
            };
        default:
            return state;
    }
}
