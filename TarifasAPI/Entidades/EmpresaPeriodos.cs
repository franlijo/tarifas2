namespace TarifasAPI.Entidades
{
    public class EmpresaPeriodo
{
    public int Id { get; set; }
    public int EmpresaId { get; set; } // Llave foránea
    public DateOnly DesdeFecha { get; set; }
    public DateOnly HastaFecha { get; set; }

}
}