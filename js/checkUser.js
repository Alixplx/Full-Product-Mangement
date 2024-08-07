let userInfo = document.querySelector('#user_info')
let userDom = document.querySelector('#user')
let links = document.querySelector('#links')
let logoutButton = document.querySelector('#logout')


let checkUsername = localStorage.getItem('username')

if (checkUsername) {

    links.remove()
    userInfo.style.display = 'flex'
    userDom.innerHTML = checkUsername
}

logoutButton.addEventListener("click", function (e) {

    e.preventDefault()

    localStorage.clear()
    setTimeout( () => {

        window.location = 'index.html'
    }, 1500)
})