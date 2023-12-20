import { Component, Input } from '@angular/core';

@Component({
  selector: 'mi-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  standalone: true,
})
export class BannerComponent {
  @Input() message: string;
}
