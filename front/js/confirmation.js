let orderConfirm=document.getElementById("orderId");
let currentURL=document.URL;
let url = new URL(currentURL);
let orderID= url.searchParams.get("id");
orderConfirm.textContent=orderID;
