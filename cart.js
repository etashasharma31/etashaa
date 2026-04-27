/**
 * ETASHAA - Shared Cart System
 * Manages shopping cart state using localStorage
 */

const CART_KEY = 'etashaa_cart';

// Initialize Cart
function getCart() {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartUI();
}

function addToCart(product) {
    const cart = getCart();
    // Check if product already in cart
    const existingIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    
    saveCart(cart);
    showToast(`${product.name} added to bag`);
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
}

function updateCartUI() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Update all cart badges
    const badges = document.querySelectorAll('.cart-count');
    badges.forEach(badge => {
        badge.textContent = count;
        if (count > 0) {
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    });

    // If on cart page, re-render
    if (window.location.pathname.includes('shopping_cart.html')) {
        renderCartPage();
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] bg-[#1c1c1a] text-[#fcf9f6] px-8 py-4 font-jakarta-sans text-xs uppercase tracking-widest shadow-2xl transition-all duration-500 opacity-0 translate-y-4';
    toast.innerHTML = `
        <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-[#c8a96a]">check_circle</span>
            ${message}
        </div>
    `;
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translate(-50%, 0)';
    }, 100);
    
    // Animate out
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translate(-50%, 10px)';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// Format Price
function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(price);
}

// Initial update
document.addEventListener('DOMContentLoaded', updateCartUI);
