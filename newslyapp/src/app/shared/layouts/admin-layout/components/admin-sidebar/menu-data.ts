export interface MenuItem {
    icon: string;
    label: string;
    route: string;
  }

  export const MENU_ITEMS: MenuItem[] = [
    { icon: 'fa-regular fa-newspaper', label: 'Haber İşlemleri', route: 'news' },
    { icon: 'fa-solid fa-fire', label: 'Popüler Haberler', route: 'popular-news' },
    { icon: 'fa-solid fa-chart-pie', label: 'Veri Analizi', route: 'data-analysis' },
    { icon: 'fa-solid fa-comment', label: 'Haber Yorumları', route: 'news-comments' },
    { icon: 'fa-solid fa-list-check', label: 'Özellikler', route: 'features' },
    { icon: 'fa-solid fa-gear', label: 'Genel Ayarlar', route: 'settings' }
  ];