import { EntityState } from '@ngrx/entity';

/**
 * The main data model for an Exercise
 */
export interface Exercise {
    id: string;
    name: string;
    videoURL: string;
    instructions: string;
}

/**
 * Exercises are represented by an EntityState that
 * includes a dictionary of exercises and the
 * list of ids that corresponds to each exercise
 */
export interface ExercisesState extends EntityState < Exercise > {
    requestInProgress: boolean;
    error: any | null;
}
