import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(credentials) {
    return this.httpClient.post('/api/authenticate', JSON.stringify(credentials))
      .pipe(map((response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          return true;
        }
        return false;
      }));
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    // tslint:disable-next-line: prefer-const
    let jwtHelperService = new JwtHelperService();
    // tslint:disable-next-line: prefer-const
    let token = localStorage.getItem('token');
    return !jwtHelperService.isTokenExpired(token);
  }

  get currentUser() {
    // tslint:disable-next-line: prefer-const
    let token = localStorage.getItem('token');

    if (!token) { return null; }

    return new JwtHelperService().decodeToken(token);
  }
}
