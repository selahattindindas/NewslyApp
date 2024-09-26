import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Category, News, NewsList } from './components/news-create/news-create.component';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  url = environment.baseUrl;

  constructor(private http: HttpClient) { }

  addNews(newsItem: News): Observable<News> {
    return this.http.post<News>(`${this.url}/news`, newsItem).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  getNews(): Observable<NewsList[]> {
    return this.http.get<NewsList[]>(`${this.url}/news`);
  }

  getNewsById(id: number): Observable<NewsList> {
    return this.http.get<NewsList>(`${this.url}/news/${id}`).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}/categories`)
  }

  getNewsByCategoryName(categoryName: string): Observable<NewsList[]> {
    const encodedCategoryName = encodeURIComponent(categoryName);
    return this.http.get<NewsList[]>(`${this.url}/news?categoryName=${encodedCategoryName}`);
  }
}
