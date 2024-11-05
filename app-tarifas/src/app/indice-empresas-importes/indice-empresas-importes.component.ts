import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LoadingComponent } from "../compartidos/componentes/loading/loading.component";
import { EmpresaImportesService } from '../empresa-importes.service';
import { EmpresaImporteDTO } from '../modelos/empresaImportes.modelos';


@Component({
  selector: 'app-indice-empresas-importes',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatTableModule, SweetAlert2Module, LoadingComponent],
  templateUrl: './indice-empresas-importes.component.html',
  styleUrl: './indice-empresas-importes.component.css'
})
export class IndiceEmpresasImportesComponent implements OnInit {


  @Input({ required: true })
  empresaABuscar!: number;

  empresaImportes?: EmpresaImporteDTO[];
  columnasAMostrar = ['fecha', 'importe', 'acciones'];

  constructor(private empresaImporteService: EmpresaImportesService) {

  }

  ngOnInit(): void {
    this.cargarEmpresasImportes();
  }

  cargarEmpresasImportes() {


    this.empresaImporteService.obtenerPorEmpresaId(this.empresaABuscar).subscribe(empresasimportes => {
      this.empresaImportes = empresasimportes;
    });

  }

  borrar(id: number){
    console.log(id);
    this.empresaImporteService.borrar(id).subscribe(()=> {
      this.empresaImportes= undefined;
      this.cargarEmpresasImportes();

    })
  }
}
