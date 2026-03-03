import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrl: './view-vehicle.component.css'
})
export class ViewVehicleComponent implements OnInit {
  vehicle: any;
  vehicleId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService
  ) {
    route.params.subscribe(p => {
      this.vehicleId = +p['id'];
      
      if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
        router.navigate(['/vehicles']);
        return;
      }
    })
  }
  
  ngOnInit() {
    this.getVehicles();
  }

  getVehicles() {
    this.vehicleService.getVehicle(this.vehicleId).subscribe(v => {
      this.vehicle = v      
    },
    err => {
      if (err.status == 404) {
        this.router.navigate(['/vehicles']);
        return;
      }
    }
  )}

}
