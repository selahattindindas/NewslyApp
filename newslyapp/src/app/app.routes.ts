import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';


export const routes: Routes = [
    { path: 'not-found', component: NotFoundComponent, title: "Sayfa Bulunamadı!"},

    {
        path: 'admin/login',
        loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent),
        title: 'Newsly Admin Panel Giriş Sayfası'
    },

    { path: 'admin', loadChildren: () => import('./features/admin/admin.routes').then(m => m.AdminRoutes)},
    
    { path: '', loadChildren: () => import('./features/users/user.routes').then(m => m.UserRoutes)}, 

    { path: '**', component: NotFoundComponent, title: "Sayfa Bulunamadı!" },
];