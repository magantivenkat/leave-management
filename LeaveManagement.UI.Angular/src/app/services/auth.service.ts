import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'https://localhost:55082/api/auth';
  private jwt = new JwtHelperService();

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(`${this.api}/login`, { username, password })
      .pipe(tap(res => localStorage.setItem('token', res.token)));
  }

  register(user: { username: string; email: string; fullName: string; password: string; }) {
    return this.http.post(`${this.api}/register`, user);
  }

  get token() { return localStorage.getItem('token'); }
  get isLoggedIn() {
    const token = this.token;
    return token ? !this.jwt.isTokenExpired(token) : false;
  }
  get role(): string | null {
    const token = this.token;
    if (!token) return null;
    const decoded = this.jwt.decodeToken(token) as any;

    // .NET uses this URI for the role claim:
    const dotNetRole = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    // some JWT libraries also map it to a simple 'role' property:
    const simpleRole = decoded['role'];

    return (simpleRole ?? dotNetRole) || null;
  }

  private get decodedToken() {
    const token = localStorage.getItem('token');
    return token ? this.jwt.decodeToken(token) : null;
  }

  /** The user's username (sub claim) */
  get username(): string | null {
    return this.decodedToken?.sub ?? null;
  }

  /** The user's numeric ID (nameid claim) */
  // get userId(): number | null {
  //   const token = this.decodedToken;
  //   const idClaim = token?.[
  //     'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
  //   ];
  //   return idClaim ? +idClaim : null;
  // }

  get userId(): number | null {
    const id = this.decodedToken?.userId;
    return id ? +id : null;
  }

}