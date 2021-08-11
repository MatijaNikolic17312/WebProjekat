using Microsoft.EntityFrameworkCore;


namespace Backend.Models
{
    public class BibliotekaContext : DbContext
    {
        public DbSet<Biblioteka> Biblioteke {get; set;}
        public DbSet<Polica> Police {get; set;}
        public DbSet<Knjiga> Knjige {get; set;}

        public BibliotekaContext(DbContextOptions opcije) : base(opcije)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Polica>().HasMany(p => p.Knjige).WithOne(x => x.PripadaPolica).OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Knjiga>().HasOne(p => p.PripadaPolica).WithMany(x => x.Knjige);
        }
    }
}