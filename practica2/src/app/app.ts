import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
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

}

