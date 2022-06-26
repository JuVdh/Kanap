// Get the id of the product to display (the one that was clicked on the home page) from the URL using URLSearchParams interface
let url = new URL(document.URL);
let productID= url.searchParams.get("id");

/**
 * Send request using fetch api to ask for all the information of the product to display
 * @param { String } id
 * @return { Promise }
 */
function getProduct(id){
    return fetch("http://localhost:3000/api/products/"+id)
    .then(res=> res.json())
    .catch(err=>console.log(err))
}

/**
 * Insert all product information retrieved into the api in the product page (in the DOM)
 * @param { Object } produit
 */
function insertData(produit){

    let produitImageEmplacement= document.getElementsByClassName("item__img");

    let produitImage=produitImageEmplacement[0].appendChild(document.createElement("img"));
    produitImage.setAttribute("src",produit.imageUrl);
    produitImage.setAttribute("alt",produit.altTxt);  
    
    document.getElementById("title").textContent=produit.name;
   
    document.getElementById("price").textContent=produit.price;
    
    document.getElementById("description").textContent=produit.description;
}

let listeSelectionCouleur=document.querySelector("select");

// Browse the response sent by the request using fetch api and insert all product information in the product page (in the DOM)
getProduct(productID).then(product=>{
    insertData(product);
    for (let color of product.colors){
        listeSelectionCouleur.add(new Option(color, color));
    }
})

// Create a shopping cart "Panier" class containing 3 fields : id, color and quantity (of the product)
class Panier{
    constructor (id, color, quantity)
    {
        this.id=id;
        this.color=color;
        this.quantity=quantity;
    }
} 

// The total shopping cart "dataPanier" is locally stored using localStorage to make it accessible from the cart page
let dataPanier=JSON.parse(localStorage.getItem('data-panier')) ?? [];

// Use the addEventListener method to listen any click on the "Ajouter au panier" button to update the total shopping cart "dataPanier"
document.getElementById("addToCart").addEventListener("click", function(e){
    
   let inputColor=document.getElementById("colors").value;
   let inputQuantity=parseInt(document.getElementById("quantity").value);

    // check if the options are valid, display an alert if not and prevent the addition to the shopping cart
    if (inputQuantity>=1 && inputQuantity<=100 && inputColor){

        let myPanier=new Panier(productID,inputColor,inputQuantity);

        if (dataPanier.length==0){
            dataPanier.push(myPanier);
        } else {
            let newProduct=true;
            for (const i in dataPanier){

            // if the product to add was already present in the total shopping cart (same id and same color), 
            // we simply increment the quantity of the product in "dataPanier"
                if ((((dataPanier[i]).color)==inputColor) && (((dataPanier[i]).id)==productID)) {
                    dataPanier[i].quantity+=inputQuantity;
                    newProduct=false;
                    break;
                }
            }   

            if (newProduct) {
                dataPanier.push(myPanier);
            }
        }
        localStorage.setItem("data-panier",JSON.stringify(dataPanier));
    } else {
        alert("la quantité ou l'option sélectionnée ne sont pas valides");
    }
}) 









