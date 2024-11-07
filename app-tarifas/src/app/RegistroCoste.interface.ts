// RegistroCoste.interface.ts
export interface RegistroCoste {
    fecha: Date | string;
    numTrab: number ;
    precioUnidad: number;
    totalcoste: number;
    ingreso: number;
    saldo: number;
    factura: number;
  }
  