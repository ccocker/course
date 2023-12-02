import { environment } from '../environments/environment';
import { FirebaseAuthService } from './auth-firebase.service';
import { AuthMockService } from './auth-mock.service';
import { AuthServiceType } from './auth-service.enum';
import { IAuthService } from './auth-service.interface';

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
