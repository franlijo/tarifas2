import { Component, Inject, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LoadingComponent } from "../compartidos/componentes/loading/loading.component";
import { EmpresaTrabajadorDTO } from '../modelos/empresatrabajadores.modelos';
import { EmpresaTrabajadorService } from '../empresa-trabajador.service';
import { RegistroCoste } from '../RegistroCoste.interface';
import { TarifaDTO } from '../modelos/tarifa.modelos';
import { EmpresaPeriodoDTO } from '../modelos/empresaperiodo.modelos';
import { EmpresaImporteDTO } from '../modelos/empresaImportes.modelos';
import { EmpresaPeriodoService } from '../empresa-periodos.service';
import { TarifaService } from '../tarifaService';
import { EmpresaImportesService } from '../empresa-importes.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { debounce } from "lodash";

@Component({
  selector: 'app-calculo-servicio',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatTableModule, SweetAlert2Module, LoadingComponent, CommonModule],
  templateUrl: './calculo-servicio.component.html',
  styleUrl: './calculo-servicio.component.css'
})
export class CalculoServicioComponent implements OnInit {
  @Input({ required: true })
  empresaABuscar!: number;

  // fecha: Date;
  // numTrab: number;
  // precioUnidad: number;
  // totalcoste: number;
  // ingreso: number;
  // saldo: number;
  
  //columnasAMostrar = ['fecha', 'numTrab']
  columnasAMostrar = ['fecha', 'numTrab', 'precioUnidad', 'totalcoste', 'ingreso', 'saldo']

  datosTarifa?: TarifaDTO[];
  datosPeriodo?: EmpresaPeriodoDTO[];
  datosTrabajadores?: EmpresaTrabajadorDTO[];
  datosImportes?: EmpresaImporteDTO[];
  datosResumen: RegistroCoste[] = [];

  public totalIngresos: number = 0;
  public totalGastos: number = 0;
  public totalDias: number = 0;
  public totalServicios: number =0;
  public totalSaldo: number =0; 



  // cargar datosTarifa

  // cargar datosImporte

  // cargar datosTrabajadores

  constructor(private empresaPeriodoService: EmpresaPeriodoService,
    private tarifaService: TarifaService, private empresaTrabajajdorService: EmpresaTrabajadorService,
    private empresaImporteService: EmpresaImportesService) {
    //this.cargarEmpresasPeriodos();
  }

  ngOnInit(): void {

    this.cargarEmpresasPeriodos();
    this.cargarTarifas();
    this.cargarEmpresasTrabajadores();
    this.cargarEmpresasImportes();
    this.actualizarPrecios();

    this.totalIngresos = 0;
    this.totalGastos = 0;
    this.totalDias = 0;
    this.totalServicios = 0;
    this.totalSaldo = 0; 
  

 
  }

  cargarEmpresasPeriodos() {
    this.empresaPeriodoService.obtenerPorEmpresaId(this.empresaABuscar)
      .subscribe(empresasperiodos => {
        this.datosPeriodo = empresasperiodos;
      });
  }
  cargarTarifas() {
    this.tarifaService.obtenerTodos().subscribe(tarifas => {
      this.datosTarifa = tarifas;
    })
  }
  cargarEmpresasTrabajadores() {
    this.empresaTrabajajdorService.obtenerPorEmpresaId(this.empresaABuscar)
      .subscribe(empresastrabajadores => {
        this.datosTrabajadores = empresastrabajadores;
      });
  }

  cargarEmpresasImportes() {
    this.empresaImporteService.obtenerPorEmpresaId(this.empresaABuscar)
      .subscribe(empresasimportes => {
        this.datosImportes = empresasimportes;
      });
  }

