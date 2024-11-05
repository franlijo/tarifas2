import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { EmpresaService } from '../empresa.service';
import { EmpresaCreacionDTO, EmpresaDTO } from '../modelos/empresa.modelos';
import { FormularioEmpresaComponent } from "../formulario-empresa/formulario-empresa.component";
import { Router } from '@angular/router';
import { IndiceEmpresasImportesComponent } from '../indice-empresas-importes/indice-empresas-importes.component';

@Component({
  selector: 'app-editar-empresa',
  standalone: true,
  imports: [FormularioEmpresaComponent, IndiceEmpresasImportesComponent],
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
