let panier=document.getElementById("cart__items");
let cartQuantity=document.getElementById("totalQuantity");
let cartPrice=document.getElementById("totalPrice");
let dataPanier=JSON.parse(localStorage.getItem("data-panier")) ?? [];

/**
 * Send request using fetch api to ask for all the information of the product "articlePanier" by giving its id
 * @param { Object } articlePanier
 * @return { Promise }
 */
function getProductPanier(articlePanier){
  return fetch("http://localhost:3000/api/products/"+(articlePanier.id))
  .then(res=> res.json())
  .catch(err=>console.log(err))
}

/**
 * Insert all product information in the cart page (in the DOM)
 * retrieved into the api and into the cart page for quantity and color selected 
 * and update the total shopping cart
 * @param { Object } productPanier
 * @param { Object } articlePanier
 */
function insertArticlePanier(productPanier,articlePanier){   

  let article=panier.appendChild(document.createElement("article"));
  article.classList.add("cart__item");

  article.setAttribute("data-id", articlePanier.id);
  article.setAttribute("data-color", articlePanier.color);

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
  inputQuantite.setAttribute("value",articlePanier.quantity);

  let deleteSettings=settings.appendChild(document.createElement("div"));
  deleteSettings.classList.add("cart__item__content__settings__delete");
  articlePanierDelete=deleteSettings.appendChild(document.createElement("p"));
  articlePanierDelete.classList.add("deleteItem");
  articlePanierDelete.textContent="Supprimer";

  // Use the addEventListener method to listen any change on quantity field in order to update the total shopping cart
  inputQuantite.addEventListener("change", function(e){
    let article=e.target.closest("article");
    let itemFound=dataPanier.find(item=> item.id == article.dataset.id && item.color ==article.dataset.color);
    itemFound.quantity=parseInt(e.target.value);

    // check if the quantity is valid and display an alert if not 
    if (itemFound.quantity>=1 && itemFound.quantity<=100){
      localStorage.setItem('data-panier',JSON.stringify(dataPanier));
      updateTotal(dataPanier);
    } else {
      alert("quantité non valide");
    }
  })

  // Use the addEventListener method to listen any click on "Supprimer" text in order to update the total shopping cart in case of deleting an article
  articlePanierDelete.addEventListener("click", function(e){
    let article=e.target.closest("article");
    dataPanier=dataPanier.filter(item=> item.id !== article.dataset.id || item.color !==article.dataset.color);
    updateTotal(dataPanier);
    localStorage.setItem('data-panier',JSON.stringify(dataPanier));
    article.remove();
  })
}

/**
 * Browse the response sent by the request using fetch api and insert all product information in the cart page (in the DOM)
 * @param { Array of Objects } monPanier
 */
function cartDisplay(monPanier){
  for (let articlePanier of monPanier){
    getProductPanier(articlePanier)
    .then(product=>{
      insertArticlePanier(product, articlePanier);
    })
  }
}
  
/**
 * Update the total shopping cart by browsing the entire cart to calculate the total number of items and the total price
 * @param { Array of Objects } monPanier
 */
function updateTotal(monPanier){
  let totalPrice=0;
  let totalQuantity=0;
  for (let articlePanier of monPanier){
    getProductPanier(articlePanier)
    .then(product=>{
      totalQuantity+= articlePanier.quantity;  
      cartQuantity.textContent=totalQuantity;
      totalPrice+=articlePanier.quantity*product.price;
      cartPrice.textContent=totalPrice;
    })
  }
}

/**
 * Update the shopping cart (display and calculation of the total number of items and the total price)
 * @param { Array of Objects } monPanier
 */
function cartUpdate(monPanier){
  cartDisplay(monPanier);
  updateTotal(monPanier);
}
 
cartUpdate(dataPanier);

localStorage.setItem('data-panier',JSON.stringify(dataPanier));

let productsIds=[];
/**
 * Retrieve the ids of the products in the cart to build the array of strings product-ID that must be sent to the back-end
 * @param { Array of Objects } monPanier
 * @return { Array of Strings }
 */
function getIds(monPanier){
  for (const i in monPanier){
    productsIds.push((monPanier[i]).id);
  }
  // create a Set object from the array of strings product-ID to retrieve a set of unique ids values as specified 
  return [...new Set(productsIds)];
}

/**********user data validation**********/

/**
 * Test if the user data (firstName|lastName|address|city|email) are valid using regex
 * @param { String } value
 * @return { Boolean }
 */
