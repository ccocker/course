import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, NgComponentOutlet } from '@angular/common';

export interface ConfirmDialogData {
  title: string;
  content: string;
  component?: any;
  actionLabel?: string;
}

@Component({
  selector: 'mi-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  standalone: true,
  imports: [MatDialogModule, NgIf, NgComponentOutlet, MatButtonModule],
})
export class ConfirmDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close(true);
  }

  save() {
    this.dialogRef.close(this.data);
  }

  close() {
    this.dialogRef.close();
  }
}

export function openDialog(dialog: MatDialog, data: any, component: any) {
  const config = new MatDialogConfig();

  config.disableClose = true;
  config.autoFocus = true;
  config.data = { ...data };
  const dialogRef = dialog.open(ConfirmDialogComponent, config);
  return dialogRef.afterClosed();
}
