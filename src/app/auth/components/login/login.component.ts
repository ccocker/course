import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { IAuthService } from '../../interfaces/auth-service.interface';
import { authServiceFactory } from '../../services/auth-factory.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { Store } from '@ngrx/store';
import { RegisterAccountInterface } from '../../interfaces/register-account.interface';
import { selectIsSubmitting } from '../../store/reducers';
import { authActions } from '../../store/actions';

@Component({
  selector: 'mi-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    ResetPasswordComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  private authService: IAuthService;
  loginError: string | null = null;
  resetPassword = false;
  isSubmitting$ = this.store.select(selectIsSubmitting);
  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    private router: Router,
    private store: Store
  ) {
    this.authService = authServiceFactory();
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public login() {
    const request: RegisterAccountInterface = {
      user: {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      },
    };

    this.store.dispatch(authActions.register({ request }));

    this.loginError = null;
    if (this.loginForm.valid) {
      const credentials = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      // this.authService.login(credentials).subscribe(
      //   (data) => {
      //     this.dialogRef.close();
      //     this.router.navigate(['/course-schedule']);
      //   },
      //   (error) => {
      //     if (error && error.code) {
      //       console.error(error, error.code);
      //       this.loginError = error.message
      //         .split('Firebase: ')[1]
      //         .split(' (')[0];
      //     } else {
      //       this.loginError = 'An unexpected error occurred. Please try again.';
      //     }
      //   }
      // );
    } else {
      console.error('Form is not valid');
      this.loginError = 'Form is not valid';
    }
  }

  onResetPassword() {
    this.resetPassword = true;
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
