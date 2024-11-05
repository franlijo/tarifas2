using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TarifasAPI.Entidades
{
    public class EmpresaTrabajadores
    {
    public int Id { get; set; }
    public int EmpresaId { get; set; } // Llave foránea
    public DateOnly Fecha { get; set; }
    public int NumeroTrabajadores { get; set; }

    }
}