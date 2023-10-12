import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http: HttpClient) { }

  addUser(data: any): Observable<any> {
    return this._http.post('http://localhost:5000/api/auth/register', data);
  }

  updateUser(id: string, data: any): Observable<any> {
    return this._http.put(`http://localhost:5000/api/users/updateuser/${id}`, data);
  }

  getUsers(): Observable<any> {
    return this._http.get('http://localhost:5000/api/users/getusers');
  }

  deleteUsers(id: string): Observable<any> {
    return this._http.delete(`http://localhost:5000/api/users/deleteuser/${id}`);
  }
}
