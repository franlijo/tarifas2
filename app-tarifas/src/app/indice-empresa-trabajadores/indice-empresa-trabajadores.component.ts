import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LoadingComponent } from "../compartidos/componentes/loading/loading.component";
import { EmpresaTrabajadorDTO } from '../modelos/empresatrabajadores.modelos';
import { EmpresaTrabajadorService } from '../empresa-trabajador.service';

@Component({
  selector: 'app-indice-empresa-trabajadores',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatTableModule, SweetAlert2Module, LoadingComponent],
  templateUrl: './indice-empresa-trabajadores.component.html',
  styleUrl: './indice-empresa-trabajadores.component.css'
})
export class IndiceEmpresaTrabajadoresComponent implements OnInit{

  @Input({ required: true })
  empresaABuscar!: number;

  empresaTrabajadores?: EmpresaTrabajadorDTO[];
  columnasAMostrar = ['fecha', 'numeroTrabajadores', 'acciones'];

  constructor(private empresaTrabajadorService: EmpresaTrabajadorService) {

 
  }
  ngOnInit(): void {
    this.cargarEmpresasTrabajadores();
  }

  cargarEmpresasTrabajadores(){
    this.empresaTrabajadorService.obtenerPorEmpresaId(this.empresaABuscar)
    .subscribe(empresastrabajadores => {
      this.empresaTrabajadores = empresastrabajadores;
  });

  }

  borrar(id: number){
   
    this.empresaTrabajadorService.borrar(id).subscribe(()=> {
      this.empresaTrabajadores= undefined;
      this.cargarEmpresasTrabajadores();

    })
  }





}  

