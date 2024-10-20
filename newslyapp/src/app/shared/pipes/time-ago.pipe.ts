import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {

  transform(value?: Date | string): string {
    if (!value) return 'Geçersiz tarih';

    const date = new Date(value);
    const seconds = Math.floor((+new Date() - +date) / 1000);
    const interval = Math.floor(seconds / 31536000);

    if (interval > 1) return `${interval} yıl önce`;
    if (seconds < 60) return `${seconds} saniye önce`;
    if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} dakika önce`;
    }
    if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} saat önce`;
    }
    const days = Math.floor(seconds / 86400);
    return `${days} gün önce`;
  }
}
