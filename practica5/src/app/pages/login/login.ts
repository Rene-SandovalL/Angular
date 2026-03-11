import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  valido = signal(true);

  showPassword = signal(false);

  togglePassword() {
    this.showPassword.update(v => !v);
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsDirty();
      return;
    }

    const { email, password } = this.loginForm.getRawValue();
    const valido = this.auth.login(email!, password!);

    if (valido) {
      this.router.navigate(['/home']);
    }else this.valido.set(false);
  }



}
