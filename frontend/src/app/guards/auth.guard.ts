import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.authService.getToken();
    if (token) {
      if (this.authService.isAuthenticated()) {
        return true
      } else {
        this.router.navigate(['/login']) //token expiré
        return false
      }
    }
    // Aucun token n'est présent
    this.router.navigate(['/login']);
    return false;
  }
}
