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
        case FoodActionType.Created:
        case FoodActionType.Updated:
        case FoodActionType.Deleted:
            return {
                ...state,
                'requestInProgress': false,
                'error': null,
            };
        case FoodActionType.CreateRequested:
            return foodsAdapter.addOne(action.food, {
                ...state,
                'requestInProgress': true,
            });
        case FoodActionType.UpdateRequested:
            return foodsAdapter.updateOne({ 'id': action.id, 'changes': action.changes }, {
                ...state,
                'requestInProgress': true,
            });
        case FoodActionType.DeleteRequested:
            return foodsAdapter.removeOne(action.id, {
                ...state,
                'requestInProgress': true,
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


