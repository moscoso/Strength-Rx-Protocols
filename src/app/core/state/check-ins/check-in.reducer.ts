import { createEntityAdapter } from '@ngrx/entity';
import { CheckIn, CheckInsState } from './check-in.state';
import { CheckInAction, CheckInActionType } from './check-in.actions';


export const checkInsAdapter = createEntityAdapter < CheckIn > ({
    'selectId': checkIn => checkIn.id,
    'sortComparer': sortByTimestamp,
});

export function sortByTimestamp(a: CheckIn, b: CheckIn): number {
    const aTimestamp =  a.timestamp.toISOString();
    const bTimestamp =  b.timestamp.toISOString();
    return aTimestamp.localeCompare(bTimestamp);
}



const initialState: CheckInsState = checkInsAdapter.getInitialState({
    'requestInProgress': false,
    'error': null,
});
export function checkInsReducer(state: CheckInsState = initialState, action: CheckInAction): CheckInsState {
    switch (action.type) {
        case CheckInActionType.AllRequested:
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
        case CheckInActionType.Updated:
        case CheckInActionType.Deleted:
            return {
                ...state,
                'requestInProgress': false,
                'error': null,
            };
        case CheckInActionType.CreateRequested:
            return checkInsAdapter.addOne(action.checkIn, {
                ...state,
                'requestInProgress': true,
            });
        case CheckInActionType.UpdateRequested:
            return checkInsAdapter.updateOne({ 'id': action.id, 'changes': action.changes }, {
                ...state,
                'requestInProgress': true,
            });
        case CheckInActionType.DeleteRequested:
            return checkInsAdapter.removeOne(action.id, {
                ...state,
                'requestInProgress': true,
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
