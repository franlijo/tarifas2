import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService } from '../empresa.service';
import { EmpresaCreacionDTO, EmpresaDTO } from '../modelos/empresa.modelos';
import { FormularioEmpresaComponent } from "../formulario-empresa/formulario-empresa.component";

@Component({
  selector: 'app-crear-empresa',
  standalone: true,
  imports: [FormularioEmpresaComponent],
  templateUrl: './crear-empresa.component.html',
  styleUrl: './crear-empresa.component.css'
})
export class CrearEmpresaComponent {
  router = inject(Router);
  empresaService = inject(EmpresaService);

guardarCambios(empresa: EmpresaCreacionDTO){
  this.empresaService.crear(empresa).subscribe(() =>{
    this.router.navigate(["empresas"]);
  });
}

}
