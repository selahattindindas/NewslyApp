import { Injectable } from '@angular/core';
import { HttpClientService } from '../core/services/http-client.service';
import { ListCategory } from '../shared/models/categories/list-category';
import { firstValueFrom, Observable } from 'rxjs';
import { AddCategory } from '../shared/models/categories/add-category';
import { UpdateCategory } from '../shared/models/categories/update-category';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  constructor(private httpClientService: HttpClientService){}

  async getCategories(): Promise<ListCategory[]> {
    const observable : Observable<ListCategory[]> = this.httpClientService.get({
      controller: 'categories'
    })
    return await firstValueFrom(observable);
  }

  async getCategoryById(id: number): Promise<ListCategory>{
    const observable : Observable<ListCategory> = this.httpClientService.get({
      controller: 'categories'
    }, id)
    return await firstValueFrom(observable);
  }

  async addCategory(categoryItem: AddCategory): Promise<AddCategory> {
    const observable : Observable<AddCategory> = this.httpClientService.post({
      controller: 'categories'
    }, categoryItem)
    return await firstValueFrom(observable);
  }

  async updateCategory(categoryItem: UpdateCategory): Promise<UpdateCategory> {
    const observable : Observable<UpdateCategory> = this.httpClientService.put({
      controller: 'categories'
    }, categoryItem)
    return await firstValueFrom(observable);
  }

  async deleteCategory(id: number): Promise<ListCategory>{
    const observable : Observable<ListCategory> = this.httpClientService.delete({
      controller: 'categories'
    }, id)
    return await firstValueFrom(observable);
  }
}
