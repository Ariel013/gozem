import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http: HttpClient) { }

  addUser(data: any): Observable<any> {
    const token = localStorage.getItem('token');

    if(!token) {
      return of(null);
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._http.post('http://localhost:5000/api/users/register', data, { headers });
  }

  updateUser(id: string, data: any): Observable<any> {

    const token = localStorage.getItem('token');

    if(!token) {
      return of(null);
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._http.put(`http://localhost:5000/api/users/${id}`, data, { headers });
  }

  deleteUsers(id: string): Observable<any> {
    const token = localStorage.getItem('token');

    if(!token) {
      return of(null);
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._http.delete(`http://localhost:5000/api/users/${id}`, { headers });
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

    return this._http.get('http://localhost:5000/api/users', { headers })
  }
}
