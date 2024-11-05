using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TarifasAPI.Entidades
{
    public class Tarifa 
    {
     [Key]
    public int Id { get; set; }

    [Required]
    [DataType(DataType.Date)]
    public DateOnly DesdeFecha { get; set; }

    [DataType(DataType.Date)]

    [Required]
    public int DesdeTrabajador { get; set; }

    [Required]
    [DataType(DataType.Currency)]
    public decimal ImporteTrabajadorDia { get; set; }

 
}
}