let userName = document.querySelector('#username')
let password = document.querySelector('#password')
let loginButton = document.querySelector('#sign_in')


let getUser = localStorage.getItem('username')
let getPassword = localStorage.getItem('password')


loginButton.addEventListener('click', login)


function login(e) {

    e.preventDefault()

    if (userName.value === "" || password.value === "") {

        alert('Please Type Your Info')

    } else {

        if ((getUser && getUser.trim() === userName.value.trim()) && (getPassword && getPassword === password.value.trim())) {

            setTimeout( () => {

                window.location = 'index.html'
            }, 1500)

        } else {

            alert('Something Went Wrong!')
        }
    }
}