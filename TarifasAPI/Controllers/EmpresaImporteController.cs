using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TarifasAPI.Entidades;

namespace TarifasAPI.Controllers
{
    [Route("api/empresas/importes")]

    public class EmpresaImporteController : ControllerBase

    {

        private readonly ApplicationDbContext context;

        public EmpresaImporteController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<List<EmpresaImporte>> Get()
        {
            return await context.EmpresaImportes.ToListAsync();
        }


        [HttpGet("{empresaId}")]
        public async Task<List<EmpresaImporte>> Get(int empresaId)
        {
            return await context.EmpresaImportes
                                .Where(e => e.EmpresaId == empresaId)
                                .OrderBy(e => e.Fecha) // Ordena los resultados por la columna Fecha
                                .ToListAsync();
        }

        [HttpGet("registro/{id}")]
        public async Task<ActionResult<EmpresaImporte>> GetById(int id)
        {
            var empresaImporte = await context.EmpresaImportes
                                               .FirstOrDefaultAsync(e => e.Id == id);

            if (empresaImporte == null)
            {
                return NotFound(); // Devuelve un código 404 si no se encuentra el registro
            }

            return empresaImporte;
        }







        // [HttpPost]

        [HttpPost]
        public async Task<ActionResult<EmpresaImporte>> Create([FromBody] EmpresaImporte newEmpresaImporte)
        {
            // Agrega el nuevo registro a la base de datos
            context.EmpresaImportes.Add(newEmpresaImporte);
            await context.SaveChangesAsync();

            // Devuelve el nuevo registro junto con una respuesta HTTP 201 Created
            return CreatedAtAction(nameof(GetById), new { id = newEmpresaImporte.Id }, newEmpresaImporte);
        }



        // [HttpPut]
        [HttpPut("registro/{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] EmpresaImporte updatedEmpresaImporte)
        {
            if (id != updatedEmpresaImporte.Id)
            {
                return BadRequest("El ID del registro no coincide con el ID proporcionado.");
            }

            var empresaImporte = await context.EmpresaImportes.FindAsync(id);
            if (empresaImporte == null)
            {
                return NotFound();
            }

            empresaImporte.Fecha = updatedEmpresaImporte.Fecha;
            empresaImporte.Importe = updatedEmpresaImporte.Importe;
            empresaImporte.EmpresaId = updatedEmpresaImporte.EmpresaId;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmpresaImporteExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool EmpresaImporteExists(int id)
        {
            return context.EmpresaImportes.Any(e => e.Id == id);
        }



        // [HttpDelete]

        [HttpDelete("registro/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var empresaImporte = await context.EmpresaImportes.FindAsync(id);
            if (empresaImporte == null)
            {
                return NotFound();
            }

            context.EmpresaImportes.Remove(empresaImporte);
            await context.SaveChangesAsync();

            return NoContent();
        }

    }
}










