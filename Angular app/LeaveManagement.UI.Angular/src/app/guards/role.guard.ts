import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRoles = route.data['roles'] as string[];
    const role = this.auth.role;

    // Not logged in or missing/invalid role
    if (!this.auth.isLoggedIn || !role || !expectedRoles.includes(role)) {
      // If they tried to land on the "team" page as a normal User, clear the token
      if (route.routeConfig?.path === 'team') {
        localStorage.removeItem('token');
      }
      // Redirect to home or login
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
