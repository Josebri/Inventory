// src/app/app.module.ts
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/envionment';

if (environment.production) {
  enableProdMode();
}

export class AppModule {
  static providers = [
    importProvidersFrom(
      RouterModule.forRoot([])
    )
  ];
}
