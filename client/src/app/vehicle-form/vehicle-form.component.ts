import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { SaveVehicle, Vehicle } from '../models/vehicle';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrl: './vehicle-form.component.css'
})
export class VehicleFormComponent implements OnInit {
  makes:any = [];
  models:any = [];
  features:any = [];
  vehicle: SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    features: [],
    contact: {
      name: '',
      phone: '',
      email: ''
    }
  };
  title: string = "New";
  
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService) {
      route.params.subscribe(p => {
        var id = (isNaN(Number(p['id']))) ? 0 : Number(p['id']);
        this.vehicle.id = id;

        this.title = (this.vehicle.id > 0) ? "Edit": "New";
      })
    }

  ngOnInit(): void {
    // Multiple requests in parallel
    var sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures(),
    ];

    if (this.vehicle.id) {
      sources.push(this.vehicleService.getVehicle(this.vehicle.id));
    }

    forkJoin(
      sources
    ).subscribe(data => {
      this.makes = data[0];
      this.features = data[1];

      if (this.vehicle.id) {
        this.setVehicle(data[2] as Vehicle);
        this.populateModels();
      }
    }, err => {
      if (err.status == 404) {
        this.router.navigate(['/home']);
      }
    });

    // Get vehicle
    // this.vehicleService.getVehicle(this.vehicle.id).subscribe(v => {
    //   this.vehicle = v;
    // }, err => {
    //   if (err.status == 404) {
    //     this.router.navigate(['/home']);
    //   }
    // });

    // Get makes
    // this.vehicleService.getMakes().subscribe(makes => {
    //   this.makes = makes;
    // })

    // Get features
    // this.vehicleService.getFeatures().subscribe(features => {
    //   this.features = features;
    // })
  }

  private setVehicle(v: Vehicle) {
    this.vehicle.id = v.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contact = v.contact;
    this.vehicle.features = v.features.map(f => f.id);
  }

  onMakeChange() {
    this.populateModels();
    this.vehicle.modelId = 0;
  }

  private populateModels() {
    var selectedMake = this.makes.find((m: any) => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
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
    var result$ = (this.vehicle.id != 0) ? this.vehicleService.update(this.vehicle) : this.vehicleService.create(this.vehicle); 
    result$.subscribe(
      x => {
        console.log(x)
        // alert("Data was successfully saved.");
        this.router.navigate(['/vehicles']);
      },
      err => {
        alert("Error while creating vehicle: "+ err);
      }
    );
  }

}
