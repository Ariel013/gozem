import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  private BACK_URL = environment.BACK_URL

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
    return this._http.post(`${this.BACK_URL}/delivery`, data, { headers });
  }

  updateDelivery(id: string, data: any): Observable<any> {
    const token = localStorage.getItem('token');

    if(!token) {
      return of(null);
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._http.put(`${this.BACK_URL}/delivery/${id}`, data, { headers });
  }

  getDelivery(): Observable<any> {
    const token = localStorage.getItem('token');

    if(!token) {
      return of(null);
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._http.get(`${this.BACK_URL}/delivery`, { headers });
  }

  deleteDelivery(id: string): Observable<any> {
    const token = localStorage.getItem('token');

    if(!token) {
      return of(null);
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._http.delete(`${this.BACK_URL}/delivery/${id}`, { headers });
  }

  getDeliveryById(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    if(!token) {
      return of(null);
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._http.get(`${this.BACK_URL}/delivery/${id}`, { headers })
  }
}
