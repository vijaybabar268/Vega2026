import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

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
}
