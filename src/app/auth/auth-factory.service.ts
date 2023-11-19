import { environment } from '../environments/environment';
import { AuthMockService } from './auth-mock.service';
import { AuthServiceType } from './auth-service.enum';
import { IAuthService } from './auth-service.interface';

// Create a singleton instance of the service
const mockAuthServiceInstance = new AuthMockService();

export function authServiceFactory(): IAuthService {
  switch (environment.authServiceType) {
    case AuthServiceType.Mock:
      return mockAuthServiceInstance;

    default:
      return mockAuthServiceInstance; // Default or actual service
  }
}