function firstNameIsValid(value) {
  return /^[a-zA-Zàâäéèêëïîôöùûüç\s'-]{2,}$/.test(value);
}

function lastNameIsValid(value) {
  return /^[a-zA-Zàâäéèêëïîôöùûüç\s'-]{2,}$/.test(value);
}

function addressIsValid(value) {
  return /^[0-9]*[a-zA-Zàâäéèêëïîôöùûüç\s,'-]{3,}$/.test(value);
}

function cityIsValid(value) {
  return /^[0-9]{1}[1-9]{1}[0-9]{3}[a-zA-Zàâäéèêëïîôöùûüç\s,'-]{2,}$/.test(value);
}

function emailIsValid(value) {
  return /^[a-zA-Z0-9-_\.]+@[a-zA-Z0-9-_\.]+\.[a-zA-Z]{2,}$/.test(value);
}

/**
 * Insert the error message in the cart page (in the DOM) in case of non-valid user data
 * @param { } 
 * @return { HTMLElement }
 */
function getFirstNameErrMsg() {
  return document.getElementById("firstNameErrorMsg");
}
function getLastNameErrMsg() {
  return document.getElementById("lastNameErrorMsg");
}

function getAddressErrMsg() {
  return document.getElementById("addressErrorMsg");
}

function getCityErrMsg() {
  return document.getElementById("cityErrorMsg");
}

function getEmailErrMsg() {
  return document.getElementById("emailErrorMsg");
}

/**
 * Set a "disabled" attribute to the submit button (in the DOM) in case of non-valid user data
 * @param { Boolean } disabled
 */
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

// User data validation and creation of the "contact" object that must be sent to the back-end 
// As specified, for post routes, the "contact" object sent to the server must contain the following fields:
// firstName, lastName, address, city and email

let firstName="";
let lastName="";
let address="";
let city="";
let email="";


// Use the addEventListener method to listen any change on the user data
// Test if these data are valid (send an error message and set a "disabled" attribute to the submit button in the DOM if not
// Create the fields of the "contact" object

document.getElementById("firstName").addEventListener("change", function(e) {
  if (firstNameIsValid(e.target.value)) {
    getFirstNameErrMsg().innerText = "ok";
    disableSubmit(false);
    firstName=e.target.value;
  } else {
    getFirstNameErrMsg().innerText = "veuillez entrer au moins 2 lettres, les chiffres ne sont pas acceptés";
    disableSubmit(true);
  }
});

document.getElementById("lastName").addEventListener("change", function(e) {
  if (lastNameIsValid(e.target.value)) {
    getLastNameErrMsg().innerText = "ok";
    disableSubmit(false);
    lastName=e.target.value;
  } else {
    getLastNameErrMsg().innerText = "veuillez entrer au moins 2 lettres, les chiffres ne sont pas acceptés";
    disableSubmit(true);
  }
});

document.getElementById("address").addEventListener("change", function(e) {
  if (addressIsValid(e.target.value)) {
    getAddressErrMsg().innerText = "ok";
    disableSubmit(false);
    address=e.target.value;
  } else {
    getAddressErrMsg().innerText = "veuillez entrer le numéro en chiffres suivi du nom de la voie";
    disableSubmit(true);
  }
});

document.getElementById("city").addEventListener("change", function(e) {
  if (cityIsValid(e.target.value)) {
    getCityErrMsg().innerText = "ok";
    disableSubmit(false);
    city=e.target.value;
  } else {
    getCityErrMsg().innerText = "veuillez entrer le code postal (5 chiffres) suivi du nom de la ville";
    disableSubmit(true);
  }
});

document.getElementById("email").addEventListener("change", function(e) {
  if (emailIsValid(e.target.value)) {
    getEmailErrMsg().innerText = "ok";
    disableSubmit(false);
    email=e.target.value;
  } else {
    getEmailErrMsg().innerText = "veuillez entrer une adresse email valide";
    disableSubmit(true);
  }
});

// Use the addEventListener method to listen any submit on the cart order form
document.querySelector(".cart__order__form").addEventListener("submit", function(e){

  // The preventDefault method will prevent page refresh (as it is usually done by default in case of submitting a form)
  e.preventDefault();
  
  // Retrieve the "contact" object and the array of strings product ids and create the "dataOrder" object that must be sent to the back-end
  let dataContact={
    firstName:firstName,
    lastName:lastName,
    address:address,
    city:city,
    email:email
  };

  let dataIds=getIds(dataPanier);
  
  let dataOrder={
    contact:dataContact,
    products:dataIds
  };
  
  // Send a post request using fetch api
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      'Accept': 'application/json', 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataOrder)
  }) 
  
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })

  // Retrieve the order ID in the response and redirect the user to the confirmation page by passing the order ID in the url
  .then(data => {
    document.location.href = `confirmation.html?orderId=${data.orderId}`;
  })
   
  .catch((err) => {
    alert ("Erreur : " + err.message);
  })
}) 
    
