import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PackagesService {

  constructor(private _http: HttpClient) { }

  addPackage(data: any): Observable<any> {
    return this._http.post('http://localhost:5000/api/package', data);
  }

  updatePackage(id: string, data: any): Observable<any> {
    return this._http.put(`http://localhost:5000/api/package/${id}`, data);
  }

  getPackages(): Observable<any> {
    return this._http.get('http://localhost:5000/api/package');
  }

  deletePackages(id: string): Observable<any> {
    return this._http.delete(`http://localhost:5000/api/package/${id}`);
  }
}

