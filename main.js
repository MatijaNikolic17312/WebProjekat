import { Biblioteka } from "./biblioteka.js";

//dugme za dodavanje nove biblioteke
const btnDodajBiblioteku = document.createElement("button");
btnDodajBiblioteku.classList.add("btnDodajBiblioteku");
btnDodajBiblioteku.innerHTML = "Dodaj biblioteku";
document.body.appendChild(btnDodajBiblioteku);
btnDodajBiblioteku.onclick = (ev) => 
{   
    alert("cao");
};

let biblioteka1 = new Biblioteka(-1, "Stevan Sremac", "Borivoja Gojkovica 15");
biblioteka1.crtajBiblioteku(document.body);