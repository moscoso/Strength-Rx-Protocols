import { createEntityAdapter } from '@ngrx/entity';
import { MealAction, MealActionType } from './meals.actions';
import { Meal, MealsState } from './meals.state';

export const mealsAdapter = createEntityAdapter < Meal > ({
    'selectId': meal => meal.id,
    'sortComparer': (mealA, mealB) => mealA.name.localeCompare(mealB.name)
});
const initialState: MealsState = mealsAdapter.getInitialState({
    'requestInProgress': false,
    'error': null,
});
export function mealsReducer(state: MealsState = initialState, action: MealAction): MealsState {
    switch (action.type) {
        case MealActionType.AllRequested:
            return {
                ...state,
                'requestInProgress': true,
                'error': null,
            };
        case MealActionType.AllLoaded:
            return mealsAdapter.setAll(action.meals, {
                ...state,
                'requestInProgress': false,
            });
        case MealActionType.Created:
        case MealActionType.Updated:
        case MealActionType.Deleted:
            return {
                ...state,
                'requestInProgress': false,
                'error': null,
            };
        case MealActionType.CreateRequested:
            return mealsAdapter.addOne(action.meal, {
                ...state,
                'requestInProgress': true,
            });
        case MealActionType.UpdateRequested:
            return mealsAdapter.updateOne({ 'id': action.id, 'changes': action.changes }, {
                ...state,
                'requestInProgress': true,
            });
        case MealActionType.DeleteRequested:
            return mealsAdapter.removeOne(action.id, {
                ...state,
                'requestInProgress': true,
            });
        case MealActionType.RequestFailed:
            return {
                ...state,
                'error': action.error,
                'requestInProgress': false,
            };
        default:
            return state;
    }
}


