let catalogueProduitsEmplacement= document.getElementById("items");

console.log(typeof(catalogueProduitsEmplacement));

function getProducts(){
    return fetch("http://localhost:3000/api/products")
    .then(res=> res.json())
    .catch(err=>console.log(err))
}

console.log(getProducts());

getProducts().then(products=>{
    for (let product of products){
        produitEmplacementLien=catalogueProduitsEmplacement.appendChild(document.createElement("a"));
        //produitEmplacementLien.classList.add("items");
        produitEmplacementLien.setAttribute("href", "./product.html?id="+product._id);
        produitEmplacement=produitEmplacementLien.appendChild(document.createElement("article"));
        //produitEmplacement.classList.add("items");
        produitImage=produitEmplacement.appendChild(document.createElement("img"));
        produitImage.setAttribute("src",product.imageUrl);
        produitImage.setAttribute("alt",product.altTxt);
        produitNom=produitEmplacement.appendChild(document.createElement("h3"));
        produitNom.innerHTML=product.name;
        produitDescription=produitEmplacement.appendChild(document.createElement("p"));
        produitDescription.innerHTML=product.description;
    }
})

