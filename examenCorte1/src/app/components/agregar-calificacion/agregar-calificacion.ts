import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-calificacion',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './agregar-calificacion.html',
  styleUrl: './agregar-calificacion.scss',
})
export class AgregarCalificacion {
  formularioCalificacion : FormGroup;
  alumnoNuevo = output<any>();
  alumnoActualizado = output<{index: number, alumno: any}>();

  // Variables para controlar el modo edición
  modoEdicion = false;
  indiceAlumnoEditando: number | null = null;

  private formBuilder = inject(FormBuilder);

  constructor() {
    this.formularioCalificacion = this.formBuilder.group({
      matricula: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      nombre: ['', [Validators.required]],
      corte1: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      corte2: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      corte3: [0, [Validators.required, Validators.min(0), Validators.max(10)]]
    });
  }

  SeleccionarAlumno(alumno: any, index: number) {
    this.modoEdicion = true;
    this.indiceAlumnoEditando = index;

    this.formularioCalificacion.patchValue({
      matricula: alumno.matricula,
      nombre: alumno.nombre,
      corte1: alumno.corte1,
      corte2: alumno.corte2,
      corte3: alumno.corte3
    });
  }

  limpiarFormulario() {
    this.modoEdicion = false;
    this.indiceAlumnoEditando = null;

    this.formularioCalificacion.reset({
      matricula: '',
      nombre: '',
      corte1: 0,
      corte2: 0,
      corte3: 0
    });
  }

  submit(){
    if(this.formularioCalificacion.valid){
      if(this.modoEdicion && this.indiceAlumnoEditando !== null){
        // Está editando un alumno existente
        this.alumnoActualizado.emit({
          index: this.indiceAlumnoEditando,
          alumno: this.formularioCalificacion.value
        });
      } else {
        // Está agregando un alumno nuevo
        this.alumnoNuevo.emit(this.formularioCalificacion.value);
      }
      this.limpiarFormulario();
    }
  }
}
