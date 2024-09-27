import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, switchMap } from 'rxjs';
import { Category, News, NewsList } from './components/news-create/news-create.component';
import { StringHelper } from '../../shared/utils/string-helper';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private url = environment.baseUrl;

  constructor(private http: HttpClient) { }

  addNews(newsItem: News): Observable<News> {
    const slug = StringHelper.convertToSlug(newsItem.title, newsItem.id);
    const newsWithSlug = { ...newsItem, slug };

    return this.http.post<News>(`${this.url}/news`, newsWithSlug).pipe(
      catchError(error => { throw error; })
    );
  }

  getNews(): Observable<NewsList[]> {
    return this.http.get<NewsList[]>(`${this.url}/news`).pipe(
      catchError(error => { throw error; })
    );
  }

  getNewsById(id: number): Observable<NewsList> {
    return this.http.get<NewsList>(`${this.url}/news/${id}`).pipe(
      catchError(error => { throw error; })
    );
  }

  getNewsBySlug(slug: string): Observable<NewsList> {
    return this.getNews().pipe(
      switchMap((newsList: NewsList[]) => {
        const matchedNews = newsList.find(newsItem => newsItem.slug === slug);
        if (matchedNews) {
          return this.getNewsById(matchedNews.id);
        } else {
          throw new Error('Haber bulunamadı.');
        }
      }),
      catchError(error => { throw error; })
    );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}/categories`).pipe(
      catchError(error => { throw error; })
    );
  }

  getNewsByCategoryName(categoryName: string): Observable<NewsList[]> {
    const encodedCategoryName = encodeURIComponent(categoryName);
    return this.http.get<NewsList[]>(`${this.url}/news?categoryName=${encodedCategoryName}`).pipe(
      catchError(error => { throw error; })
    );
  }

  getNewsByCategory(slug: string): Observable<{ category: Category, newsList: NewsList[] }> {
    return this.getCategories().pipe(
      switchMap((categories: Category[]) => {
        const matchedCategory = categories.find(category => category.slug === slug);
        if (matchedCategory) {
          return this.getNewsByCategoryName(matchedCategory.name).pipe(
            map(newsList => ({ category: matchedCategory, newsList }))
          );
        } else {
          throw new Error('Kategori bulunamadı.');
        }
      }),
      catchError(error => { throw error; })
    );
  }
}
