import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth/auth.guard';
import { ProfileGuard } from '../guards/profile/profile.guard';

export const CHECK_IN_ROUTES: Routes = [
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
    'loadChildren': () => import('./view-check-ins/view-check-ins.module').then(m => m.ViewCheckInsPageModule)
},
{
    'path': 'clients/:id/check-ins',
    'loadChildren': () => import('./view-check-ins/view-check-ins.module').then(m => m.ViewCheckInsPageModule)
},
{
    'path': 'clients/:id/check-ins',
    'loadChildren': () => import('./view-check-ins/view-check-ins.module').then(m => m.ViewCheckInsPageModule)
},
{
    'path': 'check-ins',
    'loadChildren': () => import('./view-check-ins/view-check-ins.module').then(m => m.ViewCheckInsPageModule)
}



];
