import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { IndiceEmpresasComponent } from './indice-empresas/indice-empresas.component';
import { TablatarifasComponent } from './tablatarifas/tablatarifas.component';
import { CrearEmpresaComponent } from './crear-empresa/crear-empresa.component';
import { EditarEmpresaComponent } from './editar-empresa/editar-empresa.component';
import { CrearEmpresaImporteComponent } from './crear-empresa-importe/crear-empresa-importe.component';
import { CrearEmpresaPeriodoComponent } from './crear-empresa-periodo/crear-empresa-periodo.component';
import { CrearEmpresaTrabajadoresComponent } from './crear-empresa-trabajadores/crear-empresa-trabajadores.component';


export const routes: Routes = [
    {path: '', component: LandingComponent},
    {path: 'tarifas', component: TablatarifasComponent},
    {path: 'empresas', component: IndiceEmpresasComponent },
    {path: 'empresas/crear', component: CrearEmpresaComponent},
    {path: 'empresas/editar/:id', component: EditarEmpresaComponent},
    {path: 'empresas/importe/crear/:id', component: CrearEmpresaImporteComponent}, 
    {path: 'empresas/periodo/crear/:id', component: CrearEmpresaPeriodoComponent},
    {path: 'empresas/trabajadores/crear/:id', component: CrearEmpresaTrabajadoresComponent},
    {path: '**', redirectTo: ''}
    
];
