using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Polica")]
    public class Polica
    {
        [Column("ID")]
        [Key]
        public int Id {get; set;}

        [Column("Slovo")]
        [MaxLength(1)]
        public string Slovo {get; set;}

       
        public Biblioteka PripadaBiblioteci {get; set;}

        public virtual List<Knjiga> Knjige {get; set;}
    }
}