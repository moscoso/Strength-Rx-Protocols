import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Program } from './program.model';

/**
 * Programs are represented by an EntityState that
 * includes a dictionary of exercises and the
 * list of ids that corresponds to each exercise
 */
export interface ProgramsState extends EntityState < Program > {
    requestInProgress: boolean;
    error: any | null;
}

export const programsAdapter = createEntityAdapter < Program > ({
    'selectId': program => program.id,
    'sortComparer': (programA, programB) => programA.name.localeCompare(programB.name)
});
export const PROGRAMS_INIT_STATE: ProgramsState = programsAdapter.getInitialState({
    'requestInProgress': false,
    'error': null,
});
