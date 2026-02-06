import { Routes } from '@angular/router';
import { Calificaciones } from './pages/calificaciones/calificaciones';
import { DatosGenerales } from './pages/datos-generales/datos-generales';

export const routes: Routes = [
  {
    path: 'calificaciones',
    component: Calificaciones
  },
  {
    path: 'datos-generales',
    component: DatosGenerales
  },
  {
    path: '',
    component: Calificaciones
  }
];
