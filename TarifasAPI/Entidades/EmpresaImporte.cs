namespace TarifasAPI.Entidades
{
    public class EmpresaImporte
    {
        public int Id { get; set; }
        public required int EmpresaId { get; set; }
        public required DateOnly Fecha { get; set; }
        public required float Importe { get; set; }

    }
}