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
import {
  Alumno,
  AlumnoCarrera,
  AlumnosService,
  AlumnoResumenIaResponse,
} from '../../services/alumnos-service';

interface AlumnoRow {
  id: number;
  name: string;
  matricula: string;
  carrera: AlumnoCarrera;
  semestre: number;
  correo: string;
}

@Component({
  selector: 'app-alumnos',
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
  templateUrl: './alumnos.html',
  styleUrl: './alumnos.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Alumnos implements OnInit {
  private readonly alumnosService = inject(AlumnosService);
  private readonly cdr = inject(ChangeDetectorRef);

  displayedColumns: string[] = ['name', 'matricula', 'carrera', 'semestre', 'correo', 'actions'];
  alumnos: AlumnoRow[] = [];
  readonly carreraOptions: AlumnoCarrera[] = [
    'Tecnologias_de_la_informacion',
    'Mecatronica',
    'Biotecnologia',
    'Energia',
    'Animacion_y_efectos_visuales',
    'Terapia_fisica',
  ];

  form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    matricula: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6), Validators.maxLength(12)],
    }),
    carrera: new FormControl<AlumnoCarrera | ''>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    semestre: new FormControl(1, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1), Validators.max(12)],
    }),
    correo: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  });

  editingAlumnoId: number | null = null;
  resumenIa: AlumnoResumenIaResponse | null = null;
  resumenIaAlumnoId: number | null = null;
  resumenIaError = '';

  ngOnInit(): void {
    this.loadAlumnos();
  }

  get isEditing(): boolean {
    return this.editingAlumnoId !== null;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const payload = {
      ...value,
      carrera: value.carrera as AlumnoCarrera,
    };

    if (this.editingAlumnoId !== null) {
      const currentId = this.editingAlumnoId;
      this.alumnosService.updateAlumno(currentId, payload).subscribe({
        next: (updated) => {
          this.alumnos = this.alumnos.map((alumno) =>
            alumno.id === currentId ? this.toRow(updated) : alumno,
          );
          this.resetForm();
          this.cdr.markForCheck();
        },
      });
      return;
    }

    this.alumnosService.createAlumno(payload).subscribe({
      next: (created) => {
        this.alumnos = [this.toRow(created), ...this.alumnos];
        this.resetForm();
        this.cdr.markForCheck();
      },
    });
  }

  edit(alumno: AlumnoRow): void {
    this.editingAlumnoId = alumno.id;
    this.form.setValue({
      name: alumno.name,
      matricula: alumno.matricula,
      carrera: alumno.carrera,
      semestre: alumno.semestre,
      correo: alumno.correo,
    });
  }

  remove(alumno: AlumnoRow): void {
    this.alumnosService.deleteAlumno(alumno.id).subscribe({
      next: () => {
        this.alumnos = this.alumnos.filter((item) => item.id !== alumno.id);
        if (this.editingAlumnoId === alumno.id) {
          this.resetForm();
        }
        if (this.resumenIa?.alumno.id === alumno.id) {
          this.resumenIa = null;
          this.resumenIaError = '';
          this.resumenIaAlumnoId = null;
        }
        this.cdr.markForCheck();
      },
    });
  }

  generateSummary(alumno: AlumnoRow): void {
    this.resumenIaAlumnoId = alumno.id;
    this.resumenIaError = '';

    this.alumnosService.generarResumenAlumno(alumno.id).subscribe({
      next: (response) => {
        this.resumenIa = response;
        this.resumenIaAlumnoId = null;
        this.cdr.markForCheck();
      },
      error: (error) => {
        this.resumenIa = null;
        this.resumenIaAlumnoId = null;
        this.resumenIaError = error?.error?.message || 'No se pudo generar el resumen.';
        this.cdr.markForCheck();
      },
    });
  }

  resetForm(): void {
    this.editingAlumnoId = null;
    this.form.reset({
      name: '',
      matricula: '',
      carrera: '',
      semestre: 1,
      correo: '',
    });
  }

  carreraLabel(carrera: AlumnoCarrera): string {
    return carrera.replaceAll('_', ' ');
  }

  trackById(_: number, alumno: AlumnoRow): number {
    return alumno.id;
  }

  private loadAlumnos(): void {
    this.alumnosService.getAlumnos().subscribe({
      next: (alumnos) => {
        this.alumnos = alumnos.map((alumno) => this.toRow(alumno));
        this.cdr.markForCheck();
      },
    });
  }

  private toRow(alumno: Alumno): AlumnoRow {
    return {
      id: alumno.id,
      name: alumno.name,
      matricula: alumno.matricula,
      carrera: alumno.carrera,
      semestre: alumno.semestre,
      correo: alumno.correo,
    };
  }

}
