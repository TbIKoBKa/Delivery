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
let openStatus = false;

const toggleModalAuth = () => {
    modalAuth.classList.toggle('active');
    openStatus = !openStatus;

    inputLogin.style.borderColor = '';
    inputLogin.value = '';
    inputPassword.style.borderColor = '';
    inputPassword.value = '';

    document.body.style.overflow = openStatus ? 'hidden' : 'visible';
}

const toggleAuthMessageError = () => {
    messageAuthError.classList.toggle('visible')
}

modalAuth.addEventListener('click', ({ target }) => {
    if (target.id === modalAuth.id) {
        toggleModalAuth()
    }
})

buttonAuth.addEventListener('click', () => {
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

        !inputLogin.value && (inputLogin.style.borderColor = '#C10000')
        !inputPassword.value && (inputPassword.style.borderColor = '#C10000')

        setTimeout(() => {
            toggleAuthMessageError()
            inputLogin.style.borderColor = 'initial'
            inputPassword.style.borderColor = 'initial'
        }, 3000)
    }
})