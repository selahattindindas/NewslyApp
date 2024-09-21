import { Routes } from '@angular/router';
import { NewsCreateComponent } from './features/news/components/news-create/news-create.component';
import { NewsListComponent } from './features/news/components/news-list/news-list.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
    { path: 'create', component: NewsCreateComponent },
    { path: 'news-list', component:NewsListComponent},
    { path: '', component: LayoutComponent, 
        children:[
            {path: '', component:HomeComponent}
    ]}
];
