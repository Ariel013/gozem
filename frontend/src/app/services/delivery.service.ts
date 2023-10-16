import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  getPackageById(package_id: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private _http: HttpClient) { }

  addDelivery(data: any): Observable<any> {
    const token = localStorage.getItem('token');

    if(!token) {
      return of(null);
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._http.post('http://localhost:5000/api/delivery', data, { headers });
  }

  updateDelivery(id: string, data: any): Observable<any> {
    const token = localStorage.getItem('token');

    if(!token) {
      return of(null);
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._http.put(`http://localhost:5000/api/delivery/${id}`, data, { headers });
  }

  getDelivery(): Observable<any> {
    const token = localStorage.getItem('token');

    if(!token) {
      return of(null);
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._http.get('http://localhost:5000/api/delivery', { headers });
  }

  deleteDelivery(id: string): Observable<any> {
    const token = localStorage.getItem('token');

    if(!token) {
      return of(null);
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._http.delete(`http://localhost:5000/api/delivery/${id}`, { headers });
  }

  getDeliveryById(id: string): Observable<any> {
    const token = localStorage.getItem('token');

    if(!token) {
      return of(null);
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._http.get(`http://localhost:5000/api/delivery/${id}`, { headers })
  }
}
