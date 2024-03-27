import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      const role = this.authService.getRole();
      console.log('Current role:', role); 
      console.log('Requested URL:', state.url); 

      if (role === 'personnel' && state.url.startsWith('/enregistrer-entreprise')) {
        return true;
      } else if ((role === 'admin' && state.url.startsWith('/dashboard')) || (role === 'admin' && state.url.startsWith('/entreprises') || (role === 'admin' && state.url.startsWith('/nomenclature')) || (role === 'admin' && state.url.startsWith('/classification')) || (role === 'admin' && state.url.startsWith('/personnels')) || (role === 'admin' && state.url.startsWith('/admins')))) {
        return true; 
      } else {
        console.log('Redirecting to login');
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      console.log('User not logged in, redirecting to login'); 
      localStorage.setItem('redirectUrl', state.url);
      this.router.navigate(['/login']);
      return false;
    }
  }
}


