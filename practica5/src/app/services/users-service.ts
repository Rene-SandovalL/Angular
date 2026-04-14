import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserCreatePayload {
  name: string;
  email: string;
  password: string;
}

export interface UserUpdatePayload {
  name?: string;
  email?: string;
  password?: string;
}

interface CreateUserResponse {
  message: string;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  private readonly usersUrl = `${environment.apiUrl}/api/users`;

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  createUser(payload: UserCreatePayload): Observable<User> {
    return this.http.post<CreateUserResponse>(this.usersUrl, payload).pipe(
      map((response) => response.user),
    );
  }

  updateUser(id: number, payload: UserUpdatePayload): Observable<User> {
    return this.http.patch<User>(`${this.usersUrl}/${id}`, payload);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.usersUrl}/${id}`);
  }
}
