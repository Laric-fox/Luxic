const products = document.querySelector('.products');
const getData = async () => {
    const respone = await fetch ('data.json');
    const data = await respone.json();

    if (data) {
        products.innerHTML =data.map(item => {
            return `
            <div class="product-item">
            <img src="${item.img}" alt="">
            <div class="product-info">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <a href="./pages/detail/detail.htm?id=${item.id}">View</a>
            </div>
        </div>
            `
        }).join('')
    }
}
getData();