import { Routes } from '@angular/router';
import { NewsCreateComponent } from './features/news/components/news-create/news-create.component';
import { NewsListComponent } from './features/news/components/news-list/news-list.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { NewsDetailComponent } from './features/news/components/news-detail/news-detail.component';
import { NewsCategoryComponent } from './features/news/components/news-category/news-category.component';
import { FilterNewsComponent } from './features/news/components/filter-news/filter-news.component';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';

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
                canActivate: [authGuard],
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
