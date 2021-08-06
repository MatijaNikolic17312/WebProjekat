export class Polica
{
    constructor(slovo)
    {
        this.slovo = slovo;
        this.div = null;
        this.biblioteka = null;
    }

    crtajPolicu(host)
    {
        this.div = document.createElement("div");
        this.div.className = "polica";
        this.div.innerHTML = this.slovo;
        host.appendChild(this.div);

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
        
    }
}