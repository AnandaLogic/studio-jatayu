import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import './app/config/firebase.config'; // Import Firebase configuration

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
