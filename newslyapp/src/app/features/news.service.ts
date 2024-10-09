import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClientService } from '../core/services/http-client.service';
import { AddNews } from '../shared/models/news/add-news';
import { NewsList } from '../shared/models/news/list-news';
import { UpdateNews } from '../shared/models/news/update-news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private url = environment.baseUrl;

  constructor(private httpClientService: HttpClientService) { }

  async getNews(): Promise<NewsList[]> {
    const observable: Observable<NewsList[]> = this.httpClientService.get({
      controller: 'news'
    })
    return await firstValueFrom(observable);
  }

  async getNewsById(id: number): Promise<NewsList> {
    const observable: Observable<NewsList> = this.httpClientService.get({
      controller: 'news'
    }, id)
    return await firstValueFrom(observable);
  }

  async getNewsByCategoryName(categoryName: string):Promise<NewsList[]>{
    const encodedCategoryName = encodeURIComponent(categoryName);
    const observable : Observable<NewsList[]> = this.httpClientService.get({
      controller: 'news',
      queryString: `categoryName=${encodedCategoryName}`
    })
    return await firstValueFrom(observable);
  }

  async addNews(newsItem: AddNews): Promise<AddNews> {
    const observable: Observable<AddNews> = this.httpClientService.post({
      controller: 'news'
    }, newsItem)
    return await firstValueFrom(observable);
  }

  async updateNews(newsItem: UpdateNews): Promise<UpdateNews>{
    const observable : Observable<UpdateNews> = this.httpClientService.put({
      controller: 'news'
    }, newsItem)

    return await firstValueFrom(observable);
  }

  async deleteNews(id: number): Promise<NewsList>{
    const observable : Observable<NewsList> = this.httpClientService.delete({
      controller: 'news'
    }, id)

    return await firstValueFrom(observable);
  }
}
