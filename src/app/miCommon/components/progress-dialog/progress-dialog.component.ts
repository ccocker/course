import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'mi-progress-dialog',
    templateUrl: './progress-dialog.component.html',
    styleUrls: ['./progress-dialog.component.scss'],
    standalone: true,
    imports: [
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatButtonModule,
    ],
})
export class ProgressDialogComponent {
  @Input() progress = 0;
  @Input() total = 0;
  @Output() cancel = new EventEmitter<void>();

  get progressPercentage(): string {
    return `${Math.round(this.progress)}%`;
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
