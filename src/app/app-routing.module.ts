import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';
import { ProfileGuard } from './guards/profile/profile.guard';
import { NoProfileGuard } from './guards/no-profile/no-profile.guard';
import { NoAuthGuard } from './guards/no-auth/no-auth.guard';
import { ClientGuard } from './guards/client/client.guard';
import { TrainerGuard } from './guards/trainer/trainer.guard';

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
        'canActivate': [AuthGuard, ProfileGuard, TrainerGuard],
    },
    {
        'path': 'login',
        'loadChildren': () => import('./account/login/login.module').then(m => m.LoginPageModule),
        'canActivate': [NoAuthGuard]
    },
    {
        'path': 'signup',
        'loadChildren': () => import('./account/register/register.module').then(m => m.RegisterPageModule),
        'canActivate': [NoAuthGuard]
    },
    {
        'path': 'register',
        'redirectTo': 'join',
    },
    {
        'path': 'join',
        'loadChildren': () => import('./account/join/join.module').then(m => m.JoinPageModule),
        'canActivate': [NoAuthGuard]
    },
    {
        'path': 'profile',
        'loadChildren': () => import('./profile/view-profile/view-profile.module').then(m => m
            .ViewProfilePageModule),
        'canActivate': [AuthGuard, ProfileGuard],
    },
    {
        'path': 'profile/program',
        'loadChildren': () => import('./program/program-detail/program-detail.module').then(m => m.ProgramDetailPageModule),
        'canActivate': [AuthGuard, ProfileGuard],
    },
    {
        'path': 'profile/program/:phase/:day',
        'loadChildren': () => import('./workout/workout-detail/workout-detail.module').then(m => m
            .WorkoutDetailPageModule),
        'canActivate': [AuthGuard, ProfileGuard],
    },
    {
        'path': 'profile/program/:programID/:phase/:day',
        'loadChildren': () => import('./workout/workout-detail/workout-detail.module').then(m => m
            .WorkoutDetailPageModule),
        'canActivate': [AuthGuard, ProfileGuard],
    },

    {
        'path': 'profile/:profileID/program/:phase/:day',
        'loadChildren': () => import('./workout/workout-detail/workout-detail.module').then(m => m
            .WorkoutDetailPageModule),
        'canActivate': [AuthGuard, ProfileGuard],
    },
    {
        'path': 'programs/:programID/:phase/:day',
        'loadChildren': () => import('./workout/workout-detail/workout-detail.module').then(m => m
            .WorkoutDetailPageModule),
        'canActivate': [AuthGuard, ProfileGuard],
    },
    {
        'path': 'profile/:id',
        'loadChildren': () => import('./profile/view-profile/view-profile.module').then(m => m
            .ViewProfilePageModule),
        'canActivate': [AuthGuard],
    },
    {
        'path': 'profile/:id/program',
        'loadChildren': () => import('./program/program-detail/program-detail.module').then(m => m.ProgramDetailPageModule),
        'canActivate': [AuthGuard, ProfileGuard],
    },
    {
        'path': 'create-profile',
        'redirectTo': 'join'
    },
    {
        'path': 'edit-profile',
        'loadChildren': () => import('./profile/edit-profile/edit-profile.module').then(m => m
            .EditProfilePageModule),
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
        'canActivate': [AuthGuard, ProfileGuard, TrainerGuard],
    },
    {
        'path': 'clients',
        'loadChildren': () => import('./client/client-list/client-list.module').then(m => m.ClientListPageModule),
        'canActivate': [AuthGuard, ProfileGuard, TrainerGuard],
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
        'canActivate': [AuthGuard, ProfileGuard, TrainerGuard],
    }, {
        'path': 'start-membership',
        'loadChildren': () => import('./client/choose-membership/choose-membership.module').then(m => m
            .ChooseMembershipPageModule),
        'canActivate': [AuthGuard, ProfileGuard],
    }, {
        'path': 'choose-membership',
        'loadChildren': () => import('./client/choose-membership/choose-membership.module').then(m => m
            .ChooseMembershipPageModule),
        'canActivate': [AuthGuard, ProfileGuard],
    },
    {
        'path': 'chat/:id',
        'loadChildren': () => import('./chat/conversation/conversation.module').then(m => m.ConversationPageModule),
        'canActivate': [AuthGuard, ProfileGuard],
    },
    {
        'path': 'billing',
        'loadChildren': () => import('./stripe/billing/billing.module').then(m => m.BillingPageModule),
        'canActivate': [AuthGuard, ProfileGuard, ClientGuard],
    },
    {
        'path': 'thank-you',
        'loadChildren': () => import('./stripe/thank-you/thank-you.module').then(m => m.ThankYouPageModule)
    },
    {
        'path': 'progress-pics',
        'loadChildren': () => import('./client/progress-pics/progress-pics.module').then(m => m.ProgressPicsPageModule)
    },
    {
        'path': 'progress-pics/:id',
        'loadChildren': () => import('./client/progress-pics/progress-pics.module').then(m => m.ProgressPicsPageModule)
    },
    {
        'path': 'clients/:id/progress-pics',
        'loadChildren': () => import('./client/progress-pics/progress-pics.module').then(m => m.ProgressPicsPageModule)
    },
    {
        'path': 'check-in',
        'loadChildren': () => import('./check-in/check-in.module').then(m => m.CheckInPageModule),
        'canActivate': [AuthGuard, ProfileGuard],
    },
    {
        'path': 'check-in/:id',
        'loadChildren': () => import('./check-in/check-in.module').then(m => m.CheckInPageModule),
        'canActivate': [AuthGuard, ProfileGuard],
    },
    {
        'path': 'clients/:id/check-in',
        'loadChildren': () => import('./check-in/view-check-ins/view-check-ins.module').then(m => m.ViewCheckInsPageModule)
    },
    {
        'path': 'clients/:id/check-ins',
        'loadChildren': () => import('./check-in/view-check-ins/view-check-ins.module').then(m => m.ViewCheckInsPageModule)
    },
    {
        'path': 'reviews',
        'loadChildren': () => import('./client/reviews/reviews.module').then(m => m.ReviewsPageModule),
        'canActivate': [AuthGuard, ProfileGuard],
    },
    {
        'path': 'reviews/:id',
        'loadChildren': () => import('./client/reviews/reviews.module').then(m => m.ReviewsPageModule),
        'canActivate': [AuthGuard, ProfileGuard],
    },
    {
        'path': 'clients/:id/reviews',
        'loadChildren': () => import('./client/reviews/reviews.module').then(m => m.ReviewsPageModule),
        'canActivate': [AuthGuard, ProfileGuard],
    },
    {
        'path': 'terms',
        'loadChildren': () => import('./home/terms-of-service/terms-of-service.module').then(m => m.TermsOfServicePageModule)
    },
    {
        'path': 'terms-of-service',
        'loadChildren': () => import('./home/terms-of-service/terms-of-service.module').then(m => m.TermsOfServicePageModule)
    },
    {
        'path': 'privacy',
        'loadChildren': () => import('./home/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyPageModule)
    },
    {
        'path': 'privacy-policy',
        'loadChildren': () => import('./home/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyPageModule)
    },
    {
        'path': 'calendar',
        'loadChildren': () => import('./client/calendar/calendar.module').then(m => m.CalendarPageModule)
    },
    {
        'path': 'interval-timer',
        'loadChildren': () => import('./interval-timer/interval-timer-page/interval-timer.module').then(m => m.IntervalTimerPageModule)
    },
    {
        'path': 'interval-timer/:id',
        'loadChildren': () => import('./interval-timer/interval-timer-page/interval-timer.module').then(m => m.IntervalTimerPageModule)
    },
    {
        'path': '**',
        'redirectTo': ''
    },
    

];

@NgModule({
    'imports': [
        RouterModule.forRoot(routes, {
            'preloadingStrategy': PreloadAllModules,
            'anchorScrolling': 'enabled',
            'relativeLinkResolution': 'legacy'
        })
    ],
    'exports': [RouterModule]
})
export class AppRoutingModule {}
