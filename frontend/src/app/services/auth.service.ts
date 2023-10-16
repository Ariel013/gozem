import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

interface JwtPayload {
  exp: number; // Ajoutez d'autres champs si nécessaire
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor() { }

  private tokenKey = 'token';

  getToken(): string | null {

    return localStorage.getItem(this.tokenKey);
  }

  logout() {
    const token = this.getToken();
    if (token) {
      const tokverif = jwt_decode<JwtPayload>(token);
      localStorage.removeItem(this.tokenKey);

    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (token) {
      const tokverif = jwt_decode<JwtPayload>(token);

      // Verifions si le token est expiré
      return tokverif && tokverif.exp * 1000 > Date.now();
    }
    return false;
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      const tokenRole = jwt_decode(token) as { role: string }
      return tokenRole.role
    }
    return null
  }

}
