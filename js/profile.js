let username = localStorage.getItem('username')
let email = localStorage.getItem('email')
let getProfileImage = localStorage.getItem('profileImage')


let products = JSON.parse(localStorage.getItem('products'))
let myProducts = products.filter((item) => item.isMe === 'Y')

let userNameElement = document.getElementById('username')
let emailElement = document.getElementById('email')
let productLengthElement = document.getElementById('productLength')
let profileImage = document.querySelector('.user-avatar')


if (getProfileImage) {

    profileImage.src = getProfileImage

} else {

    profileImage.src = 'img/avatar.png'
}

userNameElement.innerHTML = username
emailElement.innerHTML = email
productLengthElement.innerHTML = `Product Length : ${myProducts.length}`