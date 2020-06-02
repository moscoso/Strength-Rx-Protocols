import { EntityState } from '@ngrx/entity';
import { Exercise } from '../exercises/exercises.state';

/**
 * The main data model for an Food
 */
export interface Food {
    id: string;
    name: string;
    calories: number;
    carbs: number;
    fats: number;
    protein: number;
    photoURL: string;
    dateCreated: Date;
}

export interface ExerciseRoutine {
    sets ?: number;
    reps ?: number;
    minutes ?: number;
    seconds ?: number;
}

export const INIT_FOOD: Food = {
    'id': '',
    'name': '',
    'calories': 0,
    'carbs': 0,
    'fats': 0,
    'protein': 0,
    'photoURL': '',
    'dateCreated': new Date(),
};

/**
 * Foods are represented by an EntityState that
 * includes a dictionary of exercises and the
 * list of ids that corresponds to each exercise
 */
export interface FoodsState extends EntityState < Food > {
    requestInProgress: boolean;
    error: any | null;
}
