import { Biblioteka } from "./biblioteka.js";
import { Knjiga } from "./knjiga.js";
import { Polica } from "./polica.js";

let naslov = document.createElement("title");
naslov.innerHTML = "Biblioteke - Matija Nikolić 17312";
document.head.appendChild(naslov);

fetch("https://localhost:5001/Biblioteka/VratiBiblioteke").then(p=>
{
    p.json().then(podaci => 
    {
        
        podaci.forEach(bibl => 
        {
            let bibliotekica = new Biblioteka(bibl.id, bibl.ime, bibl.adresa, bibl.brojKnjiga);
            bibl.police.forEach(pol => 
            {
                let policica = new Polica(pol.id, pol.slovo);
                policica.biblioteka = bibliotekica;
                bibliotekica.dodajPolice(policica);
                pol.knjige.forEach(knj => 
                {
                    let knjigica = new Knjiga(knj.id, knj.naslov, knj.autor, knj.slika, knj.godinaIzdanja, knj.kategorijaBoja);
                    knjigica.polica = policica;
                    policica.dodajKnjigu(knjigica);
                });
            });
            bibliotekica.crtajBiblioteku(document.body);
        });
    });
});