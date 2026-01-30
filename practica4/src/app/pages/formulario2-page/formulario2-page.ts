import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario2-page',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './formulario2-page.html',
  styleUrl: './formulario2-page.scss',
})
export class Formulario2Page {
  datoa = signal<string> ('');

  formularioContacto = new FormGroup({
    nombre: new FormControl('',[Validators.required, Validators.minLength(10)]),
    sexo: new FormControl(''),
    mail: new FormControl('', [Validators.email, Validators.required]),
    pais: new FormControl(''),

    pasatiempos: new FormGroup({
      Leer: new FormControl(false),
      Deportes: new FormControl(false),
      Musica: new FormControl(false),
      Videojuegos: new FormControl(false),
      Bailar: new FormControl(false),
    }),

    mensaje: new FormControl('',[Validators.required, Validators.maxLength(20)]),
  });

  sumbit(){
    if(this.formularioContacto.invalid){
      this.datoa.set('Formulario inválido. Por favor, complete los campos requeridos.');
      return;
    }

    let pasatiemposSeleccionados = [];
    const p = this.formularioContacto.value.pasatiempos;

    if (p?.Leer) pasatiemposSeleccionados.push('Leer');
    if (p?.Deportes) pasatiemposSeleccionados.push('Deportes');
    if (p?.Musica) pasatiemposSeleccionados.push('Música');
    if (p?.Videojuegos) pasatiemposSeleccionados.push('Videojuegos');
    if (p?.Bailar) pasatiemposSeleccionados.push('Bailar');



    this.datoa.set(
      `
      Nombre: ${this.formularioContacto.value.nombre},
      Sexo: ${this.formularioContacto.value.sexo},
      Mail: ${this.formularioContacto.value.mail},
      pais: ${this.formularioContacto.value.pais},
      Pasatiempos: ${pasatiemposSeleccionados.join(' ') || 'Ninguno'},
      Mensaje: ${this.formularioContacto.value.mensaje}

      `
    );
  }
}
