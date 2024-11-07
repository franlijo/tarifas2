import { Component, EventEmitter, inject, Input, numberAttribute, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { EmpresaPeriodoService } from '../empresa-periodos.service';
import { EmpresaPeriodoCreacionDTO } from '../modelos/empresaperiodo.modelos';

@Component({
  selector: 'app-crear-empresa-periodo',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink, MatDatepickerModule],
  templateUrl: './crear-empresa-periodo.component.html',
  styleUrl: './crear-empresa-periodo.component.css'
})
export class CrearEmpresaPeriodoComponent {
  private readonly formBuilder = inject(FormBuilder);
  empresaperiodoServicio = inject(EmpresaPeriodoService);
  router = inject(Router);

  @Input({ transform: numberAttribute })
  id!: number;

  form = this.formBuilder.group(
    {
      empresaId: 0,
      hastaFecha: new Date(),
      desdeFecha: new Date()
    }
  )
  guardarCambios() {
    this.form.value.empresaId = this.id;

    let empresaperiodo = this.form.value as EmpresaPeriodoCreacionDTO;

    
    this.empresaperiodoServicio.crear(empresaperiodo).subscribe(() => {
      this.router.navigate(['empresas', 'editar', this.id]);
    });

  }
}
