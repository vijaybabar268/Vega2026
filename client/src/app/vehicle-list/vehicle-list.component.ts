import { Component, OnInit } from '@angular/core';
import { KeyValuePair, Vehicle } from '../models/vehicle';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.css'
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];
  makes: KeyValuePair[] = [];
  models: KeyValuePair[] = [];
  filter: any = {};

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.getMakes();
    this.getVehicles();
  }
  
  private getVehicles() {
    this.vehicleService.getVehicles(this.filter).subscribe((v) => {
      this.vehicles = v;
    })
  }

  private getMakes() {
    this.vehicleService.getMakes().subscribe(m => {
      this.makes = m as KeyValuePair[];
    })
  }

  onFilterChange() {
    this.getVehicles();
  }

  resetFilter() {
    this.filter = {};
    this.onFilterChange();
  }
}
