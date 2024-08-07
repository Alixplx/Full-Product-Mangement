let products = JSON.parse(localStorage.getItem('products'))
let productId = localStorage.getItem('productId')

let itemElement = document.querySelector('.item-details')

let productDetails = products.find( (item) => item.id == productId)


itemElement.innerHTML = `

    <img src="${productDetails.imageUrl}" alt="">
    <h2>${productDetails.title}</h2>
    <span>Size : ${productDetails.size}</span>
    <p>${productDetails.desc}</p>
    <br>
    <span>Quantity : ${productDetails.qty}</span>
`