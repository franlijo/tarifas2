import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmpresaTrabajadorCreacionDTO, EmpresaTrabajadorDTO } from './modelos/empresatrabajadores.modelos';

@Injectable({
  providedIn: 'root'
})
export class EmpresaTrabajadorService {

  constructor() { }

  private http = inject(HttpClient);
  private URLbase = environment.apiURL + '/api/empresas/trabajadores'; 

  public obtenerTodos(): Observable<EmpresaTrabajadorDTO[]>{
    return this.http.get<EmpresaTrabajadorDTO[]>(this.URLbase);
  }

  public obtenerPorId(id: number): Observable<EmpresaTrabajadorDTO>{
    return this.http.get<EmpresaTrabajadorDTO>(`${this.URLbase}/${id}`);
  }
  
  public obtenerPorEmpresaId(empresaId: number): Observable<EmpresaTrabajadorDTO[]>{

    return this.http.get<EmpresaTrabajadorDTO[]>(`${this.URLbase}/${empresaId}`);
  }

  public borrar(id: number){
    return this.http.delete(`${this.URLbase}/registro/${id}`);
  }

  public crear(empresaImportes: EmpresaTrabajadorCreacionDTO){
    return this.http.post(this.URLbase, empresaImportes);
  }

}