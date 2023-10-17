import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class PackagesService {

  private BACK_URL = environment.BACK_URL

  constructor(private _http: HttpClient) { }

  addPackage(data: any): Observable<any> {
    
    const token = localStorage.getItem('token');

    if(!token) {
      return of(null);
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._http.post(`${this.BACK_URL}/users/register/package/package`, data, { headers });
  }

  updatePackage(id: string, data: any): Observable<any> {
    const token = localStorage.getItem('token');

    if(!token) {
      return of(null);
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._http.put(`${this.BACK_URL}/users/register/package/package/${id}`, data, { headers });
  }

  getPackages(): Observable<any> {
    const token = localStorage.getItem('token');

    if(!token) {
      return of(null);
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._http.get(`${this.BACK_URL}/users/register/package`, { headers });
  }

  deletePackages(id: string): Observable<any> {
    const token = localStorage.getItem('token');

    if(!token) {
      return of(null);
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._http.delete(`${this.BACK_URL}/users/register/package/${id}`, { headers });
  }

  getPackageById(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    if(!token) {
      return of(null);
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._http.get(`${this.BACK_URL}/users/register/package/${id}`, { headers })
  }
}

