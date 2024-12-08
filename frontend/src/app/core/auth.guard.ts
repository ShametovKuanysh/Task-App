import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
    if (inject(AuthService).hasValidToken()) {
        return true;
    } else {
        inject(Router).navigate(['/auth/login']);
        return false;
    }
};
  