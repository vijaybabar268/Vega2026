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
  private readonly PAGE_SIZE = 3;

  queryResult: any = {
    items: 0,
    totalItems: 0
  };
  makes: KeyValuePair[] = [];
  models: KeyValuePair[] = [];
  query: any = {
    pageSize: this.PAGE_SIZE
  };
  columns = [
    { title: 'Id' },    
    { title: 'Make', key: 'make', isSortable: true },
    { title: 'Model', key: 'model', isSortable: true },
    { title: 'Contact Name', key: 'contactName', isSortable: true },
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
    this.vehicleService.getVehicles(this.query).subscribe(result => {
      this.queryResult = result;
    })
  }

  private getMakes() {
    this.vehicleService.getMakes().subscribe(m => {
      this.makes = m as KeyValuePair[];
    })
  }

  onFilterChange() {
    this.query.page = 1;
    this.getVehicles();
  }

  resetFilter() {
    this.query = {
      page: 1,
      pageSize: this.PAGE_SIZE
    };
    this.getVehicles();
  }

  delete(id: number) {
    if (confirm("Are you sure?")) {
      this.vehicleService.delete(id).subscribe(
        x => {
          alert("Deleted vehicle successfully.");
          this.router.navigate(['/vehicles']);
          this.getVehicles();
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

  onPageChange(page: any) {
    this.query.page = page;
    this.getVehicles();
  }
}
