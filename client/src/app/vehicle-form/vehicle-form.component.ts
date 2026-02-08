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
  vehicle:any = {
    features: [],
    contact: {}
  };
  
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
    var selectedMake = this.makes.find((m: any) => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
    delete this.vehicle.modelId;
  }

  onFeatureToggle(featureId: any, $event: any) {
    if ($event.target.checked) {
      this.vehicle.features.push(featureId);
    } else {
      var index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }

  submit() {
    this.vehicleService.create(this.vehicle).subscribe(
      x => {
        console.log(x)
        alert("Created vehicle successfully.");
      },
      err => {
        alert("Error while creating vehicle: "+ err);
      }
    );
  }

}
