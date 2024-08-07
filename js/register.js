// Register A New User

let userName = document.querySelector('#username')
let email = document.querySelector('#email')
let password = document.querySelector('#password')

let registerButton = document.querySelector('#sign_up')


registerButton.addEventListener('click', register)


function register(e) {

    e.preventDefault()

    if (userName.value == "" || email.value == "" || password.value == "") {

        alert('Please Type Your Data')

    } else {

        localStorage.setItem('username', userName.value)
        localStorage.setItem('email', email.value)
        localStorage.setItem('password', password.value)

        setTimeout( ()=> {

            window.location = 'login.html'
        }, 1500)
    }
}