import { Component, EventEmitter, inject, Input, numberAttribute, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { EmpresaTrabajadorService } from '../empresa-trabajador.service';
import { EmpresaTrabajadorCreacionDTO } from '../modelos/empresatrabajadores.modelos';
@Component({
  selector: 'app-crear-empresa-trabajadores',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink, MatDatepickerModule],
  templateUrl: './crear-empresa-trabajadores.component.html',
  styleUrl: './crear-empresa-trabajadores.component.css'
})
export class CrearEmpresaTrabajadoresComponent {
  private readonly formBuilder = inject(FormBuilder);
  empresatrabajadorServicio = inject(EmpresaTrabajadorService);
  router = inject(Router);
  
  @Input({ transform: numberAttribute })
  id!: number;

  form = this.formBuilder.group(
    {
      empresaId: 0,
      fecha: new Date(),
      numeroTrabajadores: 0
    }
  )
  guardarCambios() {
    this.form.value.empresaId = this.id;

    let empresatrabajador = this.form.value as EmpresaTrabajadorCreacionDTO;

    
    this.empresatrabajadorServicio.crear(empresatrabajador).subscribe(() => {
      this.router.navigate(['empresas', 'editar', this.id]);
    });

  }
}
