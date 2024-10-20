import { Component, OnInit } from '@angular/core';
import { FormEditorComponent } from "../../../../shared/components/form-editor/form-editor.component";
import { AddNews } from '../../../../shared/models/news/add-news';
import { NewsService } from '../../../../core/services/news.service';
import { AlertConfig, AlertType } from '../../../../shared/models/alert-config';
import { AlertService } from '../../../../shared/services/alert.service';
import { Router } from '@angular/router';
import { MessageText } from '../../../../shared/utils/message';

@Component({
  selector: 'app-news-create',
  standalone: true,
  imports: [FormEditorComponent],
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.scss']
})
export class NewsCreateComponent implements OnInit {

  constructor(private newsService: NewsService, private alertService: AlertService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(formData: AddNews) {
    this.newsService.addNews(formData).then(
      (success) => {
        this.alertService.showAlert(new AlertConfig(MessageText.Success, AlertType.Success));
        this.router.navigate(['/admin', 'news']);
      },
      (error) => {
        this.alertService.showAlert(new AlertConfig(MessageText.ServerError, AlertType.Error));
      });
  }
}
