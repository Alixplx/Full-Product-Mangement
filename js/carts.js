let productElement = document.querySelector('.products')
let noProductsElement = document.querySelector('.noProducts')


function createCartProduct(allProducts = []) {

    if (JSON.parse(localStorage.getItem('productsInCart')).length === 0) {

        noProductsElement.innerHTML = 'There is no Products In Cart!'
    }

    let products = JSON.parse(localStorage.getItem('productsInCart')) || allProducts

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

                        <button class="add-to-cart" onclick="removeItem(${item.id})">Remove From Cart</button>
                    </div>
            </div>
        `
    })

    productElement.innerHTML = productsUi.join("")
}

createCartProduct()

function removeItem(id) {

    let productsInCart = localStorage.getItem('productsInCart')

    if (productsInCart) {

        let items = JSON.parse(productsInCart)

        let filteredItems = items.filter((item) => item.id !== id)
        localStorage.setItem('productsInCart', JSON.stringify(filteredItems))
        createCartProduct(filteredItems)
    }
}