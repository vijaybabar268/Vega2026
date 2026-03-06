import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Photo } from '../models/vehicle';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private readonly  baseUrl = "https://localhost:5001";
  private readonly vehiclesEndpoint = 'api/vehicles';

  constructor(private http: HttpClient) { }

  upload(vehicleId: number, photo:any) {
    // return this.http.post(this.baseUrl + '/' + this.vehiclesEndpoint + vehicleId + '/photos')
    var formData = new FormData();
    formData.append('file', photo);
    return this.http.post(`${this.baseUrl}/${this.vehiclesEndpoint}/${vehicleId}/photos`, formData).pipe(
      map(res => res)
    )
  }

  getPhotos(vehicleId: number) {
    return this.http.get<Photo[]>(`${this.baseUrl}/${this.vehiclesEndpoint}/${vehicleId}/photos`).pipe(
      map(res => res)
    )
  }
}
