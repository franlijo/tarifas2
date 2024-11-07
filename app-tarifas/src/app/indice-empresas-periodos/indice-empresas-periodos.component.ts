import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LoadingComponent } from "../compartidos/componentes/loading/loading.component";
import { EmpresaPeriodoDTO } from '../modelos/empresaperiodo.modelos';
import { EmpresaPeriodoService } from '../empresa-periodos.service';

@Component({
  selector: 'app-indice-empresas-periodos',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatTableModule, SweetAlert2Module, LoadingComponent],
  templateUrl: './indice-empresas-periodos.component.html',
  styleUrl: './indice-empresas-periodos.component.css'
})
export class IndiceEmpresasPeriodosComponent implements OnInit{

  @Input({ required: true })
  empresaABuscar!: number;

  empresaPeriodos?: EmpresaPeriodoDTO[];
  columnasAMostrar = ['desdeFecha', 'hastaFecha', 'acciones'];

  constructor(private empresaPeriodoService: EmpresaPeriodoService){
    
  }
  ngOnInit(): void {
    this.cargarEmpresasPeriodos();
  }

  cargarEmpresasPeriodos(){
    this.empresaPeriodoService.obtenerPorEmpresaId(this.empresaABuscar)
      .subscribe(empresasperiodos => {
        this.empresaPeriodos = empresasperiodos;
      });

  }
    borrar(id: number){
      console.log(id);
      this.empresaPeriodoService.borrar(id).subscribe(()=> {
        this.empresaPeriodos= undefined;
        this.cargarEmpresasPeriodos();

     })
  }


}
