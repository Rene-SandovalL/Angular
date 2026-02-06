import { Component, signal, viewChild } from '@angular/core';
import { AgregarCalificacion } from "../../components/agregar-calificacion/agregar-calificacion";

@Component({
  selector: 'app-calificaciones',
  imports: [AgregarCalificacion
  ],
  templateUrl: './calificaciones.html',
  styleUrl: './calificaciones.scss',
})
export class Calificaciones {
  alumnos = signal([
    { matricula: '2021001', nombre: 'Diego', corte1: 8.5, corte2: 9.0, corte3: 7.5 },
  ]);

  tablaCalificaciones = viewChild.required(AgregarCalificacion);

  agregarAlumno(alumno: any) {
    this.alumnos.update(alumnos => [...alumnos, alumno]);
  }

  eliminarAlumno(id: number) {
    this.alumnos.update(alumnos => alumnos.filter((_, i) => i !== id));
  }

  modificarAlumno(index: number, alumno: any) {
    this.alumnos.update(alumnos => {
      const nuevosAlumnos = [...alumnos];
      nuevosAlumnos[index] = alumno;
      return nuevosAlumnos;
    });
  }

  seleccionarAlumno(index: number) {
    const alumno = this.alumnos()[index];
    this.tablaCalificaciones().SeleccionarAlumno(alumno);
  }
}
