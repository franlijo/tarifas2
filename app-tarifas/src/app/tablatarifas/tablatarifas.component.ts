import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LoadingComponent } from "../compartidos/componentes/loading/loading.component";
import { TarifaService } from '../tarifaService';
import { TarifaDTO } from '../modelos/tarifa.modelos';


@Component({
  selector: 'app-tablatarifas',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatTableModule, SweetAlert2Module, LoadingComponent],
  templateUrl: './tablatarifas.component.html',
  styleUrl: './tablatarifas.component.css'
})
export class TablatarifasComponent {
  tarifaService = inject(TarifaService);
  tarifas?: TarifaDTO[];
  columnasAMostrar = ['desdeFecha', 'desdeTrabajador', 'importeTrabajadorDia'] ;
  

  constructor() {
    this.cargarTarifas();
  }

  cargarTarifas(){
    this.tarifaService.obtenerTodos().subscribe(tarifas => {
      this.tarifas = tarifas;
    console.log(tarifas);
    })
  }


}
