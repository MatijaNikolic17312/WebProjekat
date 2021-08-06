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
        dugmeZaBrisanje.innerHTML = "BRISI KUCKO BRISI";
        this.div.appendChild(dugmeZaBrisanje);
        dugmeZaBrisanje.onclick = (ev) =>
        {
            // this.biblioteka.police.forEach(element => 
            // {
            //     console.log(element);    
            // });

            let zaBrisanje = this.biblioteka.police.find((el) => 
            {
                return el.slovo == this.slovo;
            });
            //console.log(zaBrisanje);

            this.biblioteka.police = this.biblioteka.police.filter((el) => {return el.slovo != zaBrisanje.slovo });

            //console.log(this.div.parentNode);

            if(this.biblioteka.police.length < 5)
            {
                //console.log(this.div.parentNode);
                this.div.parentNode.parentNode.querySelector("button").classList.remove("nestani");
            }

            this.div.parentNode.removeChild(this.div);
        }

        //div za formu za knjige
        let divZaFormuKnjige = document.createElement("div");
        divZaFormuKnjige.classList.add("divFormKnjige");
        this.div.appendChild(divZaFormuKnjige);

        let divZaLabele = document.createElement("div");
        divZaLabele.classList.add("divZaLabele");
        divZaFormuKnjige.appendChild(divZaLabele);

        let divZaInpute= document.createElement("div");
        divZaInpute.classList.add("divZaInpute");
        divZaFormuKnjige.appendChild(divZaInpute);

        let txtLabele = ["Naslov", "Autor", "Godina izdanja", "Slika"];

        txtLabele.forEach((el, index) => 
        {   
            let labela = document.createElement("label");
            labela.innerHTML = el;
            divZaLabele.appendChild(labela);

            let polje = document.createElement("input");
            if(el === "Godina izdanja")
            {
                polje.type = "number"
            }
            divZaInpute.appendChild(polje);
        });

        let dugmeZaDodavanjeKnjige = document.createElement("button");
        dugmeZaDodavanjeKnjige.innerHTML = "Dodaj knjigu";
        dugmeZaDodavanjeKnjige.classList.add("btnDodajKnjigu");
        divZaInpute.appendChild(dugmeZaDodavanjeKnjige);

        let divZaKnjige = document.createElement("div");
        divZaKnjige.classList.add("divZaKnjige");
        divZaKnjige.innerHTML = "test0";
        this.div.appendChild(divZaKnjige);

        

        
        
    }
}