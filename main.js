const fetchData = async () =>{
    let response = await fetch("../product.json");
    let data = await response.json();

    let courseList = document.querySelector("#course-list");
    courseList.innerHTML = data.map(item =>{
        return `
            <div class="course">
                <img src="${item.image}" alt="${item.title}">
                <h2>${item.title}</h2>
                <p>${item.description}</p>
            </div>
        `
    }).join("");
}

fetchData()