import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../news.service';
import { NewsList } from '../../../../shared/models/news/list-news';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [CommonModule, RouterLink, TruncatePipe, TimeAgoPipe],
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {
  listNews: NewsList[] = [];
  paginatedNews: NewsList[] = [];
  pageSize = 7;
  currentPage = 1;
  totalPages!: number;

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.getNews();
  }

  getNews() {
    this.newsService.getNews().then(data => {
      this.listNews = data;
      this.updatePagination();
    });
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.listNews.length / this.pageSize);
    this.paginatedNews = this.listNews.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }

  deleteNews(id: number) {
    this.newsService.deleteNews(id).then(() => {
      this.getNews();
    });
  }

  getDisplayedPages(): number[] {
    const totalPagesToShow = 5;
    const startPage = Math.max(1, this.currentPage - Math.floor(totalPagesToShow / 2));
    const endPage = Math.min(startPage + totalPagesToShow - 1, this.totalPages);
    const adjustedStartPage = Math.max(1, endPage - totalPagesToShow + 1);
    return Array.from({ length: endPage - adjustedStartPage + 1 }, (_, index) => adjustedStartPage + index);
  }

}
