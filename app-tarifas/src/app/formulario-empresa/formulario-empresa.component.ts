import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { EmpresaCreacionDTO, EmpresaDTO } from '../modelos/empresa.modelos';

@Component({
  selector: 'app-formulario-empresa',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink],
  templateUrl: './formulario-empresa.component.html',
  styleUrl: './formulario-empresa.component.css'
})
export class FormularioEmpresaComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  
  @Input({required: true})
  titulo!: string;

  @Input()
  modelo?: EmpresaDTO;
  
  @Output()
  posteoFormulario = new EventEmitter<EmpresaCreacionDTO>();

  ngOnInit(): void {
    if (this.modelo !==undefined){
      this.form.patchValue(this.modelo);
    }
  }

  form = this.formBuilder.group( {
    nombre:[''],
    contacto: [''],
    email: [''],
    telefono: ['']
  })

  guardarCambios() {
    let empresa = this.form.value as EmpresaCreacionDTO;
    this.posteoFormulario.emit(empresa);

  }


}
