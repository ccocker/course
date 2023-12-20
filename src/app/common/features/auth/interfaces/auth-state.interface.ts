import { BackendErrorsInterface } from '@miShared/interfaces/backendErrors.interface';
import { CurrentUserInterface } from '@miShared/interfaces/current-user.interface';

export interface AuthStateInterface {
  isSubmitting: boolean;
  currentUser: CurrentUserInterface | null | undefined;
  isLoading: boolean;
  validationErrors: BackendErrorsInterface | null;
}
