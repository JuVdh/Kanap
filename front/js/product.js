var currentURL=document.URL;
var url = new URL(currentURL);
var productID= url.searchParams.get("id");

let produitImageEmplacement= document.getElementsByClassName("item__img");
let produitImage=produitImageEmplacement[0].appendChild(document.createElement("img"));
let produitTitre=document.getElementById("title");
let produitPrix=document.getElementById("price");
let produitDescription=document.getElementById("description");
let listeSelectionCouleur=document.querySelector("select");

//console.log(typeof(listeSelectionCouleur));

function getProducts(){
    return fetch("http://localhost:3000/api/products")
    .then(res=> res.json())
    .catch(err=>console.log(err))
}

getProducts().then(products=>{
    for (let product of products){
        if ((product._id)==productID)
        {
            console.log(product._id);
            console.log(product.imageUrl); 
            produitImage.setAttribute("src",product.imageUrl);
            produitImage.setAttribute("alt",product.altTxt);  
            produitTitre.innerHTML=product.name;
            produitPrix.innerHTML=product.price;
            produitDescription.innerHTML=product.description;

            for (let i=0;i<product.colors.length;i++){
                var newOption=new Option(product.colors[i],product.colors[i]);
                listeSelectionCouleur.options[i+1]=newOption;
            }
            
        } 
       
    }
})



 


