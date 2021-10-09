new WOW().init()

const cartBtn = document.querySelector('#cart-button')
const cartModal = document.querySelector('#cart-modal')
const cartModalClose = document.querySelector('#cart-modal-close')

cartBtn.addEventListener('click', toggleModal)
cartModalClose.addEventListener('click', toggleModal)

function toggleModal() {
    cartModal.classList.toggle('active')
}