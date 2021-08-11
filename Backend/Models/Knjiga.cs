using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

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

        [Column("Boja")]
        [MaxLength(30)]
        public string KategorijaBoja {get; set;}

        [JsonIgnore]
        public Polica PripadaPolica {get; set;}
    }
}