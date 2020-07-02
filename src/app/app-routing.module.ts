import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';
import { ProfileGuard } from './guards/profile/profile.guard';
import { NoProfileGuard } from './guards/no-profile/no-profile.guard';


const routes: Routes = [
    {
        'path': '',
        'redirectTo': 'exercises',
        'pathMatch': 'full'
    },
    {
        'path': 'exercises',
        'loadChildren': () => import('./exercise/exercise-list/exercise-list.module').then(m => m
            .ExerciseListPageModule)
    },
    {
        'path': 'login',
        'loadChildren': () => import('./account/login/login.module').then(m => m.LoginPageModule)
    },
    {
        'path': 'register',
        'loadChildren': () => import('./account/register/register.module').then(m => m.RegisterPageModule)
    },
    {
        'path': 'profile',
        'loadChildren': () => import('./profile/profile.module').then(m => m.ProfilePageModule),
        'canActivate': [AuthGuard, ProfileGuard],
    },
    {
        'path': 'profile/:id',
        'loadChildren': () => import('./profile/profile.module').then(m => m.ProfilePageModule),
        'canActivate': [AuthGuard],
    },
    {
        'path': 'create-profile',
        'loadChildren': () => import('./create-profile/create-profile.module').then(m => m.CreateProfilePageModule),
        'canActivate': [AuthGuard, NoProfileGuard],
    },
    {
        'path': 'check-in',
        'loadChildren': () => import('./check-in/check-in.module').then(m => m.CheckInPageModule)
    },
    {
        'path': 'create-food',
        'loadChildren': () => import('./food/create-food/create-food.module').then(m => m.CreateFoodPageModule),
        'canActivate': [AuthGuard],
    },
    {
        'path': 'create-meal',
        'loadChildren': () => import('./create-meal/create-meal.module').then(m => m.CreateMealPageModule),
        'canActivate': [AuthGuard],
    },
    {
        'path': 'meals',
        'loadChildren': () => import('./meals/meals.module').then(m => m.MealsPageModule)
    },
    {
        'path': 'meal',
        'loadChildren': () => import('./meals/meal/meal.module').then(m => m.MealPageModule)
    },
    {
        'path': 'foods',
        'loadChildren': () => import('./food/food-list/food-list.module').then(m => m.FoodsListPageModule)
    },
    {
        'path': 'edit-food',
        'loadChildren': () => import('./food/edit-food/edit-food.module').then(m => m.EditFoodPageModule)
    },
    {
        'path': 'create-workout',
        'loadChildren': () => import('./workout/create-workout/create-workout.module').then(m => m
            .CreateWorkoutPageModule)
    },
    {
        'path': 'edit-workout',
        'loadChildren': () => import('./workout/edit-workout/edit-workout.module').then(m => m
            .EditWorkoutPageModule)
    },
    {
        'path': 'workouts',
        'loadChildren': () => import('./workout/workout-list/workout-list.module').then(m => m
            .WorkoutListPageModule)
    },
    {
        'path': 'clients',
        'loadChildren': () => import('./client/client-list/client-list.module').then(m => m.ClientListPageModule)
    },

];

@NgModule({
    'imports': [
        RouterModule.forRoot(routes, {
            'preloadingStrategy': PreloadAllModules,
            'anchorScrolling': 'enabled',
        })
    ],
    'exports': [RouterModule]
})
export class AppRoutingModule {}
