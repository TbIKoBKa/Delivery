new WOW().init()

new Swiper('.swiper-container', {
    sliderPerView: 1,
    loop: true,
    autoplay: true,
    grabCursor: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
    },
})

const logo = document.querySelector('.logo')
const buttonAuth = document.querySelector('.button-auth')
const buttonLogin = document.querySelector('.button-login')
const modalAuth = document.querySelector('#auth-modal')
const inputLogin = document.querySelector('#login')
const inputPassword = document.querySelector('#password')
const messageAuthError = document.querySelector('#auth-error')
const cardsWrapper = document.querySelector('#cards')
const promoSwiperContainer = document.querySelector('.promo-swiper-container')

let authStatus = JSON.parse(localStorage.getItem('authStatus'))
let authData = JSON.parse(localStorage.getItem('authData'))
let restaurants = []
let openStatus = false;
let goodsVisible = false;

let users = [
    { login: "admin", password: "123" },
];

const getData = async (url, container) => {
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`Error! Address: ${url}. Status code: ${response.status}!`)
    }

    return await response.json()
}

function createRestaurant(restaurant) {
    const {
        image,
        kitchen,
        name,
        price,
        stars,
        products,
        time_of_delivery: timeOfDelivery
    } = restaurant;

    cardsWrapper.insertAdjacentHTML('beforeend', `
        <a data-products="${products}" class="card" onclick="validateAuthorizeUser(event)">
            <img src="${image}" alt="image" class="card-image">
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title">${name}</h3>
                    <span class="card-tag tag">${timeOfDelivery}</span>
                </div>
                <div class="card-info">
                    <div class="rating">
                        <img src="./img/star.svg" alt="rating" class="rating-star">
                        ${stars}
                    </div>
                    <div class="price">От ${price} ₽</div>
                    <div class="category">${kitchen}</div>
                </div>
            </div>
        </a>
    `)
}

const createGood = (good, index) => {
    const {
        description,
        image,
        name,
        price
    } = good;

    cardsWrapper.insertAdjacentHTML('beforeend', `
        <div class="card wow fadeInRightBig" data-wow-duration="2s" data-wow-delay="${0.2 * index}s">
            <img src="${image}" alt="image" class="card-image">
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title card-title-reg">${name}</h3>
                </div>
                <div class="card-info">
                    <div class="ingredients">${description}</div>
                </div>
                <div class="card-buttons">
                    <button class="button button-primary">
                        <span class="button-card-text">В корзину</span>
                        <img class="button-card-image" src="img/shopping-cart-white.svg" alt="cart">
                    </button>
                    <strong class="card-price-bold">${price} ₽</strong>
                </div>
            </div>
        </div>
    `)
}

const openGoods = (event) => {
    event.preventDefault()
    const restaurant = event.target.closest('.card');

    console.log('openGoods');

    if (authStatus && !goodsVisible && restaurant) {
        promoSwiperContainer.classList.add('hide');
        cardsWrapper.innerHTML = ''

        getData(`./db/${restaurant.dataset.products}`).then((data) => {
            cardsWrapper.innerHTML = ''
            goodsVisible = !goodsVisible

            data.forEach(createGood);
        });
    }
    else {
        toggleModalAuth();
    }
}

getData('./db/partners.json').then((restaurants) => {
    cardsWrapper.innerHTML = ''

    restaurants.forEach(createRestaurant)
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

    if (!authData?.login) {
        toggleModalAuth()
    }
}

cardsWrapper.addEventListener('click', (event) => {
    openGoods(event)
})

logo.addEventListener('click', () => {
    promoSwiperContainer.classList.remove('hide');
    goodsVisible = false;
})