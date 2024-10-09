import { Routes } from '@angular/router';
import { NewsCreateComponent } from './features/admin/news/news-create/news-create.component';
import { NewsListComponent } from './features/users/news/news-list/news-list.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { NewsDetailComponent } from './features/users/news/news-detail/news-detail.component';
import { NewsCategoryComponent } from './features/users/news/news-category/news-category.component';
import { FilterNewsComponent } from './features/users/news/filter-news/filter-news.component';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';

export const routes: Routes = [
    { path: 'not-found', component: NotFoundComponent, title: "Sayfa Bulunamadı!"},
    { path: 'admin/login', component: LoginComponent, title: "Newsly Admin Panel Giriş Sayfası"},
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'admin',
                component: DashboardComponent,
            },
            {
                path: '',
                redirectTo: 'gundem',
                pathMatch: 'full'
            },
            {
                path:'search',
                component:FilterNewsComponent,
                title: 'Newsly: Dünyadan Geri Kalma',
            },
            {
                path: ':nameSlug', 
                component: NewsCategoryComponent,
                children: [
                    {
                        path: '', 
                        component: NewsListComponent
                    },
                    {
                        path: ':titleSlugAndId', 
                        component: NewsDetailComponent,
                    }
                ]
            },
        ]
    },
    
    { path: '**', component: NotFoundComponent, title: "Sayfa Bulunamadı!" },
   
];
