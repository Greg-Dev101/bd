import collections from "../data/series.js"
console.log(collections.get("3"))


import author from "../data/auteurs.js"
console.log(author.get("10"))

class Albums {
    constructor(id, titre, numéro, idSerie, idAuteur, prix, enStock) { // Comment intégrer l'image
         
        this.id = id;
        this.titre = titre;
        this.numéro = numéro;
        this.idSerie = idSerie; 
        this.idAuteur = idAuteur;
        this.prix = prix;
        this.enStock = enStock;
    }

    getAuteursById () {
        return author.get(this.idAuteur.toString())
    }

    getSeriesById () {
        return collections.get(this.idSerie.toString())
    }
    
};

let Album1 = new Albums(1, "Croc vert", 23, 6, 13, "24.50", true);
//const auteur = Album1.getAuteursById()
//console.log(serie)
//console.log(auteur)

let Album2 = new Albums(2, "Wolf", 23, 6, 13, "30", false);
let Album3 = new Albums(3, "Spirit", 10, 5, 8, "45", true);

const tableau = [Album1, Album2, Album3];
console.log(tableau)

const cardList = document.getElementById('bdList');
cardList.classList.add("row", "row-col-2", "row-cols-md-4", "px-3"); 

for(let i = 0; i < tableau.length; i++) {
    let divInter1 = document.createElement("div");
    divInter1.classList.add("col", "mb-4");


    console.log(tableau[i].getAuteursById().nom)
    let divInter2 = document.createElement("div");
    divInter2.classList.add("card", "p-2", "filterDiv", tableau[i].getAuteursById().nom, tableau[i].getSeriesById().nom); // NE MARCHE PAS - Intégrer automatiquement une class Auteur + Série
// Créer automatiquement le bouton/lien de l'auteur ou de la serie dans les outils de filtrage

    let newDiv = document.createElement("div");
    newDiv.classList.add("card-body", "text-center");

    let newTitle = document.createElement("h5");
    newTitle.classList.add("card-title");
    newTitle.innerHTML = `${tableau[i].titre}`;
    
    let newAuteur = document.createElement("h6");
    newAuteur.classList.add("card-subtitle", "auteur");
    newAuteur.innerHTML = `Id auteur : ${tableau[i].getAuteursById().nom}`; // bug si ajout .nom

    let newSerie = document.createElement("h6");
    newSerie.classList.add("card-subtitle", "serie", "mt-2");
    newSerie.innerHTML = `${tableau[i].getSeriesById().nom}`; 

    let newPrix = document.createElement("h6");
    newPrix.classList.add("card-title", "mt-2");
    newPrix.innerHTML = `${tableau[i].prix} €`;

    let newParagraphe = document.createElement("p");
    newParagraphe.innerHTML = "<a href=#>Ajouter au panier";
    newParagraphe.classList.add("btn", "btn-dark");

    let newEnStock = document.createElement("div");
        const isStock = tableau[i].enStock ? 'En stock' : 'Indisponible'
        const couleur = isStock === "En stock" ? "bg-success" : "bg-danger"
        newEnStock.classList.add("card-footer", couleur, "text-white", "text-center");
    newEnStock.innerHTML = isStock;
    

    
    newDiv.appendChild(newTitle);
    newDiv.appendChild(newAuteur);
    newDiv.appendChild(newSerie);
    newDiv.appendChild(newPrix);
    newDiv.appendChild(newParagraphe);

    divInter2.appendChild(newDiv);
    divInter2.appendChild(newEnStock);
    divInter1.appendChild(divInter2);
    cardList.appendChild(divInter1);

}

// Concerne les outils de filtrage

filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1); 
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current control button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

/*
for(let i = 0; i < tableau.length; i++) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("Bd");

    let newCardBody = document.createElement("div");
    newCardBody.classList.add("card-body");
    newCardBody.innerText = `ID : ${tableau[i].id}
    Titre : ${tableau[i].titre}
    Numéro : ${tableau[i].numéro}
    ID Série : ${tableau[i].idSerie}`;

    newDiv.append(newCardBody);
    
    body.append(newDiv);
}
*/
