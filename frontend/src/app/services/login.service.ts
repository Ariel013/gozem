import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private BACK_URL = environment.BACK_URL

  constructor(private _http: HttpClient) { }

  login(data: any): Observable<any> {
    return this._http.post(`${this.BACK_URL}/users/login`, data);
  }

  // Recuperation du role de l'utilisateur
  getUserRole(): Observable<any> {
    // Recuperation du jeton depuis le localstorage
    const token = localStorage.getItem('token');

    if (!token) {
      return of(null);
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._http.get(`${this.BACK_URL}/users/role`, { headers })
  }

}
