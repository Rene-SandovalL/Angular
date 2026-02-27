import { MatToolbarModule } from '@angular/material/toolbar';
import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly auth = inject(AuthService);

  iniciales = signal<string>(this.auth.currentUser()?.name?.toLocaleUpperCase()?.substr(0, 2) || '');


}

