import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private secretKey = 'r6R1BcaF9WQIAO48gfz8kx50zTl670Z3'; 

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private jwtHelper: JwtHelperService) {}

  setToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  removeToken() {
    localStorage.removeItem('accessToken');
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.getToken();
      return token != null && !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }

  generateToken(email: string): string {
    const header = {
      alg: "HS256",
      typ: "JWT",
    };

    const payload = {
      email: email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    };

    const encodedHeader = this.base64UrlEncode(JSON.stringify(header));
    const encodedPayload = this.base64UrlEncode(JSON.stringify(payload));
    const signature = this.sign(encodedHeader, encodedPayload);

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }

  private base64UrlEncode(str: string): string {
    return btoa(str)
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

  private sign(header: string, payload: string): string {
    return this.base64UrlEncode(header + '.' + payload + this.secretKey);
  }
}
