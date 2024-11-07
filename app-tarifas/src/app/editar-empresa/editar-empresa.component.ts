import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { EmpresaService } from '../empresa.service';
import { EmpresaCreacionDTO, EmpresaDTO } from '../modelos/empresa.modelos';
import { FormularioEmpresaComponent } from "../formulario-empresa/formulario-empresa.component";
import { Router } from '@angular/router';
import { IndiceEmpresasImportesComponent } from '../indice-empresas-importes/indice-empresas-importes.component';
import { IndiceEmpresasPeriodosComponent } from "../indice-empresas-periodos/indice-empresas-periodos.component";
import { IndiceEmpresaTrabajadoresComponent } from "../indice-empresa-trabajadores/indice-empresa-trabajadores.component";
import { CalculoServicioComponent } from "../calculo-servicio/calculo-servicio.component";

@Component({
  selector: 'app-editar-empresa',
  standalone: true,
  imports: [FormularioEmpresaComponent, IndiceEmpresasImportesComponent, IndiceEmpresasPeriodosComponent, IndiceEmpresaTrabajadoresComponent, CalculoServicioComponent],
  templateUrl: './editar-empresa.component.html',
  styleUrl: './editar-empresa.component.css'
})
export class EditarEmpresaComponent implements OnInit{
  
  @Input({transform: numberAttribute})
  id!: number;

  empresaService = inject(EmpresaService);
  router = inject(Router);
  modelo?: EmpresaDTO;

  ngOnInit(): void {
    
    this.empresaService.obtenerPorId(this.id).subscribe(empresa => {
      this.modelo = empresa;
    }

    )
  }

  guardarCambios(empresa: EmpresaCreacionDTO){
    this.empresaService.actualizar(this.id, empresa).subscribe(() => {
      this.router.navigate(['/empresas']);

    })
  }


}
