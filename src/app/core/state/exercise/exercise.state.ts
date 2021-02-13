import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Exercise } from './exercise.model';

/**
 * Exercises are represented by an EntityState that
 * includes a dictionary of exercises and the
 * list of ids that corresponds to each exercise
 */
export interface ExercisesState extends EntityState < Exercise > {
    requestInProgress: boolean;
    error: any | null;
}

export const exerciseAdapter = createEntityAdapter < Exercise > ({
    'selectId': exercise => exercise.id,
    'sortComparer': sortByName,
});

export function sortByName(a: Exercise, b: Exercise): number {
    return a.name.localeCompare(b.name);
}

export const EXERCISES_INIT_STATE: ExercisesState = exerciseAdapter.getInitialState({
    'requestInProgress': false,
    'error': null,
});
