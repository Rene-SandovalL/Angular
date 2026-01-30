import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario3-page',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './formulario3-page.html',
  styleUrl: './formulario3-page.scss',
})
export class Formulario3Page {
  formularioContacto : FormGroup;

  private fb = inject(FormBuilder);

  resultado = signal<string>('');

  constructor() {
    this.formularioContacto = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      mail: ['',[Validators.required, Validators.email]],
      mensajes: ['', [Validators.required, Validators.maxLength(20)]]
    })
  }

  submit() {
    this.resultado.set(
      this.formularioContacto.valid
        ? 'Todos los datos son validos'
        : 'Hay datos invalidos en el formulario'
    );
  }
}
