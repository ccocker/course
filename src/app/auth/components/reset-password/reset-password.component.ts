import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IAuthService } from '../../interfaces/auth-service.interface';
import { authServiceFactory } from '../../services/auth-factory.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mi-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
  ],
})
export class ResetPasswordComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  message: string | null = null;
  private authService: IAuthService;

  constructor() {
    this.authService = authServiceFactory();
  }

  resetPassword(): void {
    if (this.email.valid) {
      this.authService.resetPassword(this.email.value).subscribe({
        next: () => (this.message = 'Password reset email sent.'),
        error: (error) =>
          (this.message = 'Failed to send password reset email.'),
      });
    }
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
