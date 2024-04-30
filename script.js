document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartItemsElement = document.querySelector(".cart-items tbody");
    const totalElement = document.querySelector(".total");
    const clearCartButton = document.querySelector(".clear-cart");
    let cart = [];

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function() {
            const item = button.parentNode.parentNode;
            const itemId = item.getAttribute("data-id");
            const itemName = item.querySelector("h3").textContent;
            const itemPrice = parseFloat(item.querySelector("p").textContent.slice(1));

            const existingItem = cart.find(cartItem => cartItem.id === itemId);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ id: itemId, name: itemName, price: itemPrice, quantity: 1 });
            }

            renderCart();
        });
    });

    clearCartButton.addEventListener("click", function() {
        cart = [];
        renderCart();
    });

    function renderCart() {
        cartItemsElement.innerHTML = "";
        let total = 0;
        cart.forEach((item, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${item.name}</td>
                <td>$${item.price}</td>
                <td>
                    <button class="decrement" data-index="${index}">-</button>
                    ${item.quantity}
                    <button class="increment" data-index="${index}">+</button>
                </td>
                <td><button class="remove-from-cart" data-index="${index}">Remove</button></td>
            `;
            cartItemsElement.appendChild(tr);
            total += item.price * item.quantity;
        });
        totalElement.textContent = total.toFixed(2);
        attachIncrementEventListeners();
        attachDecrementEventListeners();
        attachRemoveEventListeners();
    }

    function attachIncrementEventListeners() {
        const incrementButtons = document.querySelectorAll(".increment");
        incrementButtons.forEach(button => {
            button.addEventListener("click", function() {
                const index = parseInt(button.getAttribute("data-index"));
                cart[index].quantity++;
                renderCart();
            });
        });
    }

    function attachDecrementEventListeners() {
        const decrementButtons = document.querySelectorAll(".decrement");
        decrementButtons.forEach(button => {
            button.addEventListener("click", function() {
                const index = parseInt(button.getAttribute("data-index"));
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                    renderCart();
                }
            });
        });
    }

    function attachRemoveEventListeners() {
        const removeButtons = document.querySelectorAll(".remove-from-cart");
        removeButtons.forEach(button => {
            button.addEventListener("click", function() {
                const indexToRemove = parseInt(button.getAttribute("data-index"));
                cart.splice(indexToRemove, 1);
                renderCart();
            });
        });
    }
});
