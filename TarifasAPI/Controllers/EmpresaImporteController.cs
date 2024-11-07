using System.Diagnostics;
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

        [HttpGet] // DEVOLVER TODOS LOS IMPORTES DE TODAS LAS EMPRESAS
        public async Task<List<EmpresaImporte>> Get()
        {
            return await context.EmpresaImportes.ToListAsync();
        }




        [HttpGet("{empresaId}")]  // DEVOLVER TODOS LOS IMPORTES DE UNA EMPRESA
        public async Task<List<EmpresaImporte>> Get(int empresaId)
        {
            return await context.EmpresaImportes
                                .Where(e => e.EmpresaId == empresaId)
                                .OrderBy(e => e.Fecha) // Ordena los resultados por la columna Fecha
                                .ToListAsync();
        }

        // OBTENER UN UNICO REGISTRO POR SU ID
        [HttpGet("registro/{id}", Name = "ObtenerEmpresaImportePorId")]
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


        [HttpPost]
        public async Task<CreatedAtRouteResult> Post( [FromBody] EmpresaImporte empresaimporte){
            
            context.Add(empresaimporte);
            await context.SaveChangesAsync();
            return CreatedAtRoute("ObtenerEmpresaImportePorId", new {id = empresaimporte.Id}, empresaimporte);

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










