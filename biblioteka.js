export class Biblioteka
{
    constructor(id, ime, adresa)
    {
        this.id = id;
        this.ime = ime;
        this.adresa = adresa;
        this.police = new Array();
        this.div = null;
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

        //crtanje div-a za police
        
    }
}