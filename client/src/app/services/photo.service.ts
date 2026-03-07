import { HttpClient, HttpEvent, HttpEventType, HttpProgressEvent } from '@angular/common/http';
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
    return this.http.post(`${this.baseUrl}/${this.vehiclesEndpoint}/${vehicleId}/photos`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => this.getEventMessage(event))
    )
  }

  private getEventMessage(event: HttpEvent<any>) {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        const progressEvent = event as HttpProgressEvent;
        const percentComplete = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
        return { percentage: percentComplete };
      case HttpEventType.Response:
        return event.body || { percentage: 100 };
      default:
        return { percentage: 0 };
    }
  }

  getPhotos(vehicleId: number) {
    return this.http.get<Photo[]>(`${this.baseUrl}/${this.vehiclesEndpoint}/${vehicleId}/photos`).pipe(
      map(res => res)
    )
  }
}
