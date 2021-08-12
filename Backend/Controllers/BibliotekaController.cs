using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BibliotekaController : ControllerBase
    {
        public BibliotekaContext Kontekst { get; set; }

        public BibliotekaController(BibliotekaContext kontekst)
        {
            Kontekst = kontekst;
        }

        [HttpPost]
        [Route("DodajPolicu/{idBibl}")]
        public async Task<IActionResult> DodajPolicu([FromRoute(Name = "idBibl")] int idBiblioteke, [FromBody] Polica nova)
        {
            Biblioteka bibl = await Kontekst.Biblioteke.FindAsync(idBiblioteke);
            nova.PripadaBiblioteci = bibl;
            Kontekst.Police.Add(nova);
            await Kontekst.SaveChangesAsync();
            return Ok(new { dodeljenId = nova.Id });
        }

        [HttpDelete]
        [Route("BrisiPolicu/{idPolice}")]
        public async Task BrisiPolicu(int idPolice)
        {
            Polica zaBrisanje = await Kontekst.Police.FindAsync(idPolice);
            Kontekst.Police.Remove(zaBrisanje);
            await Kontekst.SaveChangesAsync();
        }

        [HttpGet]
        [Route("VratiBiblioteke")]
        public async Task<List<Biblioteka>> VratiBiblioteke()
        {
            return await Kontekst.Biblioteke.Include(x => x.Police).ThenInclude(y => y.Knjige).ToListAsync();
        }

        [HttpPost]
        [Route("DodajKnjigu/{idPolice}")]
        public async Task<IActionResult> DodajKnjigu(int idPolice, [FromBody] Knjiga nova)
        {
            Polica tmp = await Kontekst.Police.FindAsync(idPolice);
            nova.PripadaPolica = tmp;
            Kontekst.Knjige.Add(nova);
            await Kontekst.SaveChangesAsync();
            return Ok(new { dodeljenId = nova.Id });
        }

        [HttpPut]
        [Route("IzmeniKnjigu")]
        public async Task IzmeniKnjigu([FromBody] Knjiga izmena)
        {
            Kontekst.Knjige.Update(izmena);
            await Kontekst.SaveChangesAsync();
        }

        [HttpDelete]
        [Route("BrisiKnjigu/{idKnjige}")]
        public async Task BrisiKnjigu(int idKnjige)
        {
            Knjiga zaBrisanje = await Kontekst.Knjige.FindAsync(idKnjige);
            Kontekst.Knjige.Remove(zaBrisanje);
            await Kontekst.SaveChangesAsync();
        }

    }
}