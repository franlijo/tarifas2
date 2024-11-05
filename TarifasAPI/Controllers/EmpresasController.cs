using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TarifasAPI.Entidades;

namespace TarifasAPI.Controllers
{
    [Route("api/empresas")]
    public class EmpresasController: ControllerBase
    {
        private readonly ApplicationDbContext context;

        public EmpresasController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<List<Empresa>> Get(){
            return await context.Empresas.ToListAsync();

        }

        [HttpGet("{id:int}", Name = "ObtenerEmpresaPorId")]
        public async Task<ActionResult<Empresa>> Get(int id)
        {
            var empresa = await context.Empresas.FirstOrDefaultAsync(x => x.Id == id);

            if (empresa is null)
            {
                return NotFound();
            }

            return empresa;
        }

        [HttpPost]
        public async Task<CreatedAtRouteResult> Post([FromBody] Empresa empresa){
            context.Add(empresa);
            await context.SaveChangesAsync();
            return CreatedAtRoute("ObtenerEmpresaPorId", new {id = empresa.Id}, empresa);

        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromBody] Empresa empresa)
        {
            var existeEmpresa = await context.Empresas.AnyAsync(x => x.Id == id);

            if (!existeEmpresa)
            {
                return NotFound();
            }

            empresa.Id = id; 
            context.Update(empresa);
            await context.SaveChangesAsync();
            return NoContent();


        }
        
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var filasBorradas = await context.Empresas.Where(x => x.Id == id).ExecuteDeleteAsync();

            if (filasBorradas == 0) {
                return NotFound();
            }

            return NoContent();
        }

    }
}