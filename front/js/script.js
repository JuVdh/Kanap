let catalogueProduitsEmplacement= document.getElementById("items");

/**
 * Send request using fetch api to ask for all the products
 * @return { Promise }
 */
function getProducts(){
    return fetch("http://localhost:3000/api/products")
    .then(res=> {
        if (!res.ok){
            throw Error("HTTP "+ res.status + " " + res.statusText);
        } 
        return res.json();
    })
}

/**
 * Insert a product in the home page (in the DOM)
 * @param { Object } produit
 */
function insertArticle(produit){

    produitEmplacementLien=catalogueProduitsEmplacement.appendChild(document.createElement("a"));
    produitEmplacementLien.setAttribute("href", "./product.html?id="+produit._id);

    produitEmplacement=produitEmplacementLien.appendChild(document.createElement("article"));

    produitImage=produitEmplacement.appendChild(document.createElement("img"));
    produitImage.setAttribute("src",produit.imageUrl);
    produitImage.setAttribute("alt",produit.altTxt);

    produitNom=produitEmplacement.appendChild(document.createElement("h3"));
    produitNom.textContent=produit.name;

    produitDescription=produitEmplacement.appendChild(document.createElement("p"));
    produitDescription.textContent=produit.description;
}

// Browse the response sent by the request using fetch api and insert each element (each product) in the home page (in the DOM)
getProducts()
.then(products=>{
    for (let product of products){
        insertArticle(product);
    }
})
.catch(err=>{
    console.log(err);
    catalogueProduitsEmplacement.innerHTML="<h1> impossible de récupérer les données </h1>";
})

