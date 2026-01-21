import { Component, signal, input, output, OnInit} from '@angular/core';

@Component({
  selector: 'app-cronometro',
  imports: [],
  templateUrl: './cronometro.html',
  styleUrl: './cronometro.scss',
})
export class Cronometro implements OnInit {

  ngOnInit(): void {
    this.segundo.set(this.inicio());
    setInterval(() => {
      this.segundo.update(t => t + 1);

      const valor = this.segundo();
      if (valor % 10 === 0) {
        this.multiplo10.emit(valor);
      }
    }, 1000);
  }

  segundo = signal<number>(0);

  inicio = input<number>(0);

  multiplo10 = output<number>();

  reiniciar() {
    this.segundo.set(this.inicio());
  }
}
