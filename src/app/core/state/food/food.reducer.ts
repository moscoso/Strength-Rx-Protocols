import { createEntityAdapter } from '@ngrx/entity';
import { FoodAction, FoodActionType } from './food.actions';
import { Food, FoodsState } from './food.state';

export const foodsAdapter = createEntityAdapter < Food > ({
    'selectId': food => food.id,
    'sortComparer': (foodA, foodB) => foodA.name.localeCompare(foodB.name)
});
const initialState: FoodsState = foodsAdapter.getInitialState({
    'requestInProgress': false,
    'error': null,
});
export function foodsReducer(state: FoodsState = initialState, action: FoodAction): FoodsState {
    switch (action.type) {
        case FoodActionType.AllRequested:
            return {
                ...state,
                'requestInProgress': true,
                'error': null,
            };
        case FoodActionType.AllLoaded:
            return foodsAdapter.setAll(action.foods, {
                ...state,
                'requestInProgress': false,
            });
        case FoodActionType.CreateRequested:
        case FoodActionType.UpdateRequested:
        case FoodActionType.DeleteRequested:
            return {
                ...state,
                'requestInProgress': true,
                'error': null,
            };
        case FoodActionType.Created:
            return foodsAdapter.setOne(action.food, {
                ...state,
                'requestInProgress': false,
            });
        case FoodActionType.Updated:
            return foodsAdapter.updateOne({ 'id': action.id, 'changes': action.changes }, {
                ...state,
                'requestInProgress': false,
            });
        case FoodActionType.Deleted:
            return foodsAdapter.removeOne(action.id, {
                ...state,
                'requestInProgress': false,
            });
        case FoodActionType.RequestFailed:
            return {
                ...state,
                'error': action.error,
                'requestInProgress': false,
            };
        default:
            return state;
    }
}


