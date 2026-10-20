
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface SmartDropUser {
  id?: number;
  email: string;
  password?: string;
  fullName: string;
  isAdmin?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly apiUrl = '';

  private readonly accessTokenKey = 'smartdrop-access-token';
  private readonly currentUserKey = 'smartdrop-current-user-v2';
  private readonly pendingChallengeKey = 'smartdrop-pending-2fa-challenge';
  private readonly defaultEmail = 'smartdrop@gmail.com';

  constructor(private http: HttpClient) {}

  register(email: string, password: string, fullName = ''): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/iam/auth/register`, {
      email,
      password,
      fullName,
    });
  }

  login(
    email: string,
    password: string
  ): Observable<boolean | { requires2FA: true }> {
    this.logout();

    return this.http.post<any>(
      `${this.apiUrl}/api/iam/auth/login`,
      { email, password }
    ).pipe(
      map((res) => {
        if (res?.requires2FA) {
          if (!res.challengeId) {
            return false;
          }

          sessionStorage.setItem(
            this.pendingChallengeKey,
            String(res.challengeId)
          );

          return { requires2FA: true as const };
        }

        return this.saveSession(res);
      }),
      catchError(() => of(false))
    );
  }

  verify2FA(code: string): Observable<boolean> {
    const challengeId = sessionStorage.getItem(this.pendingChallengeKey);

    if (!challengeId) {
      return of(false);
    }

    return this.http.post<any>(
      `${this.apiUrl}/api/iam/auth/2fa/verify`,
      { challengeId, code }
    ).pipe(
      map((res) => this.saveSession(res))
    );
  }

  hasPendingTwoFactorChallenge(): boolean {
    return !!sessionStorage.getItem(this.pendingChallengeKey);
  }

  private saveSession(res: any): boolean {
    if (
      !res?.accessToken ||
      res?.userId == null ||
      !res?.email
    ) {
      return false;
    }

    const user: SmartDropUser = {
      id: res.userId,
      email: res.email,
      fullName: res.fullName || '',
      isAdmin: false,
    };

    sessionStorage.setItem(this.accessTokenKey, res.accessToken);
    sessionStorage.setItem(this.currentUserKey, JSON.stringify(user));
    sessionStorage.removeItem(this.pendingChallengeKey);

    return true;
  }

  getAccessToken(): string | null {
    return sessionStorage.getItem(this.accessTokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    const savedUser = sessionStorage.getItem(this.currentUserKey);

    if (!token || !savedUser) {
      return false;
    }

    try {
      const encodedPayload = token.split('.')[1];

      if (!encodedPayload) {
        return false;
      }

      const base64 = encodedPayload
        .replace(/-/g, '+')
        .replace(/_/g, '/');

      const payload = JSON.parse(atob(base64));

      return (
        typeof payload.exp === 'number' &&
        payload.exp * 1000 > Date.now()
      );
    } catch {
      return false;
    }
  }

  logout(): void {
    sessionStorage.removeItem(this.accessTokenKey);
    sessionStorage.removeItem(this.currentUserKey);
    sessionStorage.removeItem(this.pendingChallengeKey);

    // Eliminar sesiones antiguas del frontend.
    localStorage.removeItem(this.currentUserKey);
  }

  getCurrentUser(): SmartDropUser {
    const emptyUser: SmartDropUser = {
      email: '',
      fullName: '',
      isAdmin: false,
    };

    if (!this.isAuthenticated()) {
      return emptyUser;
    }

    const saved = sessionStorage.getItem(this.currentUserKey);

    if (!saved) {
      return emptyUser;
    }

    try {
      return JSON.parse(saved) as SmartDropUser;
    } catch {
      return emptyUser;
    }
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/iam/auth/forgot-password`,
      { email }
    );
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/iam/auth/reset-password`,
      { token, newPassword }
    );
  }

  enable2FA(email: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/iam/auth/2fa/enable`,
      { email }
    );
  }

  isDefaultUser(): boolean {
    return this.getCurrentUser().email === this.defaultEmail;
  }

  getStorageKey(area: string): string {
    const email = this.getCurrentUser().email
      .replace(/[^a-z0-9]+/gi, '-')
      .toLowerCase();

    return `smartdrop-${area}-${email}-v4`;
  }
}
