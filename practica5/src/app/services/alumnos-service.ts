import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export type AlumnoCarrera =
  | 'Tecnologias_de_la_informacion'
  | 'Mecatronica'
  | 'Biotecnologia'
  | 'Energia'
  | 'Animacion_y_efectos_visuales'
  | 'Terapia_fisica';

export interface Alumno {
  id: number;
  name: string;
  matricula: string;
  carrera: AlumnoCarrera;
  semestre: number;
  correo: string;
}

export interface AlumnoCreatePayload {
  name: string;
  matricula: string;
  carrera: AlumnoCarrera;
  semestre: number;
  correo: string;
}

export interface AlumnoUpdatePayload {
  name?: string;
  matricula?: string;
  carrera?: AlumnoCarrera;
  semestre?: number;
  correo?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  private http = inject(HttpClient);
  private readonly alumnosUrl = `${environment.apiUrl}/api/alumnos`;

  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.alumnosUrl);
  }

  createAlumno(payload: AlumnoCreatePayload): Observable<Alumno> {
    return this.http.post<Alumno>(this.alumnosUrl, payload);
  }

  updateAlumno(id: number, payload: AlumnoUpdatePayload): Observable<Alumno> {
    return this.http.patch<Alumno>(`${this.alumnosUrl}/${id}`, payload);
  }

  deleteAlumno(id: number): Observable<void> {
    return this.http.delete<void>(`${this.alumnosUrl}/${id}`);
  }
}
