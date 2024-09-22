import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { Category, News } from './components/news-create/news-create.component';
import { Test } from '../../shared/components/card/card.component';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  
  url = environment.baseUrl;

  constructor(private http: HttpClient) {}

  addNews(newsItem: News): Observable<News> {
    return this.http.post<News>(`${this.url}/news`, newsItem).pipe(
      catchError(error => {
        throw error; 
      })
    );
  }

  getNews(): Observable<News[]> {
    return this.http.get<News[]>(`${this.url}/news`);
  }

  getNewsByCategoryId(id: number): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.url}/news?categoryId=${id}`).pipe(
      catchError(error => {
        console.error('Error fetching news by category', error);
        throw error; 
      })
    );
  }

  getCategories():Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}/categories`)
  }

  
  getCategoryIdByName(name: string): Observable<{ categoryId: number}> {
    return this.http.get<Category[]>(`${this.url}/categories`).pipe(
      map(categories => {
        const category = categories.find(cat => cat.name.toLowerCase() === name?.toLowerCase());
        return { categoryId: category ? category.id : 1 }; 
      }),
    );
  }
  
}
