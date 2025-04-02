import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyModule } from '@ngx-formly/core';
import { MonetarioField } from './shared/custom-fields/monetario';
import { DateField } from './shared/custom-fields/date';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    importProvidersFrom([
      FormlyMaterialModule,
      FormlyModule.forRoot({
        types: [
          { name: 'monetario-field', component: MonetarioField },
          { name: 'date-field', component: DateField },
        ],
      }),
    ])
  ],
};
