import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../../model/student';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth = false;
  private readonly API_URL = 'https://68109e0327f2fdac2412156d.mockapi.io/users/';

  constructor(private http: HttpClient) {}

  checkCredentials(email: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.API_URL}?email=${email}`).pipe(
      map(users => {
        if (users.length === 0) return false;
        const userExists = users.some(user => user.password === password);
        this.isAuth = userExists; // Aggiorna lo stato
        return userExists;
      })
    );
  }

  addUser(userData: User): Observable<any> {
    return this.http.post(this.API_URL, userData);
  }
}
