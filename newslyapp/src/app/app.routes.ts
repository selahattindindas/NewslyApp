import { Routes } from '@angular/router';
import { NewsCreateComponent } from './features/news/components/news-create/news-create.component';
import { NewsListComponent } from './features/news/components/news-list/news-list.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { HomeComponent } from './features/home/home.component';
import { CategoryResolver } from './shared/services/category.resolver';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [
    { path: 'create', component: NewsCreateComponent },
    { path: 'news-list', component: NewsListComponent },
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: ':categoryName', component: HomeComponent, resolve: { categoryId: CategoryResolver } }
        ]
    },
    { path: '**', component: NotFoundComponent } 
];

