import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { switchMap, take } from 'rxjs/operators';
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
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BackendErrorsInterface } from '@miShared/interfaces/backendErrors.interface';
import { FirebaseAuthService } from '../../services/auth-firebase.service';
import { selectCurrentUser } from '@miCommon/features/auth/store/reducers';
import { miAppConfig } from '@src/src/app/miApp/miApp.config';
import { Router } from '@angular/router';
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
export class LoginComponent implements OnInit {
  miAppConfig = miAppConfig;
  currentUser$ = this.store.select(selectCurrentUser);
  loginForm: FormGroup;
  existingUser: boolean | null = null;
  loginError: BackendErrorsInterface | null = null;
  resetPassword = false;

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });
  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    private store: Store,
    private actions$: Actions,
    private authService: FirebaseAuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    this.actions$
      .pipe(ofType(authActions.registerSuccess), take(1))
      .subscribe(() => {
        this.dialogRef.close();
      });
  }

  public login() {
    const credentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    const request: RegisterAccountInterface = {
      user: credentials,
    };

    this.store.dispatch(authActions.register({ request }));

    this.actions$
      .pipe(ofType(authActions.registerSuccess), take(1))
      .subscribe((action) => {
        const userRole = action.currentUser.userDetail.userRole;
        const landingPage =
          this.miAppConfig.defaultLandingPages[userRole] || '/';
        this.router.navigate([landingPage]);
        this.dialogRef.close();
      });

    this.actions$
      .pipe(ofType(authActions.registerFailure), take(1))
      .subscribe((receivedAction) => {
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

  onEmailBlur() {
    const email = this.loginForm.get('email')!.value;

    if (email) {
      this.authService.checkIfUserExists(email).then((exists) => {
        this.existingUser = exists;

        if (!exists) {
          this.dialogRef = this.dialogRef.updateSize('300px', '600px');
          this.addAdditionalControls();
          this.clearValidationErrors();
        } else {
          this.clearValidationErrors();
          this.removeAdditionalControls();
        }
      });
    }
  }

  checkExistingUser() {
    this.loginForm
      .get('email')!
      .valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((email) => this.authService.checkIfUserExists(email))
      )
      .subscribe((exists) => {
        this.existingUser = exists;
        if (!exists) {
          this.loginForm.addControl(
            'firstName',
            new FormControl('', Validators.required)
          );
          this.loginForm.addControl(
            'lastName',
            new FormControl('', Validators.required)
          );
        } else {
          this.loginForm.removeControl('firstName');
          this.loginForm.removeControl('lastName');
        }
      });
  }

  addAdditionalControls() {
    this.loginForm.addControl(
      'firstName',
      new FormControl('', Validators.required)
    );
    this.loginForm.addControl(
      'lastName',
      new FormControl('', Validators.required)
    );
    this.loginForm.addControl(
      'maximumHours',
      new FormControl('', Validators.required)
    );
  }

  removeAdditionalControls() {
    if (this.loginForm.contains('firstName')) {
      this.loginForm.removeControl('firstName');
    }
    if (this.loginForm.contains('lastName')) {
      this.loginForm.removeControl('lastName');
    }
    if (this.loginForm.contains('maximumHours')) {
      this.loginForm.removeControl('maximumHours');
    }
  }

  clearValidationErrors() {
    Object.keys(this.loginForm.controls).forEach((key) => {
      const control = this.loginForm.get(key);
      if (control) {
        // Option 1: Set as pristine
        control.markAsPristine();

        // Option 2: Clear validation errors
        control.setErrors(null);
      }
    });
  }
}
