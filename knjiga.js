export class Knjiga
{
    constructor(id, naslov, autor, slika, godIzdanja)
    {
        this.id = id;
        this.naslov = naslov;
        this.autor = autor;
        this.slika = slika;
        this.godinaIzdanja = godIzdanja;
        this.polica = null;
        this.div = null;
    }

    crtajKnjigu(host)
    {
        this.div = document.createElement("div");
        this.div.className = "divKnjiga";
        host.appendChild(this.div);
        this.div.onmouseover = (ev) =>
        {
            this.div.title = `Naslov: ${this.naslov}\nAutor: ${this.autor}\nGodina izdanja: ${this.godinaIzdanja}`;
        };

        let naslovce = document.createElement("h4");
        naslovce.innerHTML = this.naslov;
        this.div.appendChild(naslovce);

        let autorce = document.createElement("p");
        autorce.innerHTML = this.autor;
        this.div.appendChild(autorce);

        let slikica = document.createElement("img");
        slikica.src = this.slika;
        slikica.classList.add("slika");
        this.div.appendChild(slikica);

        let dugmenceZaBrisanje = document.createElement("button");
        dugmenceZaBrisanje.innerHTML = "🗑️";
        this.div.appendChild(dugmenceZaBrisanje);
        dugmenceZaBrisanje.onclick = (ev) =>
        {
            let zaBrisanje = this.polica.knjige.find((el)=>{ return el.naziv == this.naziv });
            this.polica.knjige = this.polica.knjige.filter((el) => {return el.naziv != this.naziv});
            this.div.parentNode.removeChild(this.div);
        };
    }
}