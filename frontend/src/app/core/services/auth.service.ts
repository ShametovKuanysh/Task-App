import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/v1/users`
  private readonly TOKEN_KEY = 'authToken';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasValidToken());
  private tokenExpirationTimer: any = null;


  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  hasValidToken(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) return false;

    const expirationDate = this.getTokenExpiration(token);
    return expirationDate ? expirationDate > new Date().getTime() : false;
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          this.setToken(response.token);
          this.isLoggedInSubject.next(true);
          this.setLogoutTimer(response.token);
        }
      })
    );
  }

  register(userData: { username: string, email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  logout(): void {
    this.removeToken();
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  private getTokenExpiration(token: string): number | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp ? payload.exp * 1000 : null;
    } catch (error) {
      return null;
    }
  }

  private setLogoutTimer(token: string): void {
    const expirationTime = this.getTokenExpiration(token);
    if (!expirationTime) return;

    const timeout = expirationTime - new Date().getTime();
    if (timeout > 0) {
      this.tokenExpirationTimer = setTimeout(() => {
        this.logout();
      }, timeout);
    }
  }
}

