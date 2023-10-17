import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private BACK_URL = environment.BACK_URL

  constructor(private _http: HttpClient) { }

  register(data: any): Observable<any> {
    return this._http.post(`${this.BACK_URL}/users/register`, data);
  }

}
