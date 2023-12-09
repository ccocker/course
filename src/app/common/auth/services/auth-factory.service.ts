import { environment } from '../../../../environments/environment.development';
import { FirebaseAuthService } from './auth-firebase.service';
import { AuthMockService } from './auth-mock.service';
import { AuthServiceType } from '../enums/auth-service.enum';
import { IAuthService } from '../interfaces/auth-service.interface';

// Create a singleton instance of the service
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
