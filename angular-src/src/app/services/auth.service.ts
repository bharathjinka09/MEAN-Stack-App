import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) {}

  registerUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post('users/register', user, {
        headers: headers,
      })
      .pipe(map((res) => res));
  }

  authenticateUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post('users/authenticate', user, {
        headers: headers,
      })
      .pipe(map((res) => res));
  }

  // getProfile(): any {
  //   this.loadToken();
  //   let headers = new HttpHeaders()
  //     .append('Authorization', this.authToken)
  //     .append('Content-Type', 'application/json');
  //   return this.http.get('users/profile', {
  //     headers: headers,
  //   });
  // }

  getProfile() {
    let url = 'users/profile';
    this.loadToken();
    const headers = { Authorization: this.authToken };
    return this.http.get(url, { headers });
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    return this.authToken;
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.authToken = token;
    this.user = user;
  }

  loggedIn() {
    if (this.authToken != null) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.removeItem('id_token');
    localStorage.removeItem('user');
  }
}
