import { Component, OnInit } from '@angular/core';
import { KeyValuePair, Vehicle } from '../models/vehicle';
import { VehicleService } from '../services/vehicle.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.css'
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];
  makes: KeyValuePair[] = [];
  models: KeyValuePair[] = [];
  query: any = {};
  columns = [
    { title: 'Id' },
    { title: 'Contact Name', key: 'contactName', isSortable: true },
    { title: 'Make', key: 'make', isSortable: true },
    { title: 'Model', key: 'model', isSortable: true },
    { }
  ];

  constructor(
    private vehicleService: VehicleService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getMakes();
    this.getVehicles();
  }
  
  private getVehicles() {
    this.vehicleService.getVehicles(this.query).subscribe((v) => {
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
    this.query = {};
    this.onFilterChange();
  }

  delete(id: number) {
    if (confirm("Are you sure?")) {
      this.vehicleService.delete(id).subscribe(
        x => {
          alert("Deleted vehicle successfully.");
          this.router.navigate(['/vehicles']);
        },
        err => {
          alert("Error while deleting vehicle: "+ err);
        }
      );
  }}

  sortBy(columnName: any) {
    if (this.query.sortBy === columnName) {
      // this.query.isSortAscending = false;
      this.query.isSortAscending = !this.query.isSortAscending;
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }
    this.getVehicles();
  }
}
