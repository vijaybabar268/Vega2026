import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrl: './vehicle-form.component.css'
})
export class VehicleFormComponent implements OnInit {
  makes:any = [];
  models:any = [];
  features:any = [];
  vehicle:any = {};
  
  constructor (
    private vehicleService: VehicleService) {}

  ngOnInit(): void {
    // Get makes
    this.vehicleService.getMakes().subscribe(makes => {
      this.makes = makes;
    })

    // Get features
    this.vehicleService.getFeatures().subscribe(features => {
      this.features = features;
    })
  }

  onMakeChange() {
    var selectedMake = this.makes.find((m: any) => m.id == this.vehicle.make);
    this.models = selectedMake ? selectedMake.models : [];
  }

}
