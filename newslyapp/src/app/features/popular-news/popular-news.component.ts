import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TruncatePipe } from '../../shared/pipes/truncate.pipe';

@Component({
  selector: 'app-popular-news',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  templateUrl: './popular-news.component.html',
  styleUrl: './popular-news.component.scss'
})
export class PopularNewsComponent {

  popular: {id:number, image: string, author: string, description: string }[] = [
    {id:1, image: 'assets/img/test3.jpg', author: 'Selahattin', description: 'Lamine Yamal krizi büyüyor: Büyükannesinden gelen açıklama gerginliği artırdı'},
    {id:2, image: 'assets/img/test3.jpg', author: 'Selahattin', description: 'Savaş makinesine dönüşen Tesla Cybertruck uzaktan kapatıldı'},
    {id:3, image: 'assets/img/test3.jpg', author: 'Selahattin', description: 'Mersinde bir profesör el ve ayakları bağlı halde fıçı içinde ölü bulundu: Oğlu gözaltına alindi Mersinde bir profesör el ve ayakları bağlı halde fıçı içinde ölü bulundu'},
    {id:4, image: 'assets/img/test3.jpg', author: 'Selahattin', description: 'CHPli Bulut, Özelin Mustafa Kemalin askerleriyiz sloganına neden kızdığını açıkladı'},
    {id:5, image: 'assets/img/test3.jpg', author: 'Selahattin', description: 'Beni vuracaklar diyen pilottan beklenen haber 19 ay sonra geldi'},
    {id:6, image: 'assets/img/test3.jpg', author: 'Selahattin', description: 'Savaş makinesine dönüşen Tesla Cybertruck uzaktan kapatıldı'},
    {id:7, image: 'assets/img/test3.jpg', author: 'Selahattin', description: 'Lamine Yamal krizi büyüyor: Büyükannesinden gelen açıklama gerginliği artırdı'},
    {id:8, image: 'assets/img/test3.jpg', author: 'Selahattin', description: 'Mersinde bir profesör el ve ayakları bağlı halde fıçı içinde ölü bulundu: Oğlu gözaltına alindi'},
    {id:9, image: 'assets/img/test3.jpg', author: 'Selahattin', description: 'Beni vuracaklar" diyen pilottan beklenen haber 19 ay sonra geldi'},
  ];
}
