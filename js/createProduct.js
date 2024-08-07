let productName = document.getElementById('product-name')
let productDesc = document.getElementById('product-desc')
let productImage = document.getElementById('upload-image')
let productSizeSelect = document.getElementById('product-size')
let createForm = document.getElementById('create-form')

let productSizeValue
let itemImage

productSizeSelect.addEventListener('change', getProductSizeValue)
createForm.addEventListener('submit', createNewProduct)
productImage.addEventListener('change', uploadImage)


function getProductSizeValue(e) {

    productSizeValue = e.target.value
}

function createNewProduct(e) {

    e.preventDefault()

    let allProducts = JSON.parse(localStorage.getItem('products'))
    let nameValue = productName.value
    let descValue = productDesc.value
    
    if (nameValue && descValue) {

        let obj = {

            id: allProducts ? allProducts.length + 1 : 1,
            qty: 1,
            imageUrl: itemImage,
            size: productSizeValue,
            title: nameValue,
            desc: descValue,
        }
    
        let newProducts = allProducts ? [...allProducts, obj] : [obj]
        localStorage.setItem('products', JSON.stringify(newProducts))
    
        productName.value = ''
        productDesc.value = ''
        productSizeSelect.value = ''
        
        setTimeout( () => {

            window.location = 'index.html'
        }, 1000)

    } else {

        alert('Please Fill All Fields...')
    }
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