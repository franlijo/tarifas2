using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TarifasAPI.Entidades;

namespace TarifasAPI.Controllers
{
    [Route("api/empresas/periodos")]

    public class EmpresaPeriodoController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        public EmpresaPeriodoController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [HttpGet] // DEVOLVER TODOS LOS PERIODOS DE TODAS LAS EMPRESAS
        public async Task<List<EmpresaPeriodo>> Get()
        {
            return await context.EmpresaPeriodos.ToListAsync();
        }

        [HttpGet("{empresaId}")]  // DEVOLVER TODOS LOS PERIODOS DE UNA EMPRESA
        public async Task<List<EmpresaPeriodo>> Get(int empresaId)
        {
              return await context.EmpresaPeriodos
                                .Where(e => e.EmpresaId == empresaId)
                                .OrderBy(e => e.DesdeFecha) // Ordena los resultados por la columna Fecha
                                .ToListAsync();


        }

        // OBTENER UN UNICO REGISTRO POR SU ID
        [HttpGet("registro/{id}", Name = "ObtenerEmpresaPeriodoPorId")]
        public async Task<ActionResult<EmpresaPeriodo>> GetById(int id)
        {
            var empresaPeriodo = await context.EmpresaPeriodos
                                               .FirstOrDefaultAsync(e => e.Id == id);

            if (empresaPeriodo == null)
            {
                return NotFound(); // Devuelve un código 404 si no se encuentra el registro
            }

            return empresaPeriodo;
        }


        [HttpPost]
        public async Task<CreatedAtRouteResult> Post( [FromBody] EmpresaPeriodo empresaperiodo){
            
            context.Add(empresaperiodo);
            await context.SaveChangesAsync();
            return CreatedAtRoute("ObtenerEmpresaImportePorId", new {id = empresaperiodo.Id}, empresaperiodo);

        }

        // [HttpDelete]

        [HttpDelete("registro/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var empresaPeriodo = await context.EmpresaPeriodos.FindAsync(id);
            if (empresaPeriodo == null)
            {
                return NotFound();
            }

            context.EmpresaPeriodos.Remove(empresaPeriodo);
            await context.SaveChangesAsync();

            return NoContent();
        }















    }
}