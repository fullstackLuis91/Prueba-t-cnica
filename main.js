const productsTable = document.querySelector(".products-table");
let currentPage = 1;
const productsPerPage = 5;

const getProducts = async () => {
    const res = await axios.get("https://fakestoreapi.com/products");
    const products = res.data;
    renderProducts(products, currentPage);
    setupPagination(products);
};

const renderProducts = (products, page) => {
    productsTable.innerHTML = ""; 
    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;
    const paginatedProducts = products.slice(start, end);

    paginatedProducts.forEach((product) => {
        productsTable.innerHTML += `
        <div class="card">
            <div class="card-header">${product.category}</div>
            <div class="card-body">
                <h4 class="card-title">${product.title}</h4>
                <img src="${product.image}" alt="${product.title}">
                <p class="card-text">${product.price}€</p>
            </div>
        </div>`;
    });
};

const setupPagination = (products) => {
    const paginationContainer = document.createElement("div");
    paginationContainer.classList.add("pagination");
    const totalPages = Math.ceil(products.length / productsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.innerText = i;
        pageButton.classList.add("page-btn");
        if (i === currentPage) pageButton.classList.add("active");

        pageButton.addEventListener("click", () => {
            currentPage = i;
            renderProducts(products, currentPage);
            document.querySelectorAll(".page-btn").forEach((btn) =>
                btn.classList.remove("active")
            );
            pageButton.classList.add("active");
        });

        paginationContainer.appendChild(pageButton);
    }

    document.body.appendChild(paginationContainer);
};

getProducts();
