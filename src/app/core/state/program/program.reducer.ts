import { ProgramAction, ProgramActionType } from './program.actions';
import { programsAdapter, ProgramsState, PROGRAMS_INIT_STATE } from './program.state';


export function programsReducer(state: ProgramsState = PROGRAMS_INIT_STATE, action: ProgramAction): ProgramsState {
    switch (action.type) {
        case ProgramActionType.AllRequested:
        case ProgramActionType.CreateRequested:
        case ProgramActionType.UpdateRequested:
        case ProgramActionType.DeleteRequested:
            return {
                ...state,
                'requestInProgress': true,
                'error': null,
            };
        case ProgramActionType.AllLoaded:
            return programsAdapter.setAll(action.programs, {
                ...state,
                'requestInProgress': false,
            });
        case ProgramActionType.Created:
            return programsAdapter.addOne(action.program, {
                ...state,
                'requestInProgress': false,
            });
        case ProgramActionType.Updated:
            return programsAdapter.updateOne({ 'id': action.id, 'changes': action.changes }, {
                ...state,
                'requestInProgress': false,
            });
        case ProgramActionType.Deleted:
            return programsAdapter.removeOne(action.id, {
                ...state,
                'requestInProgress': false,
            });
        case ProgramActionType.RequestFailed:
            return {
                ...state,
                'error': action.error,
                    'requestInProgress': false,
            };
        default:
            return state;
    }
}
