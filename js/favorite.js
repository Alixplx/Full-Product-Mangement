let productsElement = document.querySelector('.products')
let noProductsElement = document.querySelector('.noProducts')


function createFavoriteProduct(allProducts = []) {

    if (JSON.parse(localStorage.getItem('productsFavorite')).length === 0) {

        noProductsElement.innerHTML = 'There is no Products In Cart!'
    }

    let products = JSON.parse(localStorage.getItem('productsFavorite')) || allProducts

    let productsUi = products.map((item) => {

        return `

            <div class="product-item">

                    <img src="${item.imageUrl}" alt="Image" class="product-item-img">

                    <div class="product-item-desc">

                        <h2>${item.title}</h2>
                        <p>${item.desc}</p>
                        <span>Size : ${item.size}</span>
                        <br>
                        <span>Quantity : ${item.qty}</span>
                    </div>

                    <div class="product-item-actions">

                        <button class="add-to-cart" onclick="removeItem(${item.id})">Remove From Favorite</button>
                    </div>
            </div>
        `
    })

    productsElement.innerHTML = productsUi.join("")
}

createFavoriteProduct()

function removeItem(id) {

    let productsFavorite = localStorage.getItem('productsFavorite')

    if (productsFavorite) {

        let items = JSON.parse(productsFavorite)

        let filteredItems = items.filter( (item) => item.id !== id)
        localStorage.setItem('productsFavorite', JSON.stringify(filteredItems))
        createFavoriteProduct(filteredItems)
    }
}