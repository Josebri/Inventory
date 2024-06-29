// src/app/app-routing.module.ts
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.component';

export const appRoutingProviders = [
  provideRouter(routes, withComponentInputBinding())
];
