let username = localStorage.getItem('username')
let email = localStorage.getItem('email')


let userNameInputElement = document.getElementById('changeUserName')
let emailInputElement = document.getElementById('changeEmail')
let imageInputElement = document.getElementById('changeImage')
let editFormElement = document.getElementById('edit-profile-form')

let itemImage

userNameInputElement.value = username
emailInputElement.value = email

imageInputElement.addEventListener('change', uploadImage)
editFormElement.addEventListener('submit', editProfileData)


function editProfileData(e) {

    e.preventDefault()

    localStorage.setItem('username', userNameInputElement.value)
    localStorage.setItem('email', emailInputElement.value)
    localStorage.setItem('profileImage', itemImage)

    setTimeout(() => {
        
        window.location = 'profile.html'
    }, 700);
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