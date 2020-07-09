import { createEntityAdapter } from '@ngrx/entity';
import { ProgramAction, ProgramActionType } from './program.actions';
import { Program, ProgramsState } from './program.state';

export const programsAdapter = createEntityAdapter < Program > ({
    'selectId': program => program.id,
    'sortComparer': (programA, programB) => programA.name.localeCompare(programB.name)
});
const initialState: ProgramsState = programsAdapter.getInitialState({
    'requestInProgress': false,
    'error': null,
});
export function programsReducer(state: ProgramsState = initialState, action: ProgramAction): ProgramsState {
    switch (action.type) {
        case ProgramActionType.AllRequested:
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
        case ProgramActionType.CreateRequested:
        case ProgramActionType.UpdateRequested:
        case ProgramActionType.DeleteRequested:
            return {
                ...state,
                'requestInProgress': true,
                'error': null,
            };
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


