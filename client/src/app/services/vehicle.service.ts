import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { SaveVehicle } from '../models/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private baseUrl = "https://localhost:5001";

  constructor(private http: HttpClient) { }

  getMakes() {
    return this.http.get(this.baseUrl+ '/api/makes').pipe(
      map(res => res)
    )
  }

  getFeatures() {
    return this.http.get(this.baseUrl+ '/api/features').pipe(
      map(res => res)
    )
  }

  create(vehicle: any) {
    return this.http.post(this.baseUrl + '/api/vehicles', vehicle).pipe(
      map(res => res)
    )
  }

  getVehicle(id: any) {
    return this.http.get(this.baseUrl + '/api/vehicles/' + id).pipe(
      map(res => res)
    )
  }

  update(vehicle: SaveVehicle) {
    return this.http.put(this.baseUrl + '/api/vehicles/' + vehicle.id, vehicle).pipe(
      map(res => res)
    )
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + '/api/vehicles/' + id).pipe(
      map(res => res)
    )
  }
}
