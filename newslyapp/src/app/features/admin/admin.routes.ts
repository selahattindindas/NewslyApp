import { Routes } from "@angular/router";
import { AdminLayoutComponent } from "../../shared/layouts/admin-layout/admin-layout.component";

export const AdminRoutes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        title: 'Newsly: Admin Panel Ana Sayfa',
        children: [

            {
                path: 'news-create',
                loadComponent: () => import('./news/news-create/news-create.component').then(m => m.NewsCreateComponent)
            },
            {
                path: 'news-update',
                loadComponent: () => import('./news/news-update/news-update.component').then(m => m.NewsUpdateComponent)
            },
        ]
    },
    
]