// Load cart data from localStorage
let listCart = [];

function loadCart() {
    const savedCart = localStorage.getItem('listCart');
    if (savedCart) {
        listCart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    const listCartHTML = document.querySelector('.returnCart .list');
    const totalQuantityHTML = document.querySelector('.totalQuantity');
    const totalPriceHTML = document.querySelector('.totalPrice');
    let totalQuantity = 0;
    let totalPrice = 0;

    listCartHTML.innerHTML = '';

    if (listCart && listCart.length > 0) {
        listCart.forEach(product => {
            if (product) {
                const price = parseFloat(product.price.replace('$', ''));
                const itemTotal = price * product.quantity;
                totalQuantity += product.quantity;
                totalPrice += itemTotal;

                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="item-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="item-details">
                        <h3>${product.name}</h3>
                        <div class="item-price">
                            <span class="price">$${price.toFixed(2)}</span>
                            <span class="quantity">× ${product.quantity}</span>
                        </div>
                        <div class="item-total">$${itemTotal.toFixed(2)}</div>
                    </div>
                    <button class="remove-item" onclick="removeItem('${product.id}')">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                listCartHTML.appendChild(cartItem);
            }
        });
    } else {
        listCartHTML.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
    }

    totalQuantityHTML.textContent = `${totalQuantity} item${totalQuantity !== 1 ? 's' : ''}`;
    totalPriceHTML.textContent = `$${totalPrice.toFixed(2)}`;
}

function removeItem(productId) {
    listCart = listCart.filter(item => item.id !== productId);
    localStorage.setItem('listCart', JSON.stringify(listCart));
    updateCartDisplay();
}

// Handle country selection
document.getElementById('country').addEventListener('change', function(e) {
    const cities = getCitiesForCountry(e.target.value);
    const citySelect = document.getElementById('city');
    citySelect.innerHTML = '<option value="">Select City...</option>';
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city.value;
        option.textContent = city.label;
        citySelect.appendChild(option);
    });
});

function getCitiesForCountry(country) {
    // Add more cities as needed
    const citiesByCountry = {
        'VN': [
            { value: 'hanoi', label: 'Hanoi' },
            { value: 'hcm', label: 'Ho Chi Minh City' },
            { value: 'danang', label: 'Da Nang' }
        ],
        'US': [
            { value: 'nyc', label: 'New York' },
            { value: 'la', label: 'Los Angeles' },
            { value: 'chicago', label: 'Chicago' }
        ],
        'UK': [
            { value: 'london', label: 'London' },
            { value: 'manchester', label: 'Manchester' },
            { value: 'birmingham', label: 'Birmingham' }
        ]
    };
    return citiesByCountry[country] || [];
}

function processCheckout() {
    // Validate form
    const form = document.querySelector('.checkout-form');
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    if (!isValid) {
        alert('Please fill in all required fields');
        return;
    }

    // Collect form data
    const orderData = {
        customer: {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            country: document.getElementById('country').value,
            city: document.getElementById('city').value
        },
        items: listCart,
        payment: document.querySelector('input[name="payment"]:checked').value,
        total: parseFloat(document.querySelector('.totalPrice').textContent.replace('$', ''))
    };

    // Here you would typically send this data to your backend
    console.log('Processing order:', orderData);

    // Show success modal
    const successModal = document.getElementById('successModal');
    successModal.classList.add('active');

    // Clear cart
    localStorage.removeItem('listCart');
}

function redirectToHome() {
    window.location.href = 'index.html';
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const successModal = document.getElementById('successModal');
    if (e.target === successModal) {
        successModal.classList.remove('active');
    }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', loadCart); 