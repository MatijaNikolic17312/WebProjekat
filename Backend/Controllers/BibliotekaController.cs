using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BibliotekaController : ControllerBase
    {

        public BibliotekaContext Kontekst {get; set;}

        public BibliotekaController(BibliotekaContext kontekst)
        {
            Kontekst = kontekst;
        }

        
    }
}