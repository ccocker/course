export interface RegisterAccountInterface {
  user: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  };
}
