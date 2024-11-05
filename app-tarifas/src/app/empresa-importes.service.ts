import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { EmpresaImporteCreacionDTO, EmpresaImporteDTO } from './modelos/empresaImportes.modelos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaImportesService {

  constructor() { }

  private http = inject(HttpClient);
  private URLbase = environment.apiURL + '/api/empresas/importes'; 

  public obtenerTodos(): Observable<EmpresaImporteDTO[]>{
    return this.http.get<EmpresaImporteDTO[]>(this.URLbase);
  }

  public obtenerPorId(id: number): Observable<EmpresaImporteDTO>{
    return this.http.get<EmpresaImporteDTO>(`${this.URLbase}/${id}`);
  }
  
  public obtenerPorEmpresaId(empresaId: number): Observable<EmpresaImporteDTO[]>{

    return this.http.get<EmpresaImporteDTO[]>(`${this.URLbase}/${empresaId}`);
  }

  public borrar(id: number){
    return this.http.delete(`${this.URLbase}/registro/${id}`);
  }

  public crear(empresaImportes: EmpresaImporteCreacionDTO){
    return this.http.post(this.URLbase, empresaImportes);
  }

}
