new WOW().init()

const buttonAuth = document.querySelector('.button-auth')
const buttonLogin = document.querySelector('.button-login')
const modalAuth = document.querySelector('#auth-modal')
const inputLogin = document.querySelector('#login')
const inputPassword = document.querySelector('#password')
const messageAuthError = document.querySelector('#auth-error')

let authStatus = JSON.parse(localStorage.getItem('authStatus'))
let authData = JSON.parse(localStorage.getItem('authData'))

let users = [
    { login: "admin", password: "123" },
];

const toggleModalAuth = () => {
    modalAuth.classList.toggle('active');
}

const toggleAuthMessageError = () => {
    messageAuthError.classList.toggle('visible')
}

buttonAuth.addEventListener('click', function () {
    if (authStatus === false) {
        toggleModalAuth();
    } else {
        if (confirm('Вы хотите разлогиниться?') === true) {
            localStorage.setItem('authStatus', false);
            localStorage.setItem('authData', null);
            authStatus = false;
            authData = null;
            document.getElementById('login-text').innerText = "Войти";
        }
    }
})

if (authData !== null) {
    document.getElementById('login-text').innerText = authData.login;
}

buttonLogin.addEventListener('click', () => {
    const isExist = users.some((user) => {
        if (user.login === inputLogin.value && user.password === inputPassword.value) {
            localStorage.setItem('authStatus', true);
            localStorage.setItem('authData', JSON.stringify(user));
            authStatus = true;
            document.getElementById('login-text').innerText = inputLogin.value;
            toggleModalAuth();
            return true
        }

        return false
    })

    if (!isExist) {
        toggleAuthMessageError()

        setTimeout(() => toggleAuthMessageError(), 3000)
    }
})