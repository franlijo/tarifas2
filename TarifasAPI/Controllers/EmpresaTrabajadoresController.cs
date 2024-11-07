using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TarifasAPI.Entidades;

namespace TarifasAPI.Controllers
{
    [Route("api/empresas/trabajadores")]
    public class EmpresaTrabajadoresController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public EmpresaTrabajadoresController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [HttpGet] // DEVOLVER TODOS LOS TRABAJADORES DE TODAS LAS EMPRESAS
        public async Task<List<EmpresaTrabajadores>> Get()
        {
            return await context.EmpresaTrabajadores.ToListAsync();
        }

        [HttpGet("{empresaId}")]  // DEVOLVER TODOS LOS TRABAJADORES DE UNA EMPRESA
        public async Task<List<EmpresaTrabajadores>> Get(int empresaId)
        {
              return await context.EmpresaTrabajadores
                                .Where(e => e.EmpresaId == empresaId)
                                .OrderBy(e => e.Fecha) // Ordena los resultados por la columna Fecha
                                .ToListAsync();
        }


        // OBTENER UN UNICO REGISTRO POR SU ID
        [HttpGet("registro/{id}", Name = "ObtenerEmpresaTrabajadoresPorId")]
        public async Task<ActionResult<EmpresaTrabajadores>> GetById(int id)
        {
            var empresaTrabajador = await context.EmpresaTrabajadores
                                               .FirstOrDefaultAsync(e => e.Id == id);

            if (empresaTrabajador == null)
            {
                return NotFound(); // Devuelve un código 404 si no se encuentra el registro
            }

            return empresaTrabajador;
        }

        [HttpPost]
        public async Task<CreatedAtRouteResult> Post( [FromBody] EmpresaTrabajadores empresatrabajadores){
            
            context.Add(empresatrabajadores);
            await context.SaveChangesAsync();
            return CreatedAtRoute("ObtenerEmpresaTrabajadoresPorId", new {id = empresatrabajadores.Id}, empresatrabajadores);

        }

        // [HttpDelete]

        [HttpDelete("registro/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var empresaTrabajador = await context.EmpresaTrabajadores.FindAsync(id);
            if (empresaTrabajador == null)
            {
                return NotFound();
            }

            context.EmpresaTrabajadores.Remove(empresaTrabajador);
            await context.SaveChangesAsync();

            return NoContent();
        }






    }
}