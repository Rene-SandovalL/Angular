import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  mockUser : any[] = [
    {id: 1, name: 'Jose', email: 'admin@upsin.edu.mx', password: 'admin123'},
    {id: 2, name: 'Maria', email: 'maria@upsin.edu.mx', password: 'maria123'},
  ]

  login(email: string, password: string) : boolean {
    const existe = this.mockUser.find(
      u=> u.email.toLowerCase() === email.toLowerCase().trim() &&
      u.password.toLowerCase() === password.toLowerCase().trim()
    );
    this.isAuthenticated = !!existe;
    return this.isAuthenticated;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  logout(): void {
    this.isAuthenticated = false;
  }
}
