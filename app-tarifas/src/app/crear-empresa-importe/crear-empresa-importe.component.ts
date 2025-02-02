import { Component, EventEmitter, inject, Input, numberAttribute, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { EmpresaImportesService } from '../empresa-importes.service';
import { EmpresaImporteCreacionDTO } from '../modelos/empresaImportes.modelos';
import { MatDatepickerModule } from '@angular/material/datepicker';


@Component({
  selector: 'app-crear-empresa-importe',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink, MatDatepickerModule],
  templateUrl: './crear-empresa-importe.component.html',
  styleUrl: './crear-empresa-importe.component.css'
})
export class CrearEmpresaImporteComponent {
  private readonly formBuilder = inject(FormBuilder);
  empresaimporteService = inject(EmpresaImportesService);
  router = inject(Router);
  

  @Input({ transform: numberAttribute })
  id!: number;


  form = this.formBuilder.group(
    {
      empresaId: 0,
      fecha: new Date(),
//      fecha: new Date().toISOString().split('T')[0],
      importe: 0
    }
  )


  guardarCambios() {
    this.form.value.empresaId = this.id;

    let empresaimporte = this.form.value as EmpresaImporteCreacionDTO;

    
    this.empresaimporteService.crear(empresaimporte).subscribe(() => {
      this.router.navigate(['empresas', 'editar', this.id]);
    })

    // this.empresaimporteService.crear(empresaimporte).subscribe(() =>{
    //   this.router.navigate(["empresa/importe/editar"]);
    // });

  }


}
