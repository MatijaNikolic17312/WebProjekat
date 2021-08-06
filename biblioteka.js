import { Polica } from "./polica.js";

export class Biblioteka
{
    constructor(id, ime, adresa)
    {
        this.id = id;
        this.ime = ime;
        this.adresa = adresa;
        this.police = new Array();
        this.div = null;

        //this.dodajPolice(new Polica("A"));
        //this.dodajPolice(new Polica("B"));
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
        btnDodajPolicu.innerHTML = "+ Polica";
        btnDodajPolicu.onclick = (ev) =>
        {
            let slovo = prompt("Slovo police");
            //console.log(slovo);

            if(slovo.length != 1 || /\d/.test(slovo))
            {
                alert("SAMO JEDNO SLOVO PLS i bez brojeva pls!");
                return;
            }

            if(this.police.find((el) => {return el.slovo == slovo}) != null)
            {
                alert ("VEC IMAS JENDOG SUKLENDZO!");
                return;
            }

            let novaPolica = new Polica(-1, slovo);
            //console.log(novaPolica);
            novaPolica.biblioteka = this;
            this.dodajPolice(novaPolica);
            novaPolica.crtajPolicu(divPolice);

            if(this.police.length == 5)
                btnDodajPolicu.classList.add("nestani");

        }
        this.div.appendChild(btnDodajPolicu);

        //crtanje div-a za police
        let divPolice = document.createElement("div");
        divPolice.classList.add("divPolice");
        this.div.appendChild(divPolice);

        this.police.forEach(el => 
        {
            el.crtajPolicu(divPolice);
        });

        
    }

    dodajPolice(polica)
    {
        this.police.push(polica);
        //this.police.forEach((el) => {console.log(el)});
    }
}