import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'http://localhost:3000/admin/locations';

  constructor(private http: HttpClient) {}

  getAllLocations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addLocation(location: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, location);
  }

  updateLocation(id: number, location: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, location);
  }

  deleteLocation(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
