import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { take } from 'rxjs/operators';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { Store } from '@ngrx/store';
import { RegisterAccountInterface } from '../../interfaces/register-account.interface';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers';
import { authActions } from '../../store/actions';
import { Actions, ofType } from '@ngrx/effects';
import { combineLatest } from 'rxjs';
import { BackendErrorsInterface } from '@miShared/interfaces/backendErrors.interface';

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

  loginError: BackendErrorsInterface | null = null;
  resetPassword = false;

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });
  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    private store: Store,
    private actions$: Actions
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('craig.cocker@gmail.com', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('test1234', [Validators.required]),
    });

    this.actions$
      .pipe(ofType(authActions.registerSuccess), take(1))
      .subscribe(() => {
        this.dialogRef.close();
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

    this.actions$
      .pipe(ofType(authActions.registerFailure), take(1))
      .subscribe((receivedAction) => {
        console.log('receivedAction', receivedAction);
        // Ensure that receivedAction contains the 'errors' property of the correct type
        this.loginError = receivedAction.errors;
      });
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
