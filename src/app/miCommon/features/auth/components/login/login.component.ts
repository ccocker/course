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
  userExists: boolean | null = null;
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

    this.loginForm
      .get('email')!
      .valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((email) => this.authService.checkIfUserExists(email))
      )
      .subscribe((exists) => {
        this.userExists = exists;
        if (!exists) {
          console.log('adding first and last name');
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
        } else {
          this.loginForm.removeControl('firstName');
          this.loginForm.removeControl('lastName');
          this.loginForm.removeControl('maximumHours');
        }
      });
  }

  public login() {
    const credentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    if (this.userExists === false) {
      credentials['firstName'] = this.loginForm.value.firstName;
      credentials['lastName'] = this.loginForm.value.lastName;
      credentials['maximumHours'] = this.loginForm.value.maximumHours;
    }
    const request: RegisterAccountInterface = {
      user: credentials,
    };

    this.store.dispatch(authActions.register({ request }));

    this.actions$
      .pipe(ofType(authActions.registerSuccess), take(1))
      .subscribe((action) => {
        console.log('action', action.currentUser);
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
}
