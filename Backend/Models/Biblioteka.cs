using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Biblioteka")]
    public class Biblioteka
    {
        [Column("ID")]
        [Key]
        public int Id { get; set; }

        [Column("Ime")]
        [MaxLength(255)]
        public string Ime { get; set; }

        [Column("Adresa")]
        [MaxLength(255)]
        public string Adresa {get; set;}

        [Column("BrojKnjiga")]
        public int BrojKnjiga {get; set;}


        public virtual List<Polica> Police {get; set;}
    }
}