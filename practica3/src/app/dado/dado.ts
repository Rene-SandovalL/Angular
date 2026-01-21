import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-dado',
  imports: [],
  templateUrl: './dado.html',
  styleUrl: './dado.scss',
})
export class Dado {
  valor = signal<number>(Math.floor(Math.random() * 6) + 1);

  //Forma antigua de los inputs: @Input() color = black; con mayuscula usa señales y con minuscula no w

  color = input<string>('black');
  color_letra = input<string>('white');



}
