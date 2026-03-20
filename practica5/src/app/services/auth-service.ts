import { HttpClient } from '@angular/common/http';
import { Injectable, signal, computed, inject } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface SessionUser {
  id: number,
  name: string,
  email: string,
}

interface LoginResponse {
  token: string;
  user: SessionUser;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);



    private readonly storageKey = 'session_user';
    private readonly loginURL = `${environment.apiUrl}/auth/login`;


  private readonly _currentUser = signal<SessionUser | null>(this.readFromStorage());
  readonly currentUser = computed(() => this._currentUser());
  readonly isAuthenticated = computed(() => this._currentUser() !== null);


  login(email: string, password: string) : Observable<SessionUser> {
      return this.http.post<LoginResponse>(this.loginURL, { email, password }).pipe(
        tap((response) => {
          localStorage.setItem(this.storageKey, response.token);
          this._currentUser.set(response.user);
        }),
        map((response) => response.user)
      );
    }

  readFromStorage(): SessionUser | null {
    const user = localStorage.getItem(this.storageKey);
    if (!user) return null;

    try {
      return JSON.parse(user) as SessionUser;
    }catch {
      localStorage.removeItem(this.storageKey);
      return null;
    }
  }

  logout(): void {
    this._currentUser.set(null);
    localStorage.removeItem(this.storageKey);
  }
}