  actualizarPrecios() {
    this.cargarEmpresasPeriodos();
    this.cargarTarifas();
    this.cargarEmpresasTrabajadores();
    this.cargarEmpresasImportes();
    this.datosResumen = [];

    this.totalIngresos = 0;
    this.totalGastos = 0;
    this.totalDias = 0;
    this.totalServicios = 0;
    this.totalSaldo = 0; 



    this.datosPeriodo?.forEach((registro) => {
      var fechaInicio = new Date(registro.desdeFecha);
      const fechaFin = new Date(registro.hastaFecha);

      while (fechaInicio <= fechaFin){
        this.datosResumen?.push({
          fecha: fechaInicio.toISOString().split('T')[0],
          numTrab: 0, 
          precioUnidad: 0,
          totalcoste: 0,
          ingreso: 0,
          saldo: 0,
          factura: 1,
        });
        // Incrementar la fechaInicio en 1 día (24 horas)
        fechaInicio.setDate(fechaInicio.getDate() + 1);
      }
    })

    if (!this.datosResumen){
      return
    }


     this.datosTrabajadores?.forEach((registro) => {
       
        let index = this.datosResumen?.findIndex(resumen => resumen.fecha === registro.fecha);

        if (index !== -1) {
          // Si se encuentra el índice (la fecha ya existe), actualizamos el campo
          this.datosResumen[index].numTrab = registro.numeroTrabajadores ;

        } else {
          // Si no se encuentra la fecha, agregamos un nuevo registro
          this.datosResumen?.push({
            fecha: registro.fecha,
            numTrab: registro.numeroTrabajadores, 
            precioUnidad: 0,
            totalcoste: 0,
            ingreso: 0,
            saldo: 0,
            factura:0
          });
        }
     })
    

    this.datosImportes?.forEach((registro) => {
      let index = this.datosResumen?.findIndex(resumen => resumen.fecha === registro.fecha);
      if (index !== -1) {
        // Si se encuentra el índice (la fecha ya existe), actualizamos el campo
        this.datosResumen[index].ingreso = registro.importe ;

      } else {
        // Si no se encuentra la fecha, agregamos un nuevo registro
        this.datosResumen?.push({
          fecha: registro.fecha,
          numTrab: 0, 
          precioUnidad: 0,
          totalcoste: 0,
          ingreso: registro.importe,
          saldo: 0,
          factura: 0
        });
      }
    })

    this.ordenarPorFecha();

    var datoAnterior = 0;
    this.datosResumen.forEach((registro) => {
      if (registro.numTrab == 0){
        registro.numTrab= datoAnterior;
      } else {
        datoAnterior=registro.numTrab;
      }

    })
    
    
    // this.datosResumen.forEach((resumen) => {

    //         resumen.precioUnidad = this.obtenerImporte(resumen.fecha, resumen.numTrab);
    // });


    var saldoAnterior = 0;
    this.datosResumen.forEach((resumen)=> {
      if (resumen.factura==1){
        resumen.precioUnidad = this.obtenerImporte(resumen.fecha, resumen.numTrab);
        resumen.totalcoste = parseFloat((resumen.numTrab*resumen.precioUnidad*resumen.factura).toFixed(3));
      }

      resumen.saldo = parseFloat((saldoAnterior + resumen.ingreso - resumen.totalcoste).toFixed(3))  ;
      saldoAnterior = resumen.saldo;

      this.totalIngresos = this.totalIngresos + resumen.ingreso;
      this.totalGastos += resumen.totalcoste;
      this.totalDias += 1*resumen.factura;
      this.totalServicios += resumen.numTrab*resumen.factura;
      this.totalSaldo = resumen.saldo; 

    })

  }

  ordenarPorFecha() {
    this.datosResumen.sort((a, b) => {
      const fechaA = a.fecha instanceof Date ? a.fecha.getTime() : new Date(a.fecha).getTime();
      const fechaB = b.fecha instanceof Date ? b.fecha.getTime() : new Date(b.fecha).getTime();
      return fechaA - fechaB;
    });
  }

  obtenerImporte(fecha: Date | string, numeroTrabajadores: number): number {
    // Filtrar las tarifas que tienen una fecha menor o igual a la proporcionada

    if (this.datosTarifa){
    const tarifasValidas = this.datosTarifa.filter(
      (tarifa) => tarifa.desdeFecha <= fecha
    );

    // Buscar la tarifa que cumpla con el número de trabajadores menor o igual

        const tarifaSeleccionada = tarifasValidas
      .filter((tarifa) => tarifa.desdeTrabajador <= numeroTrabajadores)
      .reduce((prev, curr) => {
        // Si no hay tarifa previa, seleccionamos la actual
        if (!prev) return curr;
        // Si la fecha de la tarifa actual es mayor, seleccionamos la nueva tarifa
        if (curr.desdeFecha > prev.desdeFecha) return curr;
        // Si las fechas son iguales, seleccionamos la tarifa con más trabajadores
        if (curr.desdeFecha === prev.desdeFecha) {
          return curr.desdeTrabajador > prev.desdeTrabajador ? curr : prev;
        }
        return prev;
      }, null as TarifaDTO | null);

    // Si encontramos una tarifa válida, devolvemos el importe; si no, devolvemos 0
    return tarifaSeleccionada ? tarifaSeleccionada.importeTrabajadorDia : 0.5;
    } else {
      return 0;
    }
  }



  
}
