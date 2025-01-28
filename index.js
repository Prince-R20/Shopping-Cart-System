//Shopping mall system
let store;
let total = 0;

//getting ui elements
const shelf = document.getElementById("shelf");
const Uicart = document.getElementById("cart");
const cartBox = document.getElementById("cartBox");
const totalelement = document.getElementById("total");
const cartCount  = document.getElementById("cartCount");

const cart = []; // an empty cart

//fectching data from fakestore api
async function getStoreData(){
    try {
        const response = await fetch('https://fakestoreapi.com/products');

        if(!response.ok){
            throw new Error("Unable to fetch store data");
        }
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        store = await getStoreData(); //save the api data here
        if(store != undefined){
            localStorage.setItem("store", JSON.stringify(await store))
        }
    } catch (error) {
        console.error(error)
    }
    
    displayItems()
})

if(cart.length == 0){
    document.getElementById("Info").textContent = "Your cart is empty. Purchase a merchanendise";
}
//function to display all items
function displayItems(){
    store = JSON.parse(localStorage.getItem("store"))
    
    store.forEach(item => {
        item.qty = 1
        createElement(item.image, item.title, item.price)
    })
};
//create each item ui component
function createElement(image, head, amount){
    const divContainer = document.createElement("div");
    const divImg = document.createElement("div");
    const title = document.createElement("p");
    const price = document.createElement("p");
    const buttons = document.createElement("button");

    divContainer.className = "anItem"
    divImg.className = "itemImg";
    title.className = "itemName";
    price.className = "price";

    title.textContent = head;
    price.textContent = `$${amount}`
    buttons.textContent = `Add to Cart 🛒`

    buttons.addEventListener("click", () => {
        addItem(head);
    })

    divImg.style.backgroundImage = `url("${image}")`

    divContainer.appendChild(divImg);
    divContainer.appendChild(title);
    divContainer.appendChild(price);
    divContainer.appendChild(buttons);
    shelf.appendChild(divContainer);
}

//creating elements for cart ui
function createAnotherElement(image, head, pricing,qty){
    const divContainer = document.createElement("div");
    const divImg = document.createElement("div");
    const title = document.createElement("p");
    const quantity = document.createElement("p");
    const button = document.createElement("button");

    title.innerHTML = `${head} <br> <span class="itemPrice">$${pricing}</span>`;
    divImg.style.backgroundImage = `url("${image}")`;
    quantity.innerHTML = `QTY: <span id="${head}">${qty}</span>`;
    button.textContent = "Remove";

    divContainer.className = "divContainer";
    divContainer.id = head+"container";

    divImg.className = "itemImg"
    button.className="removeBtn"
    quantity.className= "quantity";

    button.addEventListener("click", () => {
        removeItem(head)
    })

    divContainer.append(divImg);
    divContainer.append(title);
    divContainer.append(quantity);
    divContainer.append(button);
    Uicart.append(divContainer);
}

//function to add items to cart
function addItem(name){
    // Cghange the empty cart message to indicate there are now items
    if(cart.length == 0){
        document.getElementById("Info").textContent = "Here are the items in your cart;"
        document.getElementById("Checkout").style.display = "block";
    }

    // iterating through the items to see if the item clicked  is available
    const item = store.find(item => {
        if(item.title == name){
            return item;
        }
    });

    if(item != undefined){
        const itemCart = cart.find(item => {
            if(name == item.title){
                return item
            }
        })
        if(itemCart != undefined){
            const qty = document.getElementById(`${name}`);
            itemCart.qty++
            qty.textContent = itemCart.qty;
            totalCost()
        }else{
            cart.push(item);
            createAnotherElement(item.image, item.title, item.price, item.qty);
            totalCost()
        }
    }
    cartCount.textContent = cart.length;
}

//function to remove item from cart
function removeItem(search){
    const itemIndex = cart.findIndex(item => {
        if(item.title == search){return true}})
        
    cart.forEach(item => {
        if(item.qty == 1){
            removeItemfromUI(search)
            cart.splice(itemIndex, 1);
        }else if(item.qty > 1){
            const qty = document.getElementById(`${search}`);
            item.qty--
            qty.textContent = item.qty;
        }
    })
    totalCost()
    if(cart.length == 0){
        document.getElementById("Info").textContent = "Your cart is empty. Purchase a merchandize"
        document.getElementById("Checkout").style.display = "none";
    }
    cartCount.textContent = cart.length;
}

function removeItemfromUI(deletingItem){
    const cartt = document.getElementById("cart")
    const itemracks = document.querySelectorAll(".divContainer");

    itemracks.forEach(itemrack => {
        if(itemrack.id == deletingItem+"container"){
            cartt.removeChild(itemrack)
        }
    })
}

//function to calculate total cost
function totalCost(){
    total = 0;
    cart.forEach(item => {
        total += item.price * item.qty
        total = Number(total.toFixed(2));
    })
    totalelement.textContent = `$${total}`
}

//checkout function
function checkOut(){
    window.alert(`You have successful purchase merch worth $${total}. Thank you for your patronage`)
}