import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NewsService } from '../../features/news/news.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryResolver implements Resolve<{ categoryId: number }> {
  constructor(private newsService: NewsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ categoryId: number }> {
    const categoryName = route.paramMap.get('categoryName');

    return this.newsService.getCategoryIdByName(categoryName ?? '').pipe(
      catchError(() => {
        this.router.navigate(['/404']); 
        return throwError(() => new Error('Geçersiz kategori')); 
      })
    );
  }
}
