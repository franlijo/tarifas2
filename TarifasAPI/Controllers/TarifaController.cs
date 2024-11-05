
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TarifasAPI.Entidades;

namespace TarifasAPI.Controllers
{
    [Route("api/tablatarifa")]
    public class TarifaController: ControllerBase
    {
        
        private readonly ApplicationDbContext context;

        public TarifaController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<List<Tarifa>> Get(){
            return  await context.Tarifas.ToListAsync();
    
        }


        // [HttpGet]



        // [HttpPost]


        // [HttpPut]


        // [HttpDelete]
        
    }
}