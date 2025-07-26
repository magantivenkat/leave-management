import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom }    from '@angular/core';
import { provideRouter }          from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule }            from '@angular/forms';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AppComponent }   from './app/app.component';
import { routes }         from './app/app-routing.module';
import { JwtInterceptor } from './app/interceptors/jwt.interceptor';
import { NgbModule, NgbDatepickerModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';


// JWT factory
export function jwtOptionsFactory() {
  return {
    tokenGetter: () => localStorage.getItem('token'),
    allowedDomains: ['localhost:55082'],
    disallowedRoutes: []
  };
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    importProvidersFrom(FormsModule),
    importProvidersFrom(
      JwtModule.forRoot({
        jwtOptionsProvider: {
          provide: JWT_OPTIONS,
          useFactory: jwtOptionsFactory
        }
      }),
      NgbModule,
      NgbDatepickerModule,
      NgbTooltipModule
    )
  ]
})
.catch(err => console.error(err));
