import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { IAuthService } from '../auth-service.interface';
import { authServiceFactory } from '../auth-factory.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'mi-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  private authService: IAuthService;

  constructor() {
    this.authService = authServiceFactory();
  }

  login() {
    const credentials = { username: this.username, password: this.password };
    this.authService.login(credentials).subscribe(
      (data) => {
        console.log('Login successful', data);
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
}
