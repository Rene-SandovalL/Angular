import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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

  SeleccionarAlumno(alumno: any) {
    this.formularioCalificacion.patchValue({
      matricula: alumno.matricula,
      nombre: alumno.nombre,
      corte1: alumno.corte1,
      corte2: alumno.corte2,
      corte3: alumno.corte3
    });
  }

  limpiarFormulario() {
    this.formularioCalificacion.reset({
      matricula: '',
      nombre: '',
      corte1: 0,
      corte2: 0,
      corte3: 0
    });
  }

  actualizarAlumno(){

  }

  submit(){
    if(this.formularioCalificacion.valid){
      this.alumnoNuevo.emit(this.formularioCalificacion.value);
      this.limpiarFormulario();
    }
  }
}
