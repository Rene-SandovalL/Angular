import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export type MaestroDepartamento = 'programacion' | 'base_de_datos' | 'dise_o';

export interface Maestro {
  id: number;
  name: string;
  telefono: string;
  email: string;
  departamento: MaestroDepartamento | null;
}

export interface MaestroCreatePayload {
  name: string;
  telefono: string;
  email: string;
  departamento?: MaestroDepartamento | null;
}

export interface MaestroUpdatePayload {
  name?: string;
  telefono?: string;
  email?: string;
  departamento?: MaestroDepartamento | null;
}

@Injectable({
  providedIn: 'root',
})
export class MaestrosService {
  private http = inject(HttpClient);
  private readonly maestrosUrl = `${environment.apiUrl}/api/maestros`;

  getMaestros(): Observable<Maestro[]> {
    return this.http.get<Maestro[]>(this.maestrosUrl);
  }

  createMaestro(payload: MaestroCreatePayload): Observable<Maestro> {
    return this.http.post<Maestro>(this.maestrosUrl, payload);
  }

  updateMaestro(id: number, payload: MaestroUpdatePayload): Observable<Maestro> {
    return this.http.patch<Maestro>(`${this.maestrosUrl}/${id}`, payload);
  }

  deleteMaestro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.maestrosUrl}/${id}`);
  }
}
