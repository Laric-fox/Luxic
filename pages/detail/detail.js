const detailContainer = document.querySelector('.detail-container');
const btnAddCart = document.getElementById('addcart');
const cartIcon = document.querySelector('.cart');
window.addEventListener('DOMContentLoaded', ()=>{
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser){
        document.getElementById('accountname').innerText = loggedInUser.username;
    }    
})
const getDetailProduct = async () => {
    const path = new URLSearchParams(window.location.search);
    const productId = path.get ('id');
    const respone = await fetch('../../data.json');
    const data = await respone.json();
    const findProductId = data.find (item => item.id.toString() === productId.toString())

    detailContainer.innerHTML =`
     <div class="detail">
            <div class="detail-image">
                <img src="../../${findProductId.img}" alt="">
            </div>
            <div class="detail-info">
                <h2>${findProductId.title}</h2>
                <p>${findProductId.description}</p>
                <div class="detail-price">
                    Price:
                    <span class="price">${findProductId.cost} VND</span>
                </div>
                <br><br>
                <button class="btn-add" id="addCart">Add to cart</button>
            </div>
        </div>
    `
    const btnAddCart = document.getElementById('addCart');
    btnAddCart.addEventListener('click',()=> {
        const cart = JSON.parse(localStorage.getItem('cart'));
        const users = JSON.parse(localStorage.getItem('users'));

        if(!users){
            alert("Ôi bạn oiiiii! Đăng nhập đi rồi chúng ta tính tiếp");
            window.location.href="../../LoginSignup/signup.htm";
        }
        if(cart){
            const item = cart.findIndex(item => item.id === findProductId.id);

            if (item !== -1) {
                cart[item].count += 1;
            }else {
                cart.push({id: findProductId.id, count: 1});
            }
            localStorage.setItem('cart',JSON.stringify(cart));
        }else {
            const cart =[
                {
                    id:findProductId.id,
                    count: 1
                }
            ]
            localStorage.setItem('cart',JSON.stringify(cart));
        }
        setCartItem();
    });
}
const setCartItem= () =>{
    const cart =JSON.parse(localStorage.getItem('cart'));

    if(cart && cart.length > 0 ){
        cartIcon.innerHTML=`
         <p class="cart-items">${cart.length}</p>
                <i class="fa fa-shopping-basket"></i>
        `
    }
}
setCartItem(); 
getDetailProduct();