import { Routes } from '@angular/router';

import { AuthComponent } from '@components-auth/auth/auth.component';
import { HomeComponent } from './components/home/home/home.component';

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthComponent,
        loadChildren: () => import('@components-auth/auth.routes').then((r) => r.routes)
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
