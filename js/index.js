new WOW().init()

const buttonAuth = document.querySelector('.button-auth')
const buttonLogin = document.querySelector('.button-login')
const modalAuth = document.querySelector('#auth-modal')
const inputLogin = document.querySelector('#login')
const inputPassword = document.querySelector('#password')
const messageAuthError = document.querySelector('#auth-error')
const cardsWrapper = document.querySelector('#cards')

let authStatus = JSON.parse(localStorage.getItem('authStatus'))
let authData = JSON.parse(localStorage.getItem('authData'))

let users = [
    { login: "admin", password: "123" },
];
let openStatus = false;

const mockRestaurants = [
    {
        href: './restaurant.html',
        img: './img/pizzaplus.jpg',
        title: 'Пицца плюс',
        tag: '50 мин',
        rating: '4.5',
        minPrice: 900,
        category: 'Пицца'
    },
    {
        href: './restaurant.html',
        img: './img/tanuki.jpg',
        title: 'Тануки',
        tag: '50 мин',
        rating: '4.5',
        minPrice: 900,
        category: 'Пицца'
    },
    {
        href: './restaurant.html',
        img: './img/foodband.jpg',
        title: 'FoodBand',
        tag: '50 мин',
        rating: '4.5',
        minPrice: 900,
        category: 'Пицца'
    },
    {
        href: './restaurant.html',
        img: './img/jadinapizza.jpg',
        title: 'Жадина-пицца',
        tag: '50 мин',
        rating: '4.5',
        minPrice: 900,
        category: 'Пицца'
    },
    {
        href: './restaurant.html',
        img: './img/tochkaedi.jpg',
        title: 'Точка еды',
        tag: '50 мин',
        rating: '4.5',
        minPrice: 900,
        category: 'Пицца'
    },
    {
        href: './restaurant.html',
        img: './img/pizzaburger.jpg',
        title: 'PizzaBurger',
        tag: '50 мин',
        rating: '4.5',
        minPrice: 900,
        category: 'Пицца'
    },
]

mockRestaurants.forEach((mock) => {
    cardsWrapper.insertAdjacentHTML('beforeend', `
        <a href="${mock.href}" class="card" onclick="validateAuthorizeUser(event)">
            <img src="${mock.img}" alt="image" class="card-image">
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title">${mock.title}</h3>
                    <span class="card-tag tag">${mock.tag}</span>
                </div>
                <div class="card-info">
                    <div class="rating">
                        <img src="./img/star.svg" alt="rating" class="rating-star">
                        ${mock.rating}
                    </div>
                    <div class="price">От ${mock.minPrice} ₽</div>
                    <div class="category">${mock.category}</div>
                </div>
            </div>
        </a>
    `)
})

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
            authData = user
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

const validateAuthorizeUser = (event) => {
    event.preventDefault()

    console.log(authData)

    if (authData?.login) {
        console.log(window.location.href = event.currentTarget.href)
    } else {
        toggleModalAuth()
    }
}