import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { NavmenuComponent } from './navmenu/navmenu.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { VehicleService } from './services/vehicle.service';
import { AppErrorHandler } from './app.error-handler';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { PaginationComponent } from './shared/pagination.component';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';
import { PhotoService } from './services/photo.service';
import { authHttpInterceptorFn, provideAuth0 } from '@auth0/auth0-angular';

@NgModule({
  declarations: [
    AppComponent,
    VehicleFormComponent,
    NavmenuComponent,
    HomeComponent,
    VehicleListComponent,
    PaginationComponent,
    ViewVehicleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    VehicleService,
    PhotoService,
    provideAuth0({
      domain: "dev-8sgea87iqprs34vb.us.auth0.com",
      clientId:  "8OGgYVlkO6X9oclV2pLlIjH0whgYnXQ8",
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'https://dev-8sgea87iqprs34vb.us.auth0.com/api/v2/'
      },
      httpInterceptor: {
        allowedList: [
          'https://localhost:5001/api/*'
        ]
      }
    }),
    provideHttpClient(
      withInterceptors([authHttpInterceptorFn])
    ),
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
