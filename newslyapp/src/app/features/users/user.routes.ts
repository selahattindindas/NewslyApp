import { Routes } from '@angular/router';
import { UserLayoutComponent } from '../../shared/layouts/user-layout/user-layout.component';

export const UserRoutes: Routes = [
    {
        path: '',
        component: UserLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'gundem',
                pathMatch: 'full'
            },
            {
                path: 'search',
                loadComponent: () => import('./news/filter-news/filter-news.component').then(m => m.FilterNewsComponent),
                title: 'Newsly: Dünyadan Geri Kalma',
            },
            {
                path: ':nameSlug',
                loadComponent: () => import('./news/news-category/news-category.component').then(m => m.NewsCategoryComponent),
                children: [
                    {
                        path: '',
                        loadComponent: () => import('./news/news-list/news-list.component').then(m => m.NewsListComponent),
                    },
                    {
                        path: ':titleSlugAndId',
                        loadComponent: () => import('./news/news-detail/news-detail.component').then(m => m.NewsDetailComponent),
                    }
                ]
            },
        ]
    },
];
