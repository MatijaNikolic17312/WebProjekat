import { Knjiga } from "./knjiga.js";

export class Polica
{
    constructor(id, slovo)
    {
        this.id = id;
        this.slovo = slovo[0].toUpperCase();
        this.div = null;
        this.biblioteka = null;
        this.knjige = new Array();
    }


    jelMogucUpis(unetNaslov)
    {
        if(this.biblioteka.brojKnjiga <= this.biblioteka.ukupanBrojKnjiga())
        {
            alert("Puna biblioteka, kapacitet je " + this.biblioteka.brojKnjiga);
            return false;
        }

        if(unetNaslov[0].toUpperCase() !== this.slovo)
        {
            alert("Na ovoj polici samo ređamo knjige koje počinju na slovo " + this.slovo);
            return false;
        }

        return true;

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
            // if(this.biblioteka.brojKnjiga <= this.biblioteka.ukupanBrojKnjiga())
            // {
            //     alert("Puna biblioteka, kapacitet je " + this.biblioteka.brojKnjiga);
            //     return;
            // }

            let unetoNaslov = divZaInpute.querySelector("input[name='Naslov']").value;

            //console.log(this.jelMogucUpis(unetoNaslov));

            if(this.jelMogucUpis(unetoNaslov) === false)
            {
                //console.log("uso");
                return;
            }

            let unetoAutor = divZaInpute.querySelector("input[name='Autor']").value;
            let unetaGodina = parseInt(divZaInpute.querySelector("input[name='Godina izdanja']").value);
            let unetaSlika = divZaInpute.querySelector("input[name='Slika']").value;
            
            let novaKnjiga = new Knjiga(-1, `${unetoNaslov[0].toUpperCase()}${unetoNaslov.slice(1)}`, unetoAutor, unetaSlika, unetaGodina);
            novaKnjiga.polica = this;
            novaKnjiga.crtajKnjigu(divZaKnjige);
            this.dodajKnjigu(novaKnjiga);
            this.resetujFormu(divZaInpute);
            
        };

        let dugmeZaAzuriranjeKnjige = document.createElement("button");
        dugmeZaAzuriranjeKnjige.innerHTML = "Azuriraj knjigu";
        dugmeZaAzuriranjeKnjige.classList.add("btnAzurirajKnjigu");
        dugmeZaAzuriranjeKnjige.classList.add("nestani");
        divZaInpute.appendChild(dugmeZaAzuriranjeKnjige);
        dugmeZaAzuriranjeKnjige.onclick = (ev) => 
        {
            dugmeZaAzuriranjeKnjige.classList.add("nestani");
            dugmeZaDodavanjeKnjige.classList.remove("nestani");

            //console.log(dugmeZaAzuriranjeKnjige.stariNaslov);
            //console.log(this.knjige);

            let zaMenjanje = this.knjige.find(el => {return el.naslov === dugmeZaAzuriranjeKnjige.stariNaslov});

            if(this.jelMogucUpis(divZaInpute.querySelector("input[name='Naslov']").value) === false)
            {
                this.resetujFormu(host);
                return;
            }

            zaMenjanje.naslov = divZaInpute.querySelector("input[name='Naslov']").value;

            

            zaMenjanje.autor = divZaInpute.querySelector("input[name='Autor']").value;
            zaMenjanje.godinaIzdanja = parseInt(divZaInpute.querySelector("input[name='Godina izdanja']").value);
            zaMenjanje.slika = divZaInpute.querySelector("input[name='Slika']").value;
            
            //console.log(zaMenjanje);

            zaMenjanje.azurirajKnjigu();

            this.resetujFormu(host);
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

    resetujFormu(host)
    {
        let txtLabele = ["Naslov", "Autor", "Godina izdanja", "Slika"];
        txtLabele.forEach(el =>
        {
            host.querySelector(`input[name='${el}']`).value = null;
        });
    }

    dodajKnjigu(knjiga)
    {
        this.knjige.push(knjiga);
        //console.log("UPisana");
    }
}