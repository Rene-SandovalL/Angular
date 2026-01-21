import { Component, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Dado } from './dado/dado';
import { Cronometro } from './cronometro/cronometro';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Dado, Cronometro],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('practica3');

  mensaje = signal<string>('');

  //Te permite acceder a los metodos y propiedades del componente hijo como las instancias de clases en javita pero nomas jala con los hijos
  // de un mismo componente asi que se parece mas a un tipo de herencia simplificada
  @ViewChild('cronometro') Cronometro!: Cronometro;

  actualizar(tiempo: number) {
    this.mensaje.set(tiempo + ' (se actualizar cada 10 segundos)');
  }

  reiniciar() {
    this.Cronometro.reiniciar();
  }
}
