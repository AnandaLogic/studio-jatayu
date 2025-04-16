import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { FirestoreService } from './services/firestore.service';
import { StorageService } from './services/storage.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    AuthService,
    FirestoreService,
    StorageService
  ]
};
