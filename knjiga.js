export class Knjiga
{
    constructor(id, naslov, autor, slika, kategorija)
    {
        this.id = id;
        this.naslov = naslov;
        this.autor = autor;
        this.slika = slika;
        this.kategorija = kategorija;
        this.polica = null;
        this.div = null;
    }
}