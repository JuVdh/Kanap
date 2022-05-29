let emplacementPanier=document.getElementById("cart__items");
let panier=emplacementPanier.appendChild(document.createElement("article"));
panier.classList.add("cart__item");
let imagePanier=panier.appendChild(document.createElement("img"));
imagePanier.classList.add("cart__item__img");

var dataID=localStorage.getItem("data-ID");
var dataQuantity=localStorage.getItem("data-quantity");
var dataColor=localStorage.getItem("data-color");

function getProducts(){
    return fetch("http://localhost:3000/api/products")
    .then(res=> res.json())
    .catch(err=>console.log(err))
}

getProducts().then(products=>{
    for (let product of products){
        if ((product._id)==dataID)
        {
            
            imagePanier.setAttribute("src",product.imageUrl);
            imagePanier.setAttribute("alt",product.altTxt);  
        }
    }
})


