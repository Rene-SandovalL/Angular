import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UsersService } from '../../services/users-service';

export interface UserRow {
  id: number;
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-usuarios',
  templateUrl: 'usuarios.html',
  styleUrl: 'usuarios.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Usuarios implements OnInit {
  private readonly usersService = inject(UsersService);
  private readonly cdr = inject(ChangeDetectorRef);
  displayedColumns: string[] = ['name', 'email', 'password', 'actions'];
  users: UserRow[] = [];
  form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });
  editingUserId: number | null = null;
  ngOnInit(): void {
    this.loadUsers();
  }

  get isEditing(): boolean {
    return this.editingUserId !== null;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    if (this.editingUserId !== null) {
      const currentId = this.editingUserId;
      this.usersService.updateUser(currentId, value).subscribe({
        next: (updated) => {
          this.users = this.users.map((user) =>
            user.id === currentId ? { ...updated, password: '' } : user,
          );
          this.resetForm();
          this.cdr.markForCheck();
        },
      });
    } else {
      this.usersService.createUser(value).subscribe({
        next: (created) => {
          this.users = [{ ...created, password: '' }, ...this.users];
          this.resetForm();
          this.cdr.markForCheck();
        },
      });
    }
  }

  edit(user: UserRow): void {
    this.editingUserId = user.id;
    this.form.setValue({
      name: user.name,
      email: user.email,
      password: '',
    });
  }

  remove(user: UserRow): void {
    this.usersService.deleteUser(user.id).subscribe({
      next: () => {
        this.users = this.users.filter((item) => item.id !== user.id);
        if (this.editingUserId === user.id) {
          this.resetForm();
        }
        this.cdr.markForCheck();
      },
    });
  }

  resetForm(): void {
    this.editingUserId = null;
    this.form.reset({ name: '', email: '', password: '' });
  }

  private loadUsers(): void {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users.map((user) => ({ ...user, password: '' }));
        this.cdr.markForCheck();
      },
    });
  }

  maskPassword(password: string): string {
    return '*'.repeat(Math.max(password.length, 6));
  }

  trackById(_: number, user: UserRow): number {
    return user.id;
  }
}
