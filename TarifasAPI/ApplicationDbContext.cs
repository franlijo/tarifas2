using Microsoft.EntityFrameworkCore;
using TarifasAPI.Entidades;

namespace TarifasAPI
{
    public class ApplicationDbContext : DbContext
    {

        // public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)    
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Empresa> Empresas {get; set;}
        public DbSet<Tarifa> Tarifas {get; set;}

        public DbSet<EmpresaTrabajadores> EmpresaTrabajadores { get; set; }
        public DbSet<EmpresaImporte> EmpresaImportes { get; set; }
        public DbSet<EmpresaPeriodo> EmpresaPeriodos { get; set; }

    }
}