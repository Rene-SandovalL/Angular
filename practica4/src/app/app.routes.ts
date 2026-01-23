import { Routes } from '@angular/router';
import { Formulario1Page } from './pages/formulario1-page/formulario1-page';
import { Formulario2Page } from './pages/formulario2-page/formulario2-page';
import { Formulario3Page } from './pages/formulario3-page/formulario3-page';

export const routes: Routes = [
  {
    path: 'formulario1',
    component: Formulario1Page
  },
  {
    path: 'formulario2',
    component: Formulario2Page
  },
  {
    path: 'formulario3',
    component: Formulario3Page
  }
];
