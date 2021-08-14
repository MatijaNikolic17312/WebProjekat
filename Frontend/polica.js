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


    //metoda za proveru da li ima mesta za knjigu i da li naslov odgovara polici
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
        //div za policu
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

            if(confirm("Da li ste sigurni da želite da brišete policu?") == false)
                return;

            //HTTP Request
            fetch("https://localhost:5001/Biblioteka/BrisiPolicu/" + this.id, 
            {
                method: "DELETE"
            }).then(p => 
            {
                if(p.ok)
                {
                    let zaBrisanje = this.biblioteka.police.find((el) => 
                    {
                        return el.id === this.id;
                    });
                    this.biblioteka.police = this.biblioteka.police.filter((el) => {return el.id != zaBrisanje.id });
                    if(this.biblioteka.police.length < 5)
                    {
                        this.div.parentNode.parentNode.querySelector("button").classList.remove("nestani");
                    }
                    this.div.parentNode.removeChild(this.div);
                }
            });
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

        //labela za kategorije
        let labelaZaRadioDugmad = document.createElement("label");
        labelaZaRadioDugmad.innerHTML = "Kategorija";
        divZaLabele.appendChild(labelaZaRadioDugmad);

        //div za radio dugmice
        let divZaRadioDugmad = document.createElement("div");
        divZaRadioDugmad.classList.add("divZaRadioDugmad");
        divZaInpute.appendChild(divZaRadioDugmad);

        //Kategorije, odgovarajuce boje, iscrtavanje istih
        let txtKategorije = ["Beletristika", "Drama", "Horor", "Dečije", "Ostalo"];
        let txtBoje = ["green", "red", "purple", "#0000ff63", "orange"];
        txtKategorije.forEach((el, i) => 
        {
            let radioDugme = document.createElement("input");
            radioDugme.type = "radio";
            radioDugme.name = "Kategorija";
            radioDugme.value = txtBoje[i];
            divZaRadioDugmad.appendChild(radioDugme);

            let labela = document.createElement("labela");
            labela.classList.add("labelaZaRadioDugmad");
            labela.innerHTML = el;
            divZaRadioDugmad.appendChild(labela);
        });


        //dugme za dodavanje knjige
        let dugmeZaDodavanjeKnjige = document.createElement("button");
        dugmeZaDodavanjeKnjige.innerHTML = "Dodaj knjigu";
        dugmeZaDodavanjeKnjige.classList.add("btnDodajKnjigu");
        divZaInpute.appendChild(dugmeZaDodavanjeKnjige);
        dugmeZaDodavanjeKnjige.onclick = (ev) => 
        {
            let unetoNaslov = divZaInpute.querySelector("input[name='Naslov']").value;

            if(this.jelMogucUpis(unetoNaslov) === false)
            {
                return;
            }

            let unetoAutor = divZaInpute.querySelector("input[name='Autor']").value;
            let unetaGodina = parseInt(divZaInpute.querySelector("input[name='Godina izdanja']").value);
            let unetaSlika = divZaInpute.querySelector("input[name='Slika']").value;
            let unetaKategorijaBoja = divZaInpute.querySelector("input[name='Kategorija']:checked").value;
            
            let dodeljenID = -1;

            //HTTP Request
            fetch("https://localhost:5001/Biblioteka/DodajKnjigu/" + this.id, 
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(
                {
                    naslov: `${unetoNaslov[0].toUpperCase()}${unetoNaslov.slice(1)}`,
                    autor: unetoAutor,
                    slika: unetaSlika,
                    godinaIzdanja: unetaGodina,
                    kategorijaBoja: unetaKategorijaBoja
                })
            }).then(p => 
            {
                if(p.ok)
                {
                    p.json().then(q => 
                    {
                        dodeljenID = q.dodeljenId;
                        let novaKnjiga = new Knjiga(dodeljenID, `${unetoNaslov[0].toUpperCase()}${unetoNaslov.slice(1)}`, unetoAutor, unetaSlika, unetaGodina, unetaKategorijaBoja);
                        novaKnjiga.polica = this;
                        novaKnjiga.crtajKnjigu(divZaKnjige);
                        this.dodajKnjigu(novaKnjiga);
                        this.resetujFormu(divZaInpute);
                    });
                    
                }
            });
            
        };

        //dugme za azuriranje knjige
        let dugmeZaAzuriranjeKnjige = document.createElement("button");
        dugmeZaAzuriranjeKnjige.innerHTML = "Azuriraj knjigu";
        dugmeZaAzuriranjeKnjige.classList.add("btnAzurirajKnjigu");
        dugmeZaAzuriranjeKnjige.classList.add("nestani");
        divZaInpute.appendChild(dugmeZaAzuriranjeKnjige);
        dugmeZaAzuriranjeKnjige.onclick = (ev) => 
        {
            dugmeZaAzuriranjeKnjige.classList.add("nestani");
            dugmeZaDodavanjeKnjige.classList.remove("nestani");

            let unetoNaslov = divZaInpute.querySelector("input[name='Naslov']").value;

            if(unetoNaslov[0].toUpperCase() !== this.slovo)
            {
                alert("Na ovoj polici samo ređamo knjige koje počinju na slovo " + this.slovo);
                this.resetujFormu(host);
                return;
            }

            let unetoAutor = divZaInpute.querySelector("input[name='Autor']").value;
            let unetaGodina = parseInt(divZaInpute.querySelector("input[name='Godina izdanja']").value);
            let unetaSlika = divZaInpute.querySelector("input[name='Slika']").value;
            let unetaKategorijaBoja = divZaInpute.querySelector("input[name='Kategorija']:checked").value;

            //HTTP Request
            fetch("https://localhost:5001/Biblioteka/IzmeniKnjigu", 
            {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(
                {
                    id: dugmeZaAzuriranjeKnjige.knjigaID,
                    naslov: unetoNaslov,
                    autor: unetoAutor, 
                    slika: unetaSlika, 
                    godinaIzdanja: unetaGodina, 
                    kategorijaBoja: unetaKategorijaBoja
                })
            }).then(p => 
            {
                if(p.ok)
                {
                    let zaMenjanje = this.knjige.find(el => {return el.id === dugmeZaAzuriranjeKnjige.knjigaID});
                    zaMenjanje.naslov = unetoNaslov;
                    zaMenjanje.autor = unetoAutor; 
                    zaMenjanje.godinaIzdanja = unetaGodina;
                    zaMenjanje.slika = unetaSlika; 
                    zaMenjanje.kategorijaBoja =unetaKategorijaBoja;
                    zaMenjanje.azurirajKnjigu();

                    this.resetujFormu(host);
                }
            });

        };

        //div prostor za knjige
        let divZaKnjige = document.createElement("div");
        divZaKnjige.classList.add("divZaKnjige");
        this.div.appendChild(divZaKnjige);

        //iscrtavanje postojecih knjiga
        this.knjige.forEach((el) => 
        {
            el.crtajKnjigu(divZaKnjige);
        });

    }

    //Nakon uspesnog unosa ili azuriranja praznjenje forma
    resetujFormu(host)
    {
        let txtLabele = ["Naslov", "Autor", "Godina izdanja", "Slika"];
        txtLabele.forEach(el =>
        {
            host.querySelector(`input[name='${el}']`).value = null;
        });

        host.querySelector("input[name='Kategorija']:checked").checked = false;
    }

    dodajKnjigu(knjiga)
    {
        this.knjige.push(knjiga);
    }
}