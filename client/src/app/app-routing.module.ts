import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { HomeComponent } from './home/home.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';

const routes: Routes = [
  {path: 'vehicles/new', component: VehicleFormComponent },
  {path: 'vehicles/:id', component: VehicleFormComponent },
  {path: 'vehicles', component: VehicleListComponent },
  {path: 'vehicles/photos/:id', component: ViewVehicleComponent },
  {path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
