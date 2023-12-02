import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';

const providers = [
  ...appConfig.providers,
  provideRouter(routes), // Providing routing configuration here
];

bootstrapApplication(AppComponent, {
  providers: providers,
}).catch((err) => console.error(err));
