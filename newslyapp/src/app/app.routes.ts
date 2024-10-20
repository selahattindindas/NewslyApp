import { Routes } from '@angular/router';
import { loginGuard } from './core/guards/login.guard';


export const routes: Routes = [
    { 
        path: 'not-found', 
        loadComponent: () => import('./shared/components/not-found/not-found.component').then(m => m.NotFoundComponent),
        title: "Sayfa Bulunamadı!"
    },

    {
        path: 'admin/login',
        loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent),
        title: 'Newsly Admin Panel Giriş Sayfası',
        canActivate: [loginGuard],
    },

    { 
        path: 'admin', 
        loadChildren: () => import('./features/admin/admin.routes').then(m => m.AdminRoutes)
    },
    
    { 
        path: '', 
        loadChildren: () => import('./features/users/user.routes').then(m => m.UserRoutes)
    }, 

    { 
        path: '**', 
        loadComponent: () => import('./shared/components/not-found/not-found.component').then(m => m.NotFoundComponent),
        title: "Sayfa Bulunamadı!" 
    },
];