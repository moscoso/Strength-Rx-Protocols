import { EntityState } from '@ngrx/entity';

/**
 * The main data model for an Exercise
 */
export interface Exercise {
    id: string;
    name: string;
    /**
     * The Youtube ID is an 11 character case-sensitive alphanumeric string
     * that corresponds to the youtube video that demonstrates this
     * exercise
     */
    youtubeID: string;
    instructions: string;
}

export const INIT_EXERCISE: Exercise = {
    'id': '',
    'name': '',
    'youtubeID': '',
    'instructions': '',
};

/**
 * Exercises are represented by an EntityState that
 * includes a dictionary of exercises and the
 * list of ids that corresponds to each exercise
 */
export interface ExercisesState extends EntityState < Exercise > {
    requestInProgress: boolean;
    error: any | null;
}
