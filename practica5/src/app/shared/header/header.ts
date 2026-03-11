import { MatToolbarModule } from '@angular/material/toolbar';
import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  iniciales = signal<string>(
    this.auth.currentUser()?.name?.toLocaleUpperCase()?.substr(0, 2) || '',
  );

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
