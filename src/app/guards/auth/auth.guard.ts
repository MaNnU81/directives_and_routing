import { Inject, inject } from '@angular/core';
import { CanActivateFn, createUrlTreeFromSnapshot, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authServ = inject(AuthService);
  const router = Inject(Router);

  if (authServ.isAuth) {
    console.log('tu sei il benvenuto');
    
    return true;
  } else {
    console.log('tu non puoi passare');
    
    return router.createUrlTree(['/login'])
  }
  

}
