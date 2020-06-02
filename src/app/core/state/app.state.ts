import { AuthState } from './auth/auth.state';
import { ExercisesState } from './exercises/exercises.state';
import { WorkoutsState } from './workouts/workouts.state';
import { CustomRouterReducerState } from './router/router.state';
import { ProfilesState } from './profile/profile.state';
import { CheckInsState } from './check-ins/check-in.state';
import { FoodsState } from './food/food.state';
import { MealsState } from './meals/meals.state';


export interface AppState {
    'auth': AuthState;
    'check-ins': CheckInsState;
    'exercises': ExercisesState;
    'foods': FoodsState;
    'meals': MealsState;
    'profiles': ProfilesState;
    'router': CustomRouterReducerState;
    'workouts': WorkoutsState;
}
