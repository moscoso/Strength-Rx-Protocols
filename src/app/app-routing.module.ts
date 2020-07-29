import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';
import { ProfileGuard } from './guards/profile/profile.guard';
import { NoProfileGuard } from './guards/no-profile/no-profile.guard';
import { NoAuthGuard } from './guards/no-auth/no-auth.guard';

const routes: Routes = [
{
    'path': '',
    'loadChildren': () => import('./home/landing/landing.module').then(m => m.LandingPageModule),
    'pathMatch': 'full'
},
{
    'path': 'dashboard',
    'redirectTo': 'profile',
    'pathMatch': 'full'
},
{
    'path': 'exercises',
    'loadChildren': () => import('./exercise/exercise-list/exercise-list.module').then(m => m
        .ExerciseListPageModule),
    'canActivate': [AuthGuard, ProfileGuard],
},
{
    'path': 'login',
    'loadChildren': () => import('./account/login/login.module').then(m => m.LoginPageModule),
    'canActivate': [NoAuthGuard]
},
{
    'path': 'register',
    'loadChildren': () => import('./account/register/register.module').then(m => m.RegisterPageModule),
    'canActivate': [NoAuthGuard]
},
{
    'path': 'profile',
    'loadChildren': () => import('./profile/view-profile/view-profile.module').then(m => m
        .ViewProfilePageModule),
    'canActivate': [AuthGuard, ProfileGuard],
},
{
    'path': 'profile/:id',
    'loadChildren': () => import('./profile/view-profile/view-profile.module').then(m => m
        .ViewProfilePageModule),
    'canActivate': [AuthGuard],
},
{
    'path': 'create-profile',
    'loadChildren': () => import('./profile/create-profile/create-profile.module').then(m => m
        .CreateProfilePageModule),
    'canActivate': [AuthGuard, NoProfileGuard],
},
{
    'path': 'edit-profile',
    'loadChildren': () => import('./profile/edit-profile/edit-profile.module').then(m => m
        .EditProfilePageModule),
    'canActivate': [AuthGuard, ProfileGuard],
},
{
    'path': 'check-in',
    'loadChildren': () => import('./check-in/check-in.module').then(m => m.CheckInPageModule),
    'canActivate': [AuthGuard, ProfileGuard],
},
{
    'path': 'create-food',
    'loadChildren': () => import('./food/create-food/create-food.module').then(m => m.CreateFoodPageModule),
    'canActivate': [AuthGuard, ProfileGuard],
},
{
    'path': 'create-meal',
    'loadChildren': () => import('./create-meal/create-meal.module').then(m => m.CreateMealPageModule),
    'canActivate': [AuthGuard, ProfileGuard],
},
{
    'path': 'meals',
    'loadChildren': () => import('./meals/meals.module').then(m => m.MealsPageModule),
    'canActivate': [AuthGuard, ProfileGuard],
},
{
    'path': 'meal',
    'loadChildren': () => import('./meals/meal/meal.module').then(m => m.MealPageModule),
    'canActivate': [AuthGuard, ProfileGuard],
},
{
    'path': 'foods',
    'loadChildren': () => import('./food/food-list/food-list.module').then(m => m.FoodsListPageModule),
    'canActivate': [AuthGuard, ProfileGuard],
},
{
    'path': 'edit-food',
    'loadChildren': () => import('./food/edit-food/edit-food.module').then(m => m.EditFoodPageModule),
    'canActivate': [AuthGuard, ProfileGuard],
},
{
    'path': 'create-workout',
    'loadChildren': () => import('./workout/create-workout/create-workout.module').then(m => m
        .CreateWorkoutPageModule),
    'canActivate': [AuthGuard, ProfileGuard],
},
{
    'path': 'edit-workout',
    'loadChildren': () => import('./workout/edit-workout/edit-workout.module').then(m => m
        .EditWorkoutPageModule),
    'canActivate': [AuthGuard, ProfileGuard],
},
{
    'path': 'workouts',
    'loadChildren': () => import('./workout/workout-list/workout-list.module').then(m => m
        .WorkoutListPageModule),
    'canActivate': [AuthGuard, ProfileGuard],
},
{
    'path': 'clients',
    'loadChildren': () => import('./client/client-list/client-list.module').then(m => m.ClientListPageModule),
    'canActivate': [AuthGuard, ProfileGuard],
},
{
    'path': 'create-program',
    'loadChildren': () => import('./program/create-program/create-program.module').then(m => m
        .CreateProgramPageModule),
    'canActivate': [AuthGuard, ProfileGuard],
},
{
    'path': 'edit-program',
    'loadChildren': () => import('./program/edit-program/edit-program.module').then(m => m
        .EditProgramPageModule),
    'canActivate': [AuthGuard, ProfileGuard],
},
{
    'path': 'programs',
    'loadChildren': () => import('./program/program-list/program-list.module').then(m => m
        .ProgramListPageModule),
    'canActivate': [AuthGuard, ProfileGuard],
}, {
    'path': 'start-membership',
    'loadChildren': () => import('./account/start-membership/start-membership.module').then(m => m
        .StartMembershipPageModule),
    'canActivate': [AuthGuard, ProfileGuard],
}, {
    'path': 'choose-membership',
    'loadChildren': () => import('./client/choose-membership/choose-membership.module').then(m => m
        .ChooseMembershipPageModule)
}, ];

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
