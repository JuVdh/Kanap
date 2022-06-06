let panier=document.getElementById("cart__items");
let cartQuantity=document.getElementById("totalQuantity");
let cartPrice=document.getElementById("totalPrice");
let dataPanier=JSON.parse(localStorage.getItem("data-panier"));

function getProductPanier(articlePanier){
    return fetch("http://localhost:3000/api/products/"+(articlePanier.id))
    .then(res=> res.json())
    .catch(err=>console.log(err))
}

function insertArticlePanier(productPanier,articlePanier){   

    let article=panier.appendChild(document.createElement("article"));
    article.classList.add("cart__item");

    let articleImage=article.appendChild(document.createElement("div"));
    articleImage.classList.add("cart__item__img");

    let image=articleImage.appendChild(document.createElement("img")); 
    image.setAttribute("src",productPanier.imageUrl);
    image.setAttribute("alt",productPanier.altTxt); 

    let contenu=article.appendChild(document.createElement("div"));
    contenu.classList.add("cart__item__content");
    
    let description=contenu.appendChild(document.createElement("div"));
    description.classList.add("cart__item__content__description");
    description.appendChild(document.createElement("h2")).textContent=productPanier.name;
    description.appendChild(document.createElement("p")).textContent=articlePanier.color;
    description.appendChild(document.createElement("p")).textContent=productPanier.price+" €";
    
    let settings=contenu.appendChild(document.createElement("div"));
    settings.classList.add("cart__item__content__settings");

    let quantite=settings.appendChild(document.createElement("div"));
    quantite.classList.add("cart__item__content__settings__quantity");
    quantite.appendChild(document.createElement("p")).textContent="Qté : ";
    
    let inputQuantite=quantite.appendChild(document.createElement("input"));
    inputQuantite.classList.add("itemQuantity");
    inputQuantite.setAttribute("type","number");
    inputQuantite.setAttribute("name","inputQuantity");
    inputQuantite.setAttribute("min","1");
    inputQuantite.setAttribute("max","100");
    inputQuantite.setAttribute("value",articlePanier.quantity);

    let deleteSettings=settings.appendChild(document.createElement("div"));
    deleteSettings.classList.add("cart__item__content__settings__delete");
    articlePanierDelete=deleteSettings.appendChild(document.createElement("p"));
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
                article.innerHTML='';
                //panier.innerHTML='';
                //cartDisplay(dataPanier);
                break;
            }
        }
    })
}

function cartDisplay(monPanier){
    for (let articlePanier of monPanier){
        getProductPanier(articlePanier).then(product=>{
             insertArticlePanier(product, articlePanier);
        })
    }
}

function updateTotal(monPanier){
    let totalPrice=0;
    let totalQuantity=0;
    for (let articlePanier of monPanier){
        getProductPanier(articlePanier).then(product=>{
            totalQuantity+= articlePanier.quantity;  
            cartQuantity.textContent=totalQuantity;
            totalPrice+=articlePanier.quantity*product.price;
            cartPrice.textContent=totalPrice;
        })
    }
 }

function cartUpdate(monPanier){
    cartDisplay(monPanier);
    updateTotal(monPanier);
}
 
cartUpdate(dataPanier);
localStorage.setItem("data-panier",JSON.stringify(dataPanier));


/*******validation données utilisateurs *********/
let dataContact=JSON.parse(localStorage.getItem('contact')) ?? [];

function firstNameIsValid(value) {
  return /^[A-Za-z\s'-]{2,}$/.test(value);
}

function lastNameIsValid(value) {
  return /^[A-Za-z\s'-]{2,}$/.test(value);
}

function addressIsValid(value) {
  return /^[0-9]*[a-zA-Z\s,'-]{3,}$/.test(value);
}

function cityIsValid(value) {
  return /^[0-9]{1}[1-9]{1}[0-9]{3}[a-zA-Z\s,'-]{2,}$/.test(value);
}

function emailIsValid(value) {
  return /^[a-zA-Z0-9-_\.]+@[a-zA-Z0-9-_\.]+\.[a-zA-Z]{2,}$/.test(value);
}

function getFirstNameErrMsg(){
    return document.getElementById("firstNameErrorMsg");
}
function getLastNameErrMsg(){
    return document.getElementById("lastNameErrorMsg");
}

function getAddressErrMsg(){
    return document.getElementById("addressErrorMsg");
}

function getCityErrMsg(){
    return document.getElementById("cityErrorMsg");
}

function getEmailErrMsg(){
    return document.getElementById("emailErrorMsg");
}

function disableSubmit(disabled) {
    if (disabled) {
      document
        .getElementById("order")
        .setAttribute("disabled", true);
    } else {
      document
        .getElementById("order")
        .removeAttribute("disabled");
    }
  }

document
  .getElementById("firstName")
  .addEventListener("change", function(e) {
  if (firstNameIsValid(e.target.value)) {
    getFirstNameErrMsg().innerText = "ok";
    disableSubmit(false);
    firstName=e.target.value;
   
  } else {
    getFirstNameErrMsg().innerText = "veuillez entrer au moins 2 lettres, les chiffres ne sont pas acceptés";
    disableSubmit(true);
  }
});

document
  .getElementById("lastName")
  .addEventListener("change", function(e) {
  if (lastNameIsValid(e.target.value)) {
    getLastNameErrMsg().innerText = "ok";
    disableSubmit(false);
    lastName=e.target.value;
    
  } else {
    getLastNameErrMsg().innerText = "veuillez entrer au moins 2 lettres, les chiffres ne sont pas acceptés";
    disableSubmit(true);
  }
});

document
  .getElementById("address")
  .addEventListener("change", function(e) {
  if (addressIsValid(e.target.value)) {
    getAddressErrMsg().innerText = "ok";
    disableSubmit(false);
    address=e.target.value;
    
  } else {
    getAddressErrMsg().innerText = "veuillez entrer le numéro en chiffres suivi du nom de la voie";
    disableSubmit(true);
  }
});

document
  .getElementById("city")
  .addEventListener("change", function(e) {
  if (cityIsValid(e.target.value)) {
    getCityErrMsg().innerText = "ok";
    disableSubmit(false);
    city=e.target.value;
    
  } else {
    getCityErrMsg().innerText = "veuillez entrer le code postal (5 chiffres) suivi du nom de la ville";
    disableSubmit(true);
  }
});

document
  .getElementById("email")
  .addEventListener("change", function(e) {
  if (emailIsValid(e.target.value)) {
    getEmailErrMsg().innerText = "ok";
    disableSubmit(false);
    email=e.target.value;
    
  } else {
    getEmailErrMsg().innerText = "veuillez entrer une adresse email valide";
    disableSubmit(true);
  }
});

function send(e){
  e.preventDefault();
  dataContact.push({
    prenom:firstName,
    nom:lastName,
    adresse:address,
    ville:city,
    adresse_mail:email
});
fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      'Accept': 'application/json', 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataContact)
  }) 
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  }) 
}

document
  .getElementById("order")
  .addEventListener("submit", send)
    


/* document
  .getElementById("firstName")
  .addEventListener("input", function(e) {
  if (/^[A-Za-z\s'-]{2,}$/.test(e.target.value)) {
    getFirstNameErrMsg().innerText = "ok";
    disableSubmit(false);
   
  } else {
    getFirstNameErrMsg().innerText = "veuillez entrer au moins 2 lettres, les chiffres ne sont pas acceptés";
    disableSubmit(true);
  }
});
 */