//Shopping mall system
let store;
let total = 0;

//getting ui elements
const shelf = document.getElementById("shelf");
const Uicart = document.getElementById("cart");
const cartBox = document.getElementById("cartBox")

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

    store = await getStoreData(); //save the api data here
    displayItems()
})

if(cart.length == 0){
    document.getElementById("Info").textContent = "Your cart is empty. Purchase a merchanendise";
}
//function to display all items
function displayItems(){
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
    const button = document.createElement("button");

    divContainer.className = "anItem"
    divImg.className = "itemImg";
    title.className = "itemName";
    price.className = "price";

    title.textContent = head;
    price.textContent = `$${amount}`
    button.textContent = `Add to Cart 🛒`

    button.addEventListener("click", () => {
        addItem(head);
    })

    divImg.style.backgroundImage = `url("${image}")`

    divContainer.appendChild(divImg);
    divContainer.appendChild(title);
    divContainer.appendChild(price);
    divContainer.appendChild(button);
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
    divImg.className = "itemImg"
    button.className="removeBtn"
    quantity.className= "quantity";

    button.addEventListener("click", removeItem())

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
        }else{
            cart.push(item);
            createAnotherElement(item.image, item.title, item.price, item.qty);
        }
    }
}

//function to remove item from cart
function removeItem(search){
    if(search != undefined && isNaN(search) && search != ""){
        const itemIndex = cart.findIndex(item => {
            if(item.title == search){return true}
        })
        
        switch (itemIndex) {
            case -1:
                console.log("Item not found");
                break;
            default:
                cart.splice(itemIndex, 1)
                showCartItem()
                totalCost();
                break;
        }
    }else if(search != undefined &&
                search !== "" &&
                search < cart.length &&
                search > -1
            ){
        cart.splice(search, 1)
        showCartItem()
        totalCost();
    }else{
        console.log("Item not found");
    }
}

//function to calculate total cost
function totalCost(){
    total = 0;
    cart.forEach(item => {
        total += item.price
        total = Number(total.toFixed(2))
    })
    console.log(`%ctotal: $${total}`, `background-color: red; color: white;`)
}

//function to display items iin the cart
function showCartItem(){
    if(cart.length <= 0){
        console.log(`Cart is empty`)
    }
    cart.forEach(item => {
        console.log(`Title: ${item.title} Price: ${item.price}`)
    })
}