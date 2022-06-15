let orderConfirm=document.getElementById("orderId");

// Get the orderId from the URL using URLSearchParams interface
// The orderId was retrieved in the response of the post request and was passed in the URL

//let currentURL=document.URL;
//let url = new URL(currentURL);

let url=new URL(document.URL);
let orderID= url.searchParams.get("orderId");

// Display the order number in the message on the confirmation page (in the DOM)
orderConfirm.textContent=orderID;

// To empty the shopping cart
localStorage.removeItem("data-panier");