import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { NavmenuComponent } from './navmenu/navmenu.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { VehicleService } from './services/vehicle.service';
import { AppErrorHandler } from './app.error-handler';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { PaginationComponent } from './shared/pagination.component';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';

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
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
