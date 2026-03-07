import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../services/vehicle.service';
import { PhotoService } from '../services/photo.service';
import { Photo } from '../models/vehicle';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrl: './view-vehicle.component.css'
})
export class ViewVehicleComponent implements OnInit {
  vehicle: any;
  vehicleId: number = 0;
  @ViewChild('fileInput') fileInput!: ElementRef;
  photos: Photo[] = [];
  progress: any = {};

  constructor(
    private zone: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private photoService: PhotoService
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
    this.getPhotos(this.vehicleId);
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

  uploadPhoto() {
    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    
    this.photoService.upload(this.vehicleId, nativeElement.files?.[0]).subscribe(
      x => {
        console.log(x)
        this.zone.run(() => {
          this.progress = x;
        });
      }, 
      null,
      () => {
        this.getPhotos(this.vehicleId);
        nativeElement.value = '';
      }
    );
  }

  getPhotos(vehicleId: number) {
    this.photoService.getPhotos(vehicleId).subscribe(p => {
      this.photos = p;
    })
  }

}
