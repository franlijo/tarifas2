import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../environments/environment.development";
import { Observable } from "rxjs";
import { TarifaDTO } from "./modelos/tarifa.modelos";

@Injectable({
    providedIn: 'root'
})

export class TarifaService {
    constructor() { }

    private http = inject(HttpClient);
    private URLbase = environment.apiURL + '/api/tablatarifa';
    private _tarifaS?: TarifaDTO;

   public set tarifa(tarifa: TarifaDTO) {
        this.tarifa = tarifa;
    }


    public obtenerTodos(): Observable<TarifaDTO[]> {
        return this.http.get<TarifaDTO[]>(this.URLbase);
    }



    //   public obtenerTodos(): Observable<EmpresaDTO[]>{
    //     return this.http.get<EmpresaDTO[]>(this.URLbase);
    //   }
}