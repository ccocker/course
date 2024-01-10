// auth-service-factory.ts

import { InjectionToken } from '@angular/core';
import { IAuthService } from '../interfaces/auth-service.interface';
import { FirebaseAuthService } from './auth-firebase.service';
import { AuthMockService } from './auth-mock.service';
import { environment } from '@environments/environment.development';
import { AuthServiceType } from '../enums/auth-service.enum';

export const AUTH_SERVICE = new InjectionToken<IAuthService>('AuthService');

const mockAuthServiceInstance = new AuthMockService();
const firebaseAuthServiceInstance = new FirebaseAuthService();

export function authServiceFactory(): IAuthService {
  switch (environment.authServiceType) {
    case AuthServiceType.Mock:
      return mockAuthServiceInstance;
    case AuthServiceType.Firebase:
      return firebaseAuthServiceInstance;
    default:
      return mockAuthServiceInstance; // Default or actual service
  }
}
