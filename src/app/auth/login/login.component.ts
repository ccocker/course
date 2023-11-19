import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { IAuthService } from '../auth-service.interface';
import { authServiceFactory } from '../auth-factory.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'mi-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  private authService: IAuthService;

  constructor(private dialogRef: MatDialogRef<LoginComponent>) {
    this.authService = authServiceFactory();
    console.log('LoginComponent created');
  }

  login() {
    const credentials = { username: this.email, password: this.password };
    this.authService.login(credentials).subscribe(
      (data) => {
        console.log('Login successful', data);
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }

  loginWithGoogle() {
    // Handle Google login
    // this.authService.googleLogin();
  }

  loginWithFacebook() {
    // Handle Facebook login
    // this.authService.facebookLogin();
  }
}
