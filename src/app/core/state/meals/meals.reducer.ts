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
        case MealActionType.CreateRequested:
        case MealActionType.UpdateRequested:
        case MealActionType.DeleteRequested:
            return {
                ...state,
                'requestInProgress': true,
                'error': null,
            };
        case MealActionType.Created:
            return mealsAdapter.addOne(action.meal, {
                ...state,
                'requestInProgress': false,
            });
        case MealActionType.Updated:
            return mealsAdapter.updateOne({ 'id': action.id, 'changes': action.changes }, {
                ...state,
                'requestInProgress': false,
            });
        case MealActionType.Deleted:
            return mealsAdapter.removeOne(action.id, {
                ...state,
                'requestInProgress': false,
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


