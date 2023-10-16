import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service'

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.authService.getToken();

    if (token && this.authService.isAuthenticated()) {
      const userRole = this.authService.getUserRole()

      if (userRole === 'admin') {
        return true
      }
      this.router.navigate(['/error'])
      return false
    } else {
      this.router.navigate(['/error']) //token expiré
      return false
    }
  }
}
