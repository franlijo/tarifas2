import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { EmpresaCreacionDTO, EmpresaDTO } from './modelos/empresa.modelos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor() { }

  private http = inject(HttpClient);
  private URLbase = environment.apiURL + '/api/empresas';

  public obtenerTodos(): Observable<EmpresaDTO[]>{
    return this.http.get<EmpresaDTO[]>(this.URLbase);
  }

  public obtenerPorId(id: number): Observable<EmpresaDTO>{
    return this.http.get<EmpresaDTO>(`${this.URLbase}/${id}`);
  }

  public crear(empresa: EmpresaCreacionDTO)
  {
    return this.http.post(this.URLbase, empresa);
  }

  public actualizar(id: number, empresa: EmpresaCreacionDTO){
    return this.http.put(`${this.URLbase}/${id}`, empresa);    
  }

  public borrar(id: number){
    return this.http.delete(`${this.URLbase}/${id}`);
  }
}
