//Shopping mall system
let store;
let total = 0;

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
    //console.log(store)
    //displayItems()
    addItem("Opna Women's Short Sleeve Moisture");
    addItem("Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ")
    addItem("Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin")
    addItem("MBJ Women's Solid Short Sleeve Boat Neck V ");
    addItem('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops')
    showCartItem()
    totalCost();
    removeItem('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops')
    removeItem(2)
})

//function to display all items
function displayItems(){
    store.forEach(item => {
        console.log(`Title: ${item.title} Price: $${item.price}`)
    })
};

//function to add items to cart
function addItem(name){
    const item = store.find(item => {
        if(item.title == name){
            return item;
        }
    });

    switch (item != undefined) {
        case true:
            cart.push(item)
            break;
        case false:
            console.log(`Item: ${name} not found`)
            break;
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