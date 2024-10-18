import { Component, OnInit } from '@angular/core';
import { FormEditorComponent } from '../../../../shared/components/form-editor/form-editor.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../../../news.service';
import { NewsList } from '../../../../shared/models/news/list-news';
import { UpdateNews } from '../../../../shared/models/news/update-news';
import { AlertService } from '../../../../shared/services/alert.service';
import { AlertConfig, AlertType } from '../../../../shared/models/alert-config';
import { MessageText } from '../../../../shared/utils/message';

@Component({
  selector: 'app-news-update',
  standalone: true,
  imports: [FormEditorComponent],
  templateUrl: './news-update.component.html',
  styleUrl: './news-update.component.scss'
})
export class NewsUpdateComponent implements OnInit {
  news!: NewsList;
  newsId!: number;

  constructor(private route: ActivatedRoute, private newsService: NewsService, private alertService: AlertService, private router: Router) { }

  ngOnInit(): void {
    this.getNewsById();
  }

  getNewsById() {
    const id = this.route.snapshot.params['id'];
    this.newsService.getNewsById(id).then((data) => {
      this.news = data;
      this.newsId = id;
    })
  }

  onSubmit(formData: UpdateNews) {
    this.newsService.updateNews(formData).then(
      (success) => {
        this.alertService.showAlert(new AlertConfig(MessageText.Success, AlertType.Success));
        this.router.navigate(['/admin', 'news'])
      },
      (error) => {
        this.alertService.showAlert(new AlertConfig(MessageText.ServerError, AlertType.Error));
      });
  }
}
