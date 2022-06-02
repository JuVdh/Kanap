let currentURL=document.URL;
let url = new URL(currentURL);
let productID= url.searchParams.get("id");

let produitImageEmplacement= document.getElementsByClassName("item__img");
let produitImage=produitImageEmplacement[0].appendChild(document.createElement("img"));
let produitTitre=document.getElementById("title");
let produitPrix=document.getElementById("price");
let produitDescription=document.getElementById("description");
let listeSelectionCouleur=document.querySelector("select");

function getProduct(id){
    return fetch("http://localhost:3000/api/products/"+id)
    .then(res=> res.json())
    .catch(err=>console.log(err))
}

function insertData(produit){
    produitImage.setAttribute("src",produit.imageUrl);
    produitImage.setAttribute("alt",produit.altTxt);  
    produitTitre.textContent=produit.name;
    produitPrix.textContent=produit.price;
    produitDescription.textContent=produit.description;
}

getProduct(productID).then(product=>{
    insertData(product);
    for (let color of product.colors){
        listeSelectionCouleur.add(new Option(color, color));
    }
})

class Panier{
    constructor (id, color, quantity)
    {
        this.id=id;
        this.color=color;
        this.quantity=quantity;
    }
} 

let dataPanier=JSON.parse(localStorage.getItem('data-panier')) || [];
console.table(typeof(dataPanier));

document.getElementById("quantity").addEventListener("input", function(e){
   inputQuantity=e.target.value;
   console.log(inputQuantity);
})

document.getElementById("colors").addEventListener("change", function(e){
    inputColor=e.target.value;
    console.log(inputColor);
})

document.getElementById("addToCart").addEventListener("click", function(e){
    let myPanier=new Panier(productID,inputColor,inputQuantity);
    console.log("mon panier : ");
    console.log(myPanier); 

    if (dataPanier.length==0){
        dataPanier.push(myPanier);
        console.log("panier vide je dois être rajouté");
        }

    else{
        for (let i=0; i<dataPanier.length;i++){
            if ((((dataPanier[i]).color)==inputColor) && (((dataPanier[i]).id)==productID)) {
                console.log("je suis deja la");
            
                dataPanier[i].quantity=String(parseInt(dataPanier[i].quantity,10)+parseInt(inputQuantity,10));
                i=dataPanier.length;
                
            }
            else{
                console.log("il faut m'ajouter");
                dataPanier.push(myPanier);
                i=dataPanier.length;
            
            }
        }
    }
    localStorage.setItem("data-panier",JSON.stringify(dataPanier));
    //console.log(dataPanier);  
}) 

console.log(dataPanier); 







