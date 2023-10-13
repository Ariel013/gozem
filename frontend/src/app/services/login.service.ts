import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) { }

  login(data: any): Observable<any> {
    return this._http.post('http://localhost:5000/api/auth/login', data);
  }

  // Recuperation du role de l'utilisateur
  getUserRole(): Observable<any> {
    // Recuperation du jeton depuis le localstorage
    const token = localStorage.getItem('token');

    if(!token) {
      return of(null);
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._http.get('http://localhost:5000/api/auth/role', { headers })
  }

}
