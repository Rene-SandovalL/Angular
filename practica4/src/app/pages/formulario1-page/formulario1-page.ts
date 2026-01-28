import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario1-page',
  imports: [
    FormsModule
  ],
  templateUrl: './formulario1-page.html',
  styleUrl: './formulario1-page.scss',
})
export class Formulario1Page {
  nombre = signal<string>('');
  apellido: string = '';

}


