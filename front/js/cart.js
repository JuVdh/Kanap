let emplacementPanier=document.getElementById("cart__items");
let cartQuantity=document.getElementById("totalQuantity");
let cartPrice=document.getElementById("totalPrice");
let dataPanier=JSON.parse(localStorage.getItem("data-panier"));

function getProductPanier(articlePanier){
    return fetch("http://localhost:3000/api/products/"+(articlePanier.id))
    .then(res=> res.json())
    .catch(err=>console.log(err))
}

function insertArticlePanier(productPanier,articlePanier){   

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
    articlePanierCouleur.textContent=articlePanier.color;
    articlePanierPrix=emplacementContenuDescription.appendChild(document.createElement("p"));
    articlePanierPrix.textContent=productPanier.price+" €";
    let emplacementContenuSettings=emplacementContenu.appendChild(document.createElement("div"));
    emplacementContenuSettings.classList.add("cart__item__content__settings");
    let emplacementContenuSettingsQuantite=emplacementContenuSettings.appendChild(document.createElement("div"));
    emplacementContenuSettingsQuantite.classList.add("cart__item__content__settings__quantity");
    articlePanierQuantite=emplacementContenuSettingsQuantite.appendChild(document.createElement("p"));
    articlePanierQuantite.textContent="Qté : ";
    let inputQuantite=emplacementContenuSettingsQuantite.appendChild(document.createElement("input"));
    inputQuantite.classList.add("itemQuantity");
    inputQuantite.setAttribute("type","number");
    inputQuantite.setAttribute("name","inputQuantity");
    inputQuantite.setAttribute("min","1");
    inputQuantite.setAttribute("max","100");
    inputQuantite.setAttribute("value",articlePanier.quantity);
    let emplacementContenuSettingsDelete=emplacementContenuSettings.appendChild(document.createElement("div"));
    emplacementContenuSettingsDelete.classList.add("cart__item__content__settings__delete");
    articlePanierDelete=emplacementContenuSettingsDelete.appendChild(document.createElement("p"));
    articlePanierDelete.classList.add("deleteItem");
    articlePanierDelete.textContent="Supprimer";

    
    inputQuantite.addEventListener("change", function(e){
            articlePanier.quantity=parseInt(e.target.value);
            updateTotal(dataPanier);
    })

    articlePanierDelete.addEventListener("click", function(e){
        for (const i in dataPanier){
            if (dataPanier[i]==articlePanier){
                console.log(dataPanier[i]);
                dataPanier.splice(i,1);
                updateTotal(dataPanier);
                panier.innerHTML='';
                //emplacementPanier.innerHTML='';
                //cartDisplay(dataPanier);
                break;
            }
        }
    })
}

function cartDisplay(panier){
    for (let articlePanier of panier){
        getProductPanier(articlePanier).then(product=>{
             insertArticlePanier(product, articlePanier);
        })
    }
}

function updateTotal(panier){
    let totalPrice=0;
    let totalQuantity=0;
    for (let articlePanier of panier){
        getProductPanier(articlePanier).then(product=>{
            totalQuantity+= articlePanier.quantity;  
            cartQuantity.textContent=totalQuantity;
            totalPrice+=articlePanier.quantity*product.price;
            cartPrice.textContent=totalPrice;
        })
    }
 }

function cartUpdate(panier){
    cartDisplay(panier);
    updateTotal(panier);
}
 
cartUpdate(dataPanier);



