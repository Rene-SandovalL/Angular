import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  mockUser : any[] = [
    {id: 1, name: 'Jose', email: 'admin@upsin.edu.mx', password: 'admin123'},
    {id: 2, name: 'Maria', email: 'maria@upsin.edu.mx', password: 'maria123'},
  ]

  login(email: string, password: string) : boolean {
    const existe = this.mockUser.find(
      u=> u.email.toLowerCase() === email.toLowerCase().trim() &&
      u.password.toLowerCase() === password.toLowerCase().trim()
    );
    return (!existe) ? false : true;
  }
}
