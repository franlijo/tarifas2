import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { EmpresaService } from '../empresa.service';
import { EmpresaDTO } from '../modelos/empresa.modelos';
import { MatTableModule } from '@angular/material/table';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LoadingComponent } from "../compartidos/componentes/loading/loading.component";

@Component({
  selector: 'app-indice-empresas',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatTableModule, SweetAlert2Module, LoadingComponent],
  templateUrl: './indice-empresas.component.html',
  styleUrl: './indice-empresas.component.css'
})
export class IndiceEmpresasComponent {

  empresaService = inject(EmpresaService);
  empresas?: EmpresaDTO[];
  columnasAMostrar = ['nombre', 'contacto', 'email', 'telefono', 'acciones']

  constructor(){
    this.cargarEmpresas();
  }

  cargarEmpresas(){
    this.empresaService.obtenerTodos().subscribe(empresas => {
      this.empresas = empresas;
    });

  }
  
  borrar(id: number){
    this.empresaService.borrar(id).subscribe(()=> {
      this.empresas= undefined;
      this.cargarEmpresas();

    })
  }
}
