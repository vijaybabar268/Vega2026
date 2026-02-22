import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SaveVehicle, Vehicle } from '../models/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private readonly  baseUrl = "https://localhost:5001";
  private readonly vehiclesEndpoint = 'api/vehicles';

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
    return this.http.post(this.baseUrl + '/' + this.vehiclesEndpoint, vehicle).pipe(
      map(res => res)
    )
  }

  getVehicle(id: any) {
    return this.http.get(this.baseUrl + '/' + this.vehiclesEndpoint + '/' + id).pipe(
      map(res => res)
    )
  }

  /*getVehicles() {
    return this.http.get(this.baseUrl + '/api/vehicles').pipe(
      map((res) => res)
    )
  }*/
  getVehicles(filter: any): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.baseUrl + '/api/vehicles'+ '?' + this.toQueryString(filter));
  }

  toQueryString(obj: any) {
    var parts = [];
    for(var property in obj){
      var value = obj[property];
      if (value != null && value != undefined)
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
    }

    return parts.join('&');
  }

  update(vehicle: SaveVehicle) {
    return this.http.put(this.baseUrl + '/' + this.vehiclesEndpoint + '/' + vehicle.id, vehicle).pipe(
      map(res => res)
    )
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + '/' + this.vehiclesEndpoint + '/' + id).pipe(
      map(res => res)
    )
  }
}
