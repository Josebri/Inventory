import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = 'http://localhost:3000/admin/inventory';

  constructor(private http: HttpClient) {}

  getInventoryByLocation(locationId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${locationId}`);
  }

  addInventory(inventory: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, inventory);
  }

  updateInventory(productId: number, locationId: number, quantity: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${productId}/${locationId}`, quantity);
  }

  deleteInventory(productId: number, locationId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${productId}/${locationId}`);
  }
}
