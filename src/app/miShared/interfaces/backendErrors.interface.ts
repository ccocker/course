export interface BackendErrorDetails {
  code: string;
  message: string;
}

export interface BackendErrorsInterface {
  [key: string]: BackendErrorDetails;
}
