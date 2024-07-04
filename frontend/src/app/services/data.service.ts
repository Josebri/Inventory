import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'http://localhost:3000'; // Asegúrate de que la URL base esté correcta

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const url = `${this.baseUrl}/login`;
    const body = { usernameOrEmail: username, password: password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, body, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  register(userData: any) {
    const url = `${this.baseUrl}/register`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, userData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(error.message || error);
  }
}
