import { Routes } from "@angular/router";
import { AdminLayoutComponent } from "../../shared/layouts/admin-layout/admin-layout.component";
import { authGuard } from "../../core/guards/auth.guard";

export const AdminRoutes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        title: 'Newsly: Admin Panel Ana Sayfa',
        canActivate: [authGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            {
                path: 'news',
                title: 'Newsly: Admin Panel Haberler',
                children : [
                    {
                        path: '',
                        loadComponent: () => import('./news/news-list/news-list.component').then(m => m.NewsListComponent)
                    },
                    {
                        path: 'create',
                        loadComponent: () => import('./news/news-create/news-create.component').then(m => m.NewsCreateComponent),
                        title: 'Newsly: Admin Panel Haber Ekle'
                    },
                    {
                        path: 'edit/:id',
                        loadComponent: () => import('./news/news-update/news-update.component').then(m => m.NewsUpdateComponent),
                        title: 'Newsly: Admin Panel Haber Ayarları'
                    },
                ]
            },
            ...Array(5).fill(null).map((_, i) => ({
                path: ['popular-news', 'data-analysis', 'news-comments', 'features', 'settings'][i],
                loadComponent: () => import('./test/test.component').then(m => m.TestComponent),
                title: 'Çok Yakında'
            })),
        ]
    },
]