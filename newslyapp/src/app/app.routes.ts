import { Routes } from '@angular/router';
import { NewsCreateComponent } from './features/news/components/news-create/news-create.component';
import { NewsListComponent } from './features/news/components/news-list/news-list.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { NewsDetailComponent } from './features/news/components/news-detail/news-detail.component';
import { NewsCategoryComponent } from './features/news/components/news-category/news-category.component';
import { FilterNewsComponent } from './features/news/components/filter-news/filter-news.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        title: 'NewslyApp',
        children: [
            {
                path: '',
                redirectTo: 'gundem',
                pathMatch: 'full'
            },
            {
                path:'search',
                component:FilterNewsComponent
            },
            {
                path: ':categoryName',
                component: NewsCategoryComponent,
                title: 'NewslyApp',
            },
            {
                path: ':categoryName/:id/:title',
                component: NewsDetailComponent,
            }
        ]
    },
    { path: 'create', component: NewsCreateComponent },
    { path: 'news-list', component: NewsListComponent },
    { path: '**', component: NotFoundComponent },
    { path: 'not-found', component: NotFoundComponent}
];
