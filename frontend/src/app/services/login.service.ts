import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) { }

  login(data: any): Observable<any> {
    return this._http.post('http://localhost:5000/api/auth/login', data);
  }

}
