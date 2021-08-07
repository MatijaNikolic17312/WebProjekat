import { Knjiga } from "./knjiga.js";

export class Polica
{
    constructor(id, slovo)
    {
        this.id = id;
        this.slovo = slovo;
        this.div = null;
        this.biblioteka = null;
        this.knjige = new Array();
    }

    crtajPolicu(host)
    {
        this.div = document.createElement("div");
        this.div.className = "polica";
        this.div.innerHTML = this.slovo;
        host.appendChild(this.div);

        //dugme za brisanje
        let dugmeZaBrisanje = document.createElement("button");
        dugmeZaBrisanje.innerHTML = "🗑️";
        this.div.appendChild(dugmeZaBrisanje);
        dugmeZaBrisanje.onclick = (ev) =>
        {
            let zaBrisanje = this.biblioteka.police.find((el) => 
            {
                return el.slovo == this.slovo;
            });
 
            this.biblioteka.police = this.biblioteka.police.filter((el) => {return el.slovo != zaBrisanje.slovo });

            if(this.biblioteka.police.length < 5)
            {
                this.div.parentNode.parentNode.querySelector("button").classList.remove("nestani");
            }

            this.div.parentNode.removeChild(this.div);
        }

        //div za formu za knjige
        let divZaFormuKnjige = document.createElement("div");
        divZaFormuKnjige.classList.add("divFormKnjige");
        this.div.appendChild(divZaFormuKnjige);

        //div za labele
        let divZaLabele = document.createElement("div");
        divZaLabele.classList.add("divZaLabele");
        divZaFormuKnjige.appendChild(divZaLabele);

        //div za input polja
        let divZaInpute= document.createElement("div");
        divZaInpute.classList.add("divZaInpute");
        divZaFormuKnjige.appendChild(divZaInpute);

        //popunjavanje inputa
        let txtLabele = ["Naslov", "Autor", "Godina izdanja", "Slika"];
        txtLabele.forEach((el, index) => 
        {   
            let labela = document.createElement("label");
            labela.innerHTML = el;
            divZaLabele.appendChild(labela);

            let polje = document.createElement("input");
            if(el === "Godina izdanja")
                polje.type = "number"
            
            polje.name = el;
            divZaInpute.appendChild(polje);
        });

        let dugmeZaDodavanjeKnjige = document.createElement("button");
        dugmeZaDodavanjeKnjige.innerHTML = "Dodaj knjigu";
        dugmeZaDodavanjeKnjige.classList.add("btnDodajKnjigu");
        divZaInpute.appendChild(dugmeZaDodavanjeKnjige);
        dugmeZaDodavanjeKnjige.onclick = (ev) => 
        {
            let unetoNaslov = divZaInpute.querySelector("input[name='Naslov']").value;
            let unetoAutor = divZaInpute.querySelector("input[name='Autor']").value;
            let unetaGodina = parseInt(divZaInpute.querySelector("input[name='Godina izdanja']").value);
            let unetaSlika = divZaInpute.querySelector("input[name='Slika']").value;
            
            let novaKnjiga = new Knjiga(-1, unetoNaslov, unetoAutor, unetaSlika, unetaGodina);
            novaKnjiga.polica = this;
            novaKnjiga.crtajKnjigu(divZaKnjige);
            this.dodajKnjigu(novaKnjiga);
        };

        //div za knjige
        let divZaKnjige = document.createElement("div");
        divZaKnjige.classList.add("divZaKnjige");
        this.div.appendChild(divZaKnjige);

        this.knjige.forEach((el) => 
        {
            el.crtajKnjigu(divZaKnjige);
        });

        

        
        
    }

    dodajKnjigu(knjiga)
    {
        this.knjige.push(knjiga);
    }
}