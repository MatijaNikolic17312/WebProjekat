import { Polica } from "./polica.js";

export class Biblioteka
{
    constructor(id, ime, adresa, brojKnjiga)
    {
        this.id = id;
        this.ime = ime;
        this.adresa = adresa;
        this.police = new Array();
        this.div = null;
        this.brojKnjiga = brojKnjiga;
    }

    crtajBiblioteku(host)
    {
        //crtanje okivira biblioteke
        this.div = document.createElement("div");
        this.div.classList.add("divBiblioteka");
        host.appendChild(this.div);
        
        //crtanje naslova
        let elNaslov = document.createElement("h2");
        elNaslov.innerHTML = `${this.ime}, ${this.adresa}`;
        this.div.appendChild(elNaslov);

        //crtanje dodvanja police
        let btnDodajPolicu = document.createElement("button");
        btnDodajPolicu.innerHTML = "➕";
        btnDodajPolicu.onclick = (ev) =>
        {
            let slovo = prompt("Slovo police");
            slovo = slovo[0].toUpperCase();
            
            //provera da li je uneto samo jedno slovo
            if(slovo.length != 1 || /\d/.test(slovo))
            {
                alert("Molimo Vas unesite samo jedno slovo, i da uneti karakter nije broj");
                return;
            }

            //provera da li se slucajno ne dodaje polica sa vec postojecim slovom
            if(this.police.find((el) => {return el.slovo == slovo}) != null)
            {
                alert ("Vec postoji polica sa tim slovom");
                return;
            }

            let dodeljenID = -1;

            //HTTP Request
            fetch("https://localhost:5001/Biblioteka/DodajPolicu/" + this.id, 
            {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({slovo: slovo})
            }).then(p => 
            {
                if(p.ok)
                {
                    p.json().then(q => 
                    {
                        dodeljenID = q.dodeljenId; 
                        let novaPolica = new Polica(dodeljenID, slovo);
                        console.log(novaPolica);
                        novaPolica.biblioteka = this;
                        this.dodajPolice(novaPolica);
                        novaPolica.crtajPolicu(divPolice);

                        if(this.police.length == 5)
                            btnDodajPolicu.classList.add("nestani");
                    });
                    

                }
            });

        }
        this.div.appendChild(btnDodajPolicu);

        //crtanje div-a za police
        let divPolice = document.createElement("div");
        divPolice.classList.add("divPolice");
        this.div.appendChild(divPolice);

        //iscrtavanje polica
        this.police.forEach(el => 
        {
            el.crtajPolicu(divPolice);
        });

        
    }

    dodajPolice(polica)
    {
        this.police.push(polica);
    }

    ukupanBrojKnjiga()
    {
        let ukupno = 0;
        this.police.forEach(el =>
        {
            ukupno += el.knjige.length;
        });
        return ukupno;
    }
}