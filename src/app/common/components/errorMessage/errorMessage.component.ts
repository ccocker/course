import { Component, Input } from '@angular/core';

@Component({
  selector: 'mi-error-message',
  template: '<div>{{message}}</div>',
  standalone: true,
})
export class ErrorMessageComponent {
  @Input() message: string = 'Something went wrong';
}
