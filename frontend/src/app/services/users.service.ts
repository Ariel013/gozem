import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private BACK_URL = environment.BACK_URL

  constructor(private _http: HttpClient) { }

  addUser(data: any): Observable<any> {
    const token = localStorage.getItem('token');

    if(!token) {
      return of(null);
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._http.post(`${this.BACK_URL}/users/register`, data, { headers });
  }

  updateUser(id: string, data: any): Observable<any> {

    const token = localStorage.getItem('token');

    if(!token) {
      return of(null);
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._http.put(`${this.BACK_URL}/users/${id}`, data, { headers });
  }

  deleteUsers(id: string): Observable<any> {
    const token = localStorage.getItem('token');

    if(!token) {
      return of(null);
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._http.delete(`${this.BACK_URL}/users/${id}`, { headers });
  }

  // Recuperation du role de l'utilisateur
  getUsers(): Observable<any> {
    // Recuperation du jeton depuis le localstorage
    const token = localStorage.getItem('token');

    if(!token) {
      return of(null);
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._http.get(`${this.BACK_URL}/users`, { headers })
  }
}
