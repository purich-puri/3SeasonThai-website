'use strict';

let modal = JSON.parse(localStorage.getItem('modal')) || [];
const modalDOM = document.querySelector('.modal');
const addToModalButtonDOM = document.querySelectorAll('[data-action="ADD_TO_MODAL"]');

addToModalButtonDOM.forEach(addToModalButtonDOM => {
  addToModalButtonDOM.addEventListener('click', () => {
      const modalDOM = addToModalButtonDOM.parentNode;
      const menu = {
        name: modalDOM.querySelector('.menu_name').innerText,
        description: modalDOM.querySelector('.menu_description').innerText,
        price: modalDOM.querySelector('.menu_price').innerText,
        quantity: 1
      };
  
      const isInCart = modal.filter(cartItem => cartItem.name === product.name).length > 0;
  
      if (!isInCart) {
        insertItemToDOM(menu);
        cart.push(menu);
        saveCart();
        handleActionButtons(addToModalButtonDOM, product);
      }
    });
  });

function insertItemToDOM(product) {
cartDOM.insertAdjacentHTML(
    'beforeend',
    `
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" style="font-weight:bold; id="exampleModalCenterTitle">${menu.menu_name}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span> </button>
            </div>'
            <div class="modal-header">${menu.menu_description}</div>
            <div class="modal-body">Price: $ ${menu.menu_price}</div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" data-action="ADD_TO_CART">Add to cart</button>
            </div> 
        </div> 
    </div>;
`
);

addCartFooter();
}

