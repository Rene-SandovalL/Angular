import { Component } from '@angular/core';

@Component({
  selector: 'app-calificacion',
  imports: [],
  templateUrl: './calificacion.html',
  styleUrl: './calificacion.scss',
})
export class Calificacion {

  verificarCalificacion(calificacion: number): string {
    return calificacion <= 6 ? 'red' : 'black';
  }

}
