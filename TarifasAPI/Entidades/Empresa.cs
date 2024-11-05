using System.ComponentModel.DataAnnotations;

namespace TarifasAPI.Entidades
{
    public class Empresa
    {
        public int Id { get; set; }
        public required string Nombre { get; set; }
        public required string Contacto { get; set; }
        public required string Email {get; set;}
        public required string Telefono { get; set; }

    }
}