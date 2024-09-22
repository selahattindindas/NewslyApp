import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryId: number = 0; 

  setCategoryId(id: number) {
    this.categoryId = id;
  }

  getCategoryId(): number {
    return this.categoryId;
  }
}
