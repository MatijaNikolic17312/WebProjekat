using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Knjiga
    {
        
        [Column("ID")]
        [Key]
        public int Id { get; set; }

        [Column("Naslov")]
        [MaxLength(255)]
        public string Naslov { get; set; }

        [Column("Autor")]
        [MaxLength(255)]
        public string Autor { get; set; }

        [Column("Slika")]
        [MaxLength(300)]
        public string Slika { get; set; }

        [Column("GodinaIzdanja")]
        public int GodinaIzdanja {get; set;}

        
        public Polica PripadaPolica {get; set;}
    }
}