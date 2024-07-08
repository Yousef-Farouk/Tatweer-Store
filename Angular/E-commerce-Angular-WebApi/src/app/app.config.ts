import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BASE_URL } from './components/tokens/tokens/app-tokens.token';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(),
    
    { provide: BASE_URL, useValue: 'https://localhost:7237/api/' }
  ],

};
