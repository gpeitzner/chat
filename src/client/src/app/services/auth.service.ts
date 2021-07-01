import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_URL: string = environment.apiUrl + "users";
  user: any;

  constructor(private http: HttpClient) {}

  login(nickname: string, password: string): Observable<User> {
    return this.http.post<User>(this.API_URL, {
      nickname: nickname,
      password: password,
    });
  }
}
