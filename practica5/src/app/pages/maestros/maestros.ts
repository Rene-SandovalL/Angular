import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Maestro, MaestroDepartamento, MaestrosService } from '../../services/maestros-service';

interface MaestroRow {
  id: number;
  name: string;
  telefono: string;
  email: string;
  departamento: MaestroDepartamento | null;
}

@Component({
  selector: 'app-maestros',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
  ],
  templateUrl: './maestros.html',
  styleUrl: './maestros.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Maestros implements OnInit {
  private readonly maestrosService = inject(MaestrosService);
  private readonly cdr = inject(ChangeDetectorRef);

  displayedColumns: string[] = ['name', 'telefono', 'email', 'departamento', 'actions'];
  maestros: MaestroRow[] = [];
  readonly departamentos: MaestroDepartamento[] = ['programacion', 'base_de_datos', 'dise_o'];

  form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    telefono: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8), Validators.maxLength(12)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    departamento: new FormControl<MaestroDepartamento | ''>('', {
      nonNullable: true,
    }),
  });

  editingMaestroId: number | null = null;

  ngOnInit(): void {
    this.loadMaestros();
  }

  get isEditing(): boolean {
    return this.editingMaestroId !== null;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const payload = {
      name: value.name,
      telefono: value.telefono,
      email: value.email,
      departamento: value.departamento === '' ? null : value.departamento,
    };

    if (this.editingMaestroId !== null) {
      const currentId = this.editingMaestroId;
      this.maestrosService.updateMaestro(currentId, payload).subscribe({
        next: (updated) => {
          this.maestros = this.maestros.map((maestro) =>
            maestro.id === currentId ? this.toRow(updated) : maestro,
          );
          this.resetForm();
          this.cdr.markForCheck();
        },
      });
      return;
    }

    this.maestrosService.createMaestro(payload).subscribe({
      next: (created) => {
        this.maestros = [this.toRow(created), ...this.maestros];
        this.resetForm();
        this.cdr.markForCheck();
      },
    });
  }

  edit(maestro: MaestroRow): void {
    this.editingMaestroId = maestro.id;
    this.form.setValue({
      name: maestro.name,
      telefono: maestro.telefono,
      email: maestro.email,
      departamento: maestro.departamento ?? '',
    });
  }

  remove(maestro: MaestroRow): void {
    this.maestrosService.deleteMaestro(maestro.id).subscribe({
      next: () => {
        this.maestros = this.maestros.filter((item) => item.id !== maestro.id);
        if (this.editingMaestroId === maestro.id) {
          this.resetForm();
        }
        this.cdr.markForCheck();
      },
    });
  }

  resetForm(): void {
    this.editingMaestroId = null;
    this.form.reset({
      name: '',
      telefono: '',
      email: '',
      departamento: '',
    });
  }

  departamentoLabel(departamento: MaestroDepartamento | null): string {
    if (!departamento) {
      return 'Sin departamento';
    }
    return departamento.replaceAll('_', ' ');
  }

  trackById(_: number, maestro: MaestroRow): number {
    return maestro.id;
  }

  private loadMaestros(): void {
    this.maestrosService.getMaestros().subscribe({
      next: (maestros) => {
        this.maestros = maestros.map((maestro) => this.toRow(maestro));
        this.cdr.markForCheck();
      },
    });
  }

  private toRow(maestro: Maestro): MaestroRow {
    return {
      id: maestro.id,
      name: maestro.name,
      telefono: maestro.telefono,
      email: maestro.email,
      departamento: maestro.departamento,
    };
  }

}
