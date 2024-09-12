import { Routes } from '@angular/router';
import { NewsCreateComponent } from './features/news/components/news-create/news-create.component';
import { NewsListComponent } from './features/news/components/news-list/news-list.component';
import { LocationComponent } from './shared/components/location/location.component';

export const routes: Routes = [
    { path: 'create', component: NewsCreateComponent },
    { path: 'news-list', component:NewsListComponent},
    { path: 'location', component: LocationComponent}
];
