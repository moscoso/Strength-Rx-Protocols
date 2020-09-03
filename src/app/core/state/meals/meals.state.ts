import { EntityState } from '@ngrx/entity';
import { Food } from '../food/food.state';

/**
 * The main data model for an Meal
 */
export interface Meal {
    id: string;
    name: string;
    description: string;
    foods: Food[];
    photoURL: string;
    dateCreated: Date;
}

export const INIT_MEAL: Meal = {
    'id': '',
    'name': '',
    'description': '',
    'foods': [],
    'photoURL': '',
    'dateCreated': new Date(),
};

/**
 * Meals are represented by an EntityState that
 * includes a dictionary of exercises and the
 * list of ids that corresponds to each exercise
 */
export interface MealsState extends EntityState < Meal > {
    requestInProgress: boolean;
    error: any | null;
}
