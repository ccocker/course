import { environment } from '../environments/environment';
import { AuthMockService } from './auth-mock.service';
import { AuthServiceType } from './auth-service.enum';
import { IAuthService } from './auth-service.interface';

export function authServiceFactory(): IAuthService {
  switch (environment.authServiceType) {
    case AuthServiceType.Mock:
      return new AuthMockService();

    default:
      return new AuthMockService(); // Default or actual service
  }
}
