import { AuthServiceType } from '../auth/auth-service.enum';

export const environment = {
  production: false,
  authServiceType: AuthServiceType.Mock,
  firebaseConfig: {
    apiKey: 'AIzaSyDLaPfghjaxecZM3mY37Kj-FTw7e88sayg',
    authDomain: 'rmit-scheduler.firebaseapp.com',
    projectId: 'rmit-scheduler',
    storageBucket: 'rmit-scheduler.appspot.com',
    messagingSenderId: '536021814788',
    appId: '1:536021814788:web:3e3decf2d53366bcfeaf51',
  },
};
