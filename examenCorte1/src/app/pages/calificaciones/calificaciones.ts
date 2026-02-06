import { Component, signal, viewChild } from '@angular/core';
import { AgregarCalificacion } from "../../components/agregar-calificacion/agregar-calificacion";
import { Calificacion } from '../../components/calificacion/calificacion';

@Component({
  selector: 'app-calificaciones',
  imports: [AgregarCalificacion
  ],
  templateUrl: './calificaciones.html',
  styleUrl: './calificaciones.scss',
})
export class Calificaciones {

  calificacion = new Calificacion();

  alumnos = signal([
    { matricula: '2021001', nombre: 'Fregoso', corte1: 8.5, corte2: 9.0, corte3: 7.5 },
  ]);

  tablaCalificaciones = viewChild.required(AgregarCalificacion);

  agregarAlumno(alumno: any) {
    this.alumnos.update(alumnos => [...alumnos, alumno]);
  }

  actualizarAlumno(datos: {index: number, alumno: any}) {
    this.alumnos.update(alumnos => {
      const nuevosAlumnos = [...alumnos];
      nuevosAlumnos[datos.index] = datos.alumno;
      return nuevosAlumnos;
    });
  }

  eliminarAlumno(id: number) {
    this.alumnos.update(alumnos => alumnos.filter((_, i) => i !== id));
  }

  seleccionarAlumno(index: number) {
    const alumno = this.alumnos()[index];
    this.tablaCalificaciones().SeleccionarAlumno(alumno, index);
  }
}
