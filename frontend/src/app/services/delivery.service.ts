import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  getPackageById(package_id: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private _http: HttpClient) { }

  addDelivery(data: any): Observable<any> {
    return this._http.post('http://localhost:5000/api/delivery', data);
  }

  updateDelivery(id: string, data: any): Observable<any> {
    return this._http.put(`http://localhost:5000/api/delivery/${id}`, data);
  }

  getDelivery(): Observable<any> {
    return this._http.get('http://localhost:5000/api/delivery');
  }

  deleteDelivery(id: string): Observable<any> {
    return this._http.delete(`http://localhost:5000/api/delivery/${id}`);
  }

  getDeliveryById(id: string): Observable<any> {
    return this._http.get(`http://localhost:5000/api/delivery/${id}`)
  }
}
