export class Knjiga
{
    constructor(id, naslov, autor, slika, godIzdanja, kategorijaBoja)
    {
        this.id = id;
        this.naslov = naslov;
        this.autor = autor;
        this.slika = slika;
        this.godinaIzdanja = godIzdanja;
        this.polica = null;
        this.div = null;
        this.kategorijaBoja = kategorijaBoja;
    }

    crtajKnjigu(host)
    {
        //div za knjigu
        this.div = document.createElement("div");
        this.div.className = "divKnjiga";
        this.div.style.backgroundColor = this.kategorijaBoja;
        host.appendChild(this.div);
        this.div.onmouseover = (ev) =>
        {
            this.div.title = `Naslov: ${this.naslov}\nAutor: ${this.autor}\nGodina izdanja: ${this.godinaIzdanja}`;
        };

        //Naslov knjige
        let naslovce = document.createElement("h4");
        naslovce.innerHTML = this.naslov;
        this.div.appendChild(naslovce);

        //Autor knjige
        let autorce = document.createElement("p");
        autorce.innerHTML = this.autor;
        this.div.appendChild(autorce);

        //Slika
        let slikica = document.createElement("img");
        slikica.src = this.slika;
        slikica.classList.add("slika");
        this.div.appendChild(slikica);

        //div sa komandama za knjige
        let divZaDugamd = document.createElement("div");
        divZaDugamd.classList.add("divZaDugmad");
        this.div.appendChild(divZaDugamd);

        //dugme za brisanje
        let dugmenceZaBrisanje = document.createElement("button");
        dugmenceZaBrisanje.innerHTML = "🗑️";
        divZaDugamd.appendChild(dugmenceZaBrisanje);
        dugmenceZaBrisanje.onclick = (ev) =>
        {
            //HTTP Request
            fetch("https://localhost:5001/Biblioteka/BrisiKnjigu/" + this.id, {method:"DELETE"}).then(p=>
            {
                if(p.ok)
                {
                    let zaBrisanje = this.polica.knjige.find((el)=>{ return el.id == this.id });
                    this.polica.knjige = this.polica.knjige.filter((el) => {return el.id != zaBrisanje.id});
                    this.div.parentNode.removeChild(this.div);
                }
            });
        };

        //dugme za azuriranje podataka
        let dugmenceZaMenjanje = document.createElement("button");
        dugmenceZaMenjanje.innerHTML = "✏️";
        divZaDugamd.appendChild(dugmenceZaMenjanje);
        dugmenceZaMenjanje.onclick = (ev) =>
        {
            //pribavljanje knjige
            let zaMenjanje = this.polica.knjige.find((el)=>{ return el.id == this.id });
            let txtLabele = ["Naslov", "Autor", "Godina izdanja", "Slika"];
            let tmp = [zaMenjanje.naslov, zaMenjanje.autor, zaMenjanje.godinaIzdanja, zaMenjanje.slika];

            //popunjavanje svih polja
            txtLabele.forEach((el, index) => 
            {
                this.div.parentNode.parentNode.querySelector(`input[name='${el}']`).value = tmp[index];
                
            });
            this.div.parentNode.parentNode.querySelector(`input[name='Kategorija'][value=${zaMenjanje.kategorijaBoja}]`).checked = true;

            //prikaz odgovarajuceg dugmeta
            this.div.parentNode.parentNode.querySelector(".btnDodajKnjigu").classList.add("nestani");
            this.div.parentNode.parentNode.querySelector(".btnAzurirajKnjigu").classList.remove("nestani");
            this.div.parentNode.parentNode.querySelector(".btnAzurirajKnjigu").knjigaID = this.id;

        };
    }


    azurirajKnjigu()
    {
        this.div.querySelector("h4").innerHTML = this.naslov;
        this.div.querySelector("p").innerHTML = this.autor;
        this.div.querySelector(".slika").src = this.slika;
        this.div.style.backgroundColor = this.kategorijaBoja;
    }
}