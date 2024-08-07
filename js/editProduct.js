let products = JSON.parse(localStorage.getItem('products'))
let productId = JSON.parse(localStorage.getItem('editProduct'))
let getProduct = products.find(item => item.id === productId)


let productName = document.getElementById('product-name')
let productDesc = document.getElementById('product-desc')
let productImage = document.getElementById('upload-image')
let productSizeSelect = document.getElementById('product-size')
let updateForm = document.getElementById('update-form')

let productSizeValue
let itemImage

productName.value = getProduct.title
productDesc.value = getProduct.desc
productSizeSelect.value = getProduct.size
itemImage = getProduct.imageUrl

productSizeSelect.addEventListener('change', getProductSizeValue)
updateForm.addEventListener('submit', updateProduct)
productImage.addEventListener('change', uploadImage)


function getProductSizeValue(e) {

    productSizeValue = e.target.value
}

function updateProduct(e) {

    e.preventDefault()

    getProduct.title = productName.value
    getProduct.desc = productDesc.value
    getProduct.size = productSizeValue
    getProduct.imageUrl = itemImage

    localStorage.setItem('products', JSON.stringify(products))
    setTimeout(() => {

        window.location = 'index.html'
    },500)
}


function uploadImage() {

    let file = this.files[0]
    let types = ['image/jpeg', 'image/png']

    if (types.indexOf(file.type) == -1) {

        alert('Type Not Supported')
        return
    }

    if (file.size > 2 * 1024 * 1024) {

        alert('Image Must be Less Than 2MB')
        return
    }

    base64Image(file)
}

function base64Image(file) {

    let reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = function () {

        itemImage = reader.result
    }

    reader.onerror = function () {

        alert('Error')
    }
}