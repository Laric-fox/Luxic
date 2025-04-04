let container = document.querySelector('.container');
let cartContainer = document.querySelector('.cart-container')
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartSummary = document.querySelector('.cart-summary')
const renderCartItem = async () =>{
    const response = await fetch('../../data.json');
    const data = await response.json();
    if (cart.length !==0){
        return (cartContainer.innerHTML = cart.map(itemCart => {
            let search = data.find(itemData => itemData.id === itemCart.id) || [];
            return `
             <div class="cart-part">
                <div class="cart-img">
                    <img src="../../${search.img}" alt="">
                </div>
                <div class="cart-desc">
                    <h3>${search.title}</h3>
                </div>
                <div class="cart-quantity">
                    <input onchange="update(${search.id})" type="number" min="0" value="${itemCart.count}" id="${search.id}">
                </div>
                <div class="cart-price">
                    <h4>${search.cost}</h4>
                </div>
                <div class="cart-total">
                    <h4>${search.cost * itemCart.count} VND</h4>
                </div>
                <div class="cart-remove">
                    <button>Remove</button>
                </div>
            </div>
            `
        }).join('')
    )
    }else {
        return container.innerHTML =`
        <div class="cart-empty">
        <h2>Empty Cart ;-;</h2>
        <h5>yooh buy somethingggg</h5>
        <a href="../../index.htm"><button class="HomeBtn">Back to home</button></a>
    </div>'
        `
    }
}
let update = (id) =>{
    if (cart.length !== 0){
        let searchIndex = cart.findIndex(itemCart => itemCart.id === id);

        if(searchIndex !== -1){
            let quantityElement = document.getElementById(id);
            if(quantityElement){
                cart[searchIndex].count = parseInt(quantityElement.value,10) || 0;

                localStorage.setItem('cart',JSON.stringify(cart));

                renderCartItem();
            }
        }
    }

}
let totalProducts = async () => {
    let response =await fetch('../../data.json');
    let data = await response.json();
    
    if(cart.length !== 0){
        let total = cart.map(item =>{
            let search = data.fine(itemData => itemData.id === item.id) || [];
            return item.count * search.cost;
        }).reduce((x,y)=> x+y,0);
        cartSummary.innerHTML = `
         <div class="porduct-total">
                <h2>Total Product: <span id="total"> ${total}</span></h2>
            </div>
            <div class="product-checkout">
                <a href="../checkout/checkout.htm" class="checkout">Checkout</a>
            </div>
            <button class="removeAll">Clear Cart</button>`
    }else return;
}
renderCartItem();
totalProducts();