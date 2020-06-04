import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { ProfileGuard } from './core/guards/profile/profile.guard';
import { NoProfileGuard } from './core/guards/no-profile/no-profile.guard';

const routes: Routes = [
    {
        'path': '',
        'redirectTo': 'exercises',
        'pathMatch': 'full'
    },
    {
        'path': 'exercises',
        'loadChildren': () => import('./exercises/exercises.module').then(m => m.ExercisesPageModule)
    },
    {
        'path': 'exercise',
        'loadChildren': () => import('./exercises/exercises.module').then(m => m.ExercisesPageModule)
    },
    {
        'path': 'create-exercise',
        'loadChildren': () => import('./create-exercise/create-exercise.module').then(m => m
            .CreateExercisePageModule)
    },
    {
        'path': 'login',
        'loadChildren': () => import('./login/login.module').then(m => m.LoginPageModule)
    },
    {
        'path': 'register',
        'loadChildren': () => import('./register/register.module').then(m => m.RegisterPageModule)
    },
    {
        'path': 'workouts',
        'loadChildren': () => import('./workouts/workouts.module').then(m => m.WorkoutsPageModule)
    },
    {
        'path': 'create-workout',
        'loadChildren': () => import('./create-workout/create-workout.module').then(m => m.CreateWorkoutPageModule)
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
        'path': 'clients',
        'loadChildren': () => import('./clients/clients.module').then(m => m.ClientsPageModule),
        'canActivate': [AuthGuard],
    },
    {
        'path': 'create-food',
        'loadChildren': () => import('./create-food/create-food.module').then(m => m.CreateFoodPageModule),
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
        'loadChildren': () => import('./foods/foods.module').then(m => m.FoodsPageModule)
    },
    {
        'path': 'foods/:id',
        'loadChildren': () => import('./foods/food/food.module').then(m => m.FoodPageModule)
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
