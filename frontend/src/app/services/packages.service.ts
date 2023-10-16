import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PackagesService {

  constructor(private _http: HttpClient) { }

  addPackage(data: any): Observable<any> {
    
    const token = localStorage.getItem('token');

    if(!token) {
      return of(null);
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._http.post('http://localhost:5000/api/package', data, { headers });
  }

  updatePackage(id: string, data: any): Observable<any> {
    const token = localStorage.getItem('token');

    if(!token) {
      return of(null);
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._http.put(`http://localhost:5000/api/package/${id}`, data, { headers });
  }

  getPackages(): Observable<any> {
    const token = localStorage.getItem('token');

    if(!token) {
      return of(null);
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._http.get('http://localhost:5000/api/package', { headers });
  }

  deletePackages(id: string): Observable<any> {
    const token = localStorage.getItem('token');

    if(!token) {
      return of(null);
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._http.delete(`http://localhost:5000/api/package/${id}`, { headers });
  }

  getPackageById(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    if(!token) {
      return of(null);
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._http.get(`http://localhost:5000/api/package/${id}`, { headers })
  }
}

