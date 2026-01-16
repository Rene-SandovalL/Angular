import { Component, computed, signal } from '@angular/core';
import { resetConsumerBeforeComputation } from '@angular/core/primitives/signals';
import { RouterOutlet } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CurrencyPipe
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('practica2');

  // interpolacion
  nombre: string = "Rene Francisco";

  //Señales
  edad = signal<number>(40);
  email = signal<string>("renefs127@gmail.com");
  sueldos = signal<number[]>([1700, 1600, 1900, 2000]);

  articulos = signal([
    { codigo: 1, descripcion: 'naranjas', precio: 540 },
    { codigo: 2, descripcion: 'manzanas', precio: 900 },
    { codigo: 3, descripcion: 'Peras', precio: 490 },
  ]);

  contador = signal<number>(1);
  numeroAleatorio = signal<number>(this.generarNumero());
  nombreSignal = signal<string>('');

  //Bien hecho
  sumaSueldosComputed = computed(() => {
    console.log("Suma sueldos computed");
    return this.sueldos().reduce((total, sueldo) => total + sueldo, 0);
  });

  /*
  Mal hecho
  sumaSueldos(): number {
    let suma : number = 0;
    for(let x=0; x < this.sueldos().length; x++){
      suma += this.sueldos()[x];
    }
    console.log(suma);
    return suma;
  }
  */
  test(){
    console.log("Test");
  }

  generarNumero(): number {
    return Math.floor(Math.random() * 3) + 1;
  }

  actualizarNumeroAleatorio(): void {
    this.numeroAleatorio.set(this.generarNumero());
  }

  incrementar(): void {
    this.contador.update( valorActual => valorActual + 1 );
  }

  decrementar(): void {
    this.contador.update( valorActual => valorActual - 1 );
  }

  fijarNombre1(){
    this.nombreSignal.set("Rene");
  }

  fijarNombre2(){
    this.nombreSignal.set("Shalking");
  }


}

