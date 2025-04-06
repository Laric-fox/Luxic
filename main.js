const products = document.querySelector('.products');
const headerAccount = document.querySelector('.header-account');
window.addEventListener('DOMContentLoaded', ()=>{
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser){
        document.getElementById('accountname').innerText = loggedInUser.username;
    }else {
     document.querySelector('header-account').innerHTML = `
     <i class="fa fa-user"></i>
     <p id="accountname">Đăng nhập</p>
     `
   
    }    
});
const letData = async () => {
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
// Hàm lấy dữ liệu từ file JSON
const getData = async () => {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};

// Hàm hiển thị sản phẩm
const displayProducts = (products) => {
    const productList = document.querySelector('.products');
    if (!productList) return; // Kiểm tra xem element có tồn tại không
    
    productList.innerHTML = products.map(item => {
        return `
            <div class="product-item">
                <img src="${item.img}" alt="${item.title}">
                <div class="product-info">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <a href="./pages/detail/detail.htm?id=${item.id}">View</a>
                </div>
            </div>
        `;
    }).join('');
};

// Hàm lọc sản phẩm theo category
const filterProducts = (products, category) => {
    if (category === 'All') {
        displayProducts(products);
    } else {
        const filteredProducts = products.filter(product => product.category === category);
        displayProducts(filteredProducts);
    }
};

// Khởi tạo khi DOM loaded
document.addEventListener('DOMContentLoaded', async () => {
    // Lấy dữ liệu và lưu vào biến toàn cục
    const products = await getData();
    
    // Hiển thị tất cả sản phẩm khi load trang
    displayProducts(products); // TÁCH RA ĐỂ BÂY GIỜ TÁI SỬ DỤNG HÀM HIỂN THỊ SẢN PHẨM

    // Lấy tất cả các nút filter
    // SỬ DỤNG QUERYALL => LẤY TẤT CẢ CÁC SELECTOR
    const filterButtons = document.querySelectorAll('.filter-btns button');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            //KHI NGƯỜI DÙNG NHẤN VÀO NÚT NÀO THÌ THÊM LỚP ACTIVE CHO LỚP ĐÓ => ĐỂ BIỂU THỊ RẰNG LỚP ĐÓ ĐANG ĐƯỢC NHẤN (HOẠT ĐỘNG)
            // Xóa class active từ tất cả các nút
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Thêm class active cho nút được click
            button.classList.add('active');
            
            // Lọc sản phẩm theo category
            const category = button.getAttribute('data-cate');
            // console.log(category)
            filterProducts(products, category);
        });
    });
});
function logout(){
    localStorage.removeItem ('loggedInUser'); 
    document.querySelector('header-account').innerHTML =
    `
    <i class="fa fa-user"></i>
    <p id="accountname">Đăng nhập</p>
    `
    window.location.href='signup.htm'
}
headerAccount.addEventListener("click",logout);
getData();