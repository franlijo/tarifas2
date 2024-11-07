import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmpresaPeriodoCreacionDTO, EmpresaPeriodoDTO } from './modelos/empresaperiodo.modelos';

@Injectable({
  providedIn: 'root'
})
export class EmpresaPeriodoService {

  constructor() { }

  private http = inject(HttpClient);
  private URLbase = environment.apiURL + '/api/empresas/periodos'; 

  public obtenerTodos(): Observable<EmpresaPeriodoDTO[]>{
    return this.http.get<EmpresaPeriodoDTO[]>(this.URLbase);
  }

  public obtenerPorId(id: number): Observable<EmpresaPeriodoDTO>{
    return this.http.get<EmpresaPeriodoDTO>(`${this.URLbase}/${id}`);
  }
  
  public obtenerPorEmpresaId(empresaId: number): Observable<EmpresaPeriodoDTO[]>{

    return this.http.get<EmpresaPeriodoDTO[]>(`${this.URLbase}/${empresaId}`);
  }

  public borrar(id: number){
    return this.http.delete(`${this.URLbase}/registro/${id}`);
  }

  public crear(empresaImportes: EmpresaPeriodoCreacionDTO){
    return this.http.post(this.URLbase, empresaImportes);
  }

}