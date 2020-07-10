import { createEntityAdapter } from '@ngrx/entity';
import { Client, ClientsState } from './client.state';
import { ClientAction, ClientActionType } from './client.actions';


export const clientsAdapter = createEntityAdapter < Client > ({
    'selectId': client => client.id,
    'sortComparer': (clientA, clientB) => clientA.lastName.localeCompare(clientB.lastName)
});
const initialState: ClientsState = clientsAdapter.getInitialState({
    'requestInProgress': false,
    'error': null,
    'initialized': false,
});
export function clientsReducer(state: ClientsState = initialState, action: ClientAction): ClientsState {
    switch (action.type) {
        case ClientActionType.AllRequested:
            return {
                ...state,
                'requestInProgress': true,
                'error': null,
            };
        case ClientActionType.AllLoaded:
            return clientsAdapter.setAll(action.clients, {
                ...state,
                'requestInProgress': false,
                'initialized': true,
            });
        case ClientActionType.AssignProgramRequested:
        case ClientActionType.AssignTrainerRequested:
            return {
                ...state,
                'requestInProgress': true,
                'error': null,
            };
        case ClientActionType.ProgramAssigned:
            const changes1: Partial < Client > = {'assignedProgram': action.program};
            return clientsAdapter.updateOne({ 'id': action.id, 'changes': changes1 }, {
                ...state,
                'requestInProgress': false,
            });
        case ClientActionType.TrainerAssigned:
            const changes2: Partial < Client > = {'assignedTrainer': action.trainer};
            return clientsAdapter.updateOne({ 'id': action.id, 'changes': changes2 }, {
                ...state,
                'requestInProgress': false,
            });
        case ClientActionType.RequestFailed:
            return {
                ...state,
                'error': action.error,
                    'requestInProgress': false,
            };
        default:
            return state;
    }
}
