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

        let divZaDugamd = document.createElement("div");
        divZaDugamd.classList.add("divZaDugmad");
        this.div.appendChild(divZaDugamd);

        let dugmenceZaBrisanje = document.createElement("button");
        dugmenceZaBrisanje.innerHTML = "🗑️";
        divZaDugamd.appendChild(dugmenceZaBrisanje);
        dugmenceZaBrisanje.onclick = (ev) =>
        {
            let zaBrisanje = this.polica.knjige.find((el)=>{ return el.naslov == this.naslov });
            console.log(this, zaBrisanje);
            this.polica.knjige = this.polica.knjige.filter((el) => {return el.naslov != zaBrisanje.naslov});
            this.div.parentNode.removeChild(this.div);
        };

        let dugmenceZaMenjanje = document.createElement("button");
        dugmenceZaMenjanje.innerHTML = "✏️";
        divZaDugamd.appendChild(dugmenceZaMenjanje);
        dugmenceZaMenjanje.onclick = (ev) =>
        {
            //console.log(dugmenceZaMenjanje);
            //console.log(this);
            //console.log(this.polica.knjige.find((el)=>{console.log(el.naslov, this.naslov); return el.naslov === this.naslov }));
            let zaMenjanje = this.polica.knjige.find((el)=>{ return el.naslov == this.naslov });
            // console.log(zaMenjanje);
            // //console.log(this.div.parentNode.parentElement.querySelector("input[name='Naslov']"));
            // // this.div.parentNode.parentElement.querySelector("input[name='Naslov']").value = zaMenjanje.naslov;
            // // this.div.parentNode.parentElement.querySelector("input[name='Autor']").value = zaMenjanje.naslov;
            // // this.div.parentNode.parentElement.querySelector("input[name='Naslov']").value = zaMenjanje.naslov;
            // // this.div.parentNode.parentElement.querySelector("input[name='Naslov']").value = zaMenjanje.naslov;

            let txtLabele = ["Naslov", "Autor", "Godina izdanja", "Slika"];
            let tmp = [zaMenjanje.naslov, zaMenjanje.autor, zaMenjanje.godinaIzdanja, zaMenjanje.slika];

            txtLabele.forEach((el, index) => 
            {
                this.div.parentNode.parentElement.querySelector(`input[name='${el}']`).value = tmp[index];
                //console.log(tmp[index]);
            });

            this.div.parentNode.parentNode.querySelector(".btnDodajKnjigu").classList.add("nestani");
            this.div.parentNode.parentNode.querySelector(".btnAzurirajKnjigu").classList.remove("nestani");
            this.div.parentNode.parentNode.querySelector(".btnAzurirajKnjigu").stariNaslov = zaMenjanje.naslov;

        };
    }


    azurirajKnjigu()
    {
        //console.log(this);
        this.div.querySelector("h4").innerHTML = this.naslov;
        this.div.querySelector("p").innerHTML = this.autor;
        this.div.querySelector(".slika").src = this.slika;
    }
}