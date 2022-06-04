let catalogueProduitsEmplacement= document.getElementById("items");

console.log(typeof(catalogueProduitsEmplacement));

function getProducts(){
    return fetch("http://localhost:3000/api/products")
    .then(res=> {
        /* if (!res.ok){
            console.log("titi");
            //throw Error(res.statusText);
            return Promise.reject(res.statusText)
        } */
        
        return res.json()})
    .catch(err=>console.log(err))
}

console.log(getProducts());

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

getProducts().then(products=>{
    //console.log("toto");
    for (let product of products){
        insertArticle(product);
    }
})
//.catch(err=>console.log(err))

