let emplacementPanier=document.getElementById("cart__items");
let dataPanier=JSON.parse(localStorage.getItem("data-panier"));
console.log(dataPanier[0].color);

function getProductPanier(articlePanier){
    return fetch("http://localhost:3000/api/products/"+(articlePanier.id))
    .then(res=> res.json())
    .catch(err=>console.log(err))
}



function insertArticlePanier(productPanier){   

    let panier=emplacementPanier.appendChild(document.createElement("article"));
    panier.classList.add("cart__item");
    let emplacementImage=panier.appendChild(document.createElement("div"));
    emplacementImage.classList.add("cart__item__img");
    let imagePanier=emplacementImage.appendChild(document.createElement("img"));
    imagePanier.setAttribute("src",productPanier.imageUrl);
    imagePanier.setAttribute("alt",productPanier.altTxt); 
    let emplacementContenu=panier.appendChild(document.createElement("div"));
    emplacementContenu.classList.add("cart__item__content");
    let emplacementContenuDescription=emplacementContenu.appendChild(document.createElement("div"));
    emplacementContenuDescription.classList.add("cart__item__content__description");
    articlePanierNom=emplacementContenuDescription.appendChild(document.createElement("h2"));
    articlePanierNom.textContent=productPanier.name;
    articlePanierCouleur=emplacementContenuDescription.appendChild(document.createElement("p"));
    //articlePanierCouleur.textContent=
    articlePanierPrix=emplacementContenuDescription.appendChild(document.createElement("p"));
    articlePanierPrix.textContent=productPanier.price+" €";
    let emplacementContenuSettings=emplacementContenu.appendChild(document.createElement("div"));
    emplacementContenuSettings.classList.add("cart__item__content__settings");
    let emplacementContenuSettingsQuantite=emplacementContenuSettings.appendChild(document.createElement("div"));
    emplacementContenuSettingsQuantite.classList.add("cart__item__content__settings__quantity");
    articlePanierQuantite=emplacementContenuSettingsQuantite.appendChild(document.createElement("p"));
    articlePanierQuantite.textContent="Qté : ";
    //input
    let emplacementContenuSettingsDelete=emplacementContenuSettings.appendChild(document.createElement("div"));
    emplacementContenuSettingsDelete.classList.add("cart__item__content__settings__delete");
    articlePanierDelete=emplacementContenuSettingsDelete.appendChild(document.createElement("p"));
    articlePanierDelete.classList.add("deleteItem");
    articlePanierDelete.textContent="Supprimer";


    
}

for (let articlePanier of dataPanier){
getProductPanier(articlePanier).then(product=>{
    insertArticlePanier(product);
})
}


