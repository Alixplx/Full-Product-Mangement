let productsElement = document.querySelector('.products')
let cartProductMenu = document.querySelector('.carts-products')
let cartProductElement = document.querySelector('.carts-products div')
let badgeElement = document.querySelector('.badge')
let shoppingCartIconElement = document.querySelector('.shoppingCart')
let noProductElement = document.querySelector('.noProducts')

// Open Cart Menu

shoppingCartIconElement.addEventListener('click', openCartMenu)

// List Product In Home page

function createProduct(product = []) {

    if (JSON.parse(localStorage.getItem('products')).length === 0) {

        noProductElement.innerHTML = 'There is no Products Here. You Can Add From + Icon Below'
    }

    let productsUi = product.map((item) => {

        return `
    
            <div class="product-item">
    
                    <img src="${item.imageUrl}" alt="Image" class="product-item-img">
    
                    <div class="product-item-desc">
    
                        <a onclick="saveItemData(${item.id})">${item.title}</a>
                        <p>${item.desc}</p>
                        <span>${item.size}</span>
                        <br>
                        <button class='edit-product' onclick='editProduct(${item.id})'>Edit Product</button>
                        <button class='delete-product' onclick='deleteProduct(${item.id})'>Delete Product</button>
                    </div>
    
                    <div class="product-item-actions">
    
                    <button class="add-to-cart" onclick="addToCart(${item.id})">Add To Cart</button>
                        <i class="favorite far fa-heart" 
                            style="color: ${item.liked == true ? "red" : ""}" onclick="addToFavorite(${item.id})">
                        </i>
                    </div>
            </div> `
    })

    productsElement.innerHTML = productsUi.join("");
}

createProduct(JSON.parse(localStorage.getItem('products')))

// Check if there is items in localStorage

let addedItem = localStorage.getItem('productsInCart') ? JSON.parse(localStorage.getItem('productsInCart')) : []

if (addedItem) {

    addedItem.map((item) => {

        cartProductElement.innerHTML += `<p>${item.title} ${item.qty}</p>`
    })

    badgeElement.style.display = "block"
    badgeElement.innerHTML += addedItem.length
}

// Add To Cart

function addToCart(id) {

    if (localStorage.getItem('username')) {

        let getProductId = JSON.parse(localStorage.getItem('products'))
        let choosenItem = getProductId.find((item) => item.id === id)

        // Do Not Repeat The Same Item In Cart List
        let isItemInCart = addedItem.some((i) => i.id === choosenItem.id)

        if (isItemInCart) {

            addedItem = addedItem.map((item) => {

                if (item.id === choosenItem.id) item.qty += 1
                return item
            })

        } else {

            addedItem.push(choosenItem)
        }

        cartProductElement.innerHTML = ""

        addedItem.forEach((item) => {

            cartProductElement.innerHTML += `<p>${item.title} ${item.qty}</p>`
        })

        // Save Data
        localStorage.setItem('productsInCart', JSON.stringify(addedItem))

        // Add Counter of Items
        let cartProductsitems = document.querySelectorAll('.carts-products div p')
        badgeElement.style.display = "block"
        badgeElement.innerHTML = cartProductsitems.length
        
    } else {

        window.location = 'login.html'
    }
}

// Get Unique Cart Item From LocalStorage

function getUniqueCartItems(arr, id) {

    let unique = arr.map(item => item[id])
                .map((item, index, finalArr) => finalArr.indexOf(item) === index && index)
                .filter((item) => arr[item])
                .map((item) => arr[item])

    return unique
}


// Open Cart Menu

function openCartMenu() {

    if (cartProductElement.innerHTML != "") {
        
        if (cartProductMenu.style.display == "block") {

            cartProductMenu.style.display = "none"

        } else {

            cartProductMenu.style.display = "block"
        }
    }    
}


// Prepare Item Data and Jump It To Another Screen

function saveItemData(id) {

    localStorage.setItem('productId', id)
    window.location = 'cartDetails.html'
}

// Search By Name

let searchElement = document.getElementById('search')

searchElement.addEventListener('keyup', function (e) {

    searchByName(e.target.value.trim(), JSON.parse(localStorage.getItem('products')))

    if (e.target.value.trim() === "") {

        createProduct(JSON.parse(localStorage.getItem('products')))
    }
})

function searchByName(title, myArray) {

    let arr = myArray.filter((item) => item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1)
    createProduct(arr)
}

// Check if there is items in localStorage

let favoriteItems = localStorage.getItem('productsFavorite') ? JSON.parse(localStorage.getItem('productsFavorite')) : []

// Add To Favorite

function addToFavorite(id) {

    if (localStorage.getItem('username')) {

        let getProductId = JSON.parse(localStorage.getItem('products'))
        let choosenItem = getProductId.find((item) => item.id === id)
        
        choosenItem.liked = true
        favoriteItems = [...favoriteItems, choosenItem]

        let uniqueProducts = getUniqueCartItems(favoriteItems, 'id')
        localStorage.setItem('productsFavorite', JSON.stringify(uniqueProducts))
        
        getProductId.map((item) => {

            if (item.id === choosenItem.id) {

                item.liked = true
            }
        })

        localStorage.setItem('products', JSON.stringify(getProductId))
        createProduct(getProductId)

    } else {

        window.location = 'login.html'
    }
}


// Filter By Size

let sizeFilter = document.getElementById('size-filter')

sizeFilter.addEventListener('change', filterBySize)

function filterBySize(e) {

    let value = e.target.value
    let allproducts = JSON.parse(localStorage.getItem('products'))

    if (value === 'all') {

        createProduct(allproducts)

    } else {

        allproducts = allproducts.filter(item => item.size === value)
        createProduct(allproducts)
    }
}


// Edit Product

function editProduct(id) {

    localStorage.setItem('editProduct', id)
    window.location = 'editProduct.html'
}

// Delete Product

function deleteProduct(id) {

    let products = localStorage.getItem('products')

    if (products) {

        if (confirm('Do You Want To Delete This Item?')) {

            let items = JSON.parse(products)
            let filtered = items.filter((item) => item.id !== id)
            localStorage.setItem('products', JSON.stringify(filtered))
            createProduct(filtered)
        }
    }
}