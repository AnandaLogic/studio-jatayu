import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { AuthService } from './services/auth.service';
import { FirestoreService } from './services/firestore.service';
import { StorageService } from './services/storage.service';

// Import Firebase configuration
import './config/firebase.config';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthService,
    FirestoreService,
    StorageService
  ],
  bootstrap: []
})
export class AppModule { }
