// Estado global simple
const state = {
  products: [
    // Ejemplos: reemplaza con tus datos reales
    { id: "ram-8gb", title: "Memoria RAM DDR4 8GB", brand: "Kingston", img: "img/ram.jpg", price: 120000 },
    { id: "ssd-480", title: "Disco Estado Sólido 480GB", brand: "Adata", img: "img/ssd.jpg", price: 180000 },
    { id: "kbd-rgb", title: "Teclado Mecánico RGB", brand: "Redragon Kumara", img: "img/teclado.jpg", price: 210000 }
  ],
  cart: []
};

// Referencias DOM
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartSection = document.getElementById("cart");
const checkoutSection = document.getElementById("checkout");
const checkoutSummaryItems = document.getElementById("checkoutSummaryItems");
const summarySubtotal = document.getElementById("summarySubtotal");
const summaryTotal = document.getElementById("summaryTotal");
const checkoutForm = document.getElementById("checkoutForm");
const checkoutBtn = document.getElementById("btnCheckout");
// Si tienes un ícono de carrito en el header, con id="cartCount"
const cartCount = document.getElementById("cartCount");

// Utilidad: formatear precios (sin separadores para simplificar)
function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

// Cargar carrito desde localStorage
function loadCart() {
  try {
    const raw = localStorage.getItem("tecno_cart_v1");
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Error cargando carrito", e);
    return [];
  }
}

// Guardar carrito
function saveCart() {
  try {
    localStorage.setItem("tecno_cart_v1", JSON.stringify(state.cart));
  } catch (e) {
    console.error("Error guardando carrito", e);
  }
}

// Inicializar estado
state.cart = loadCart();
updateCartUI();

// Añadir al carrito
function addToCart(id, qty = 1) {
  qty = Number(qty) || 1;
  const item = state.cart.find((i) => i.id === id);
  if (item) {
    item.qty += qty;
  } else {
    state.cart.push({ id, qty });
  }
  saveCart();
  updateCartUI();
}

// Actualizar UI del carrito (contador, total, lista si está visible)
function updateCartUI() {
  const count = state.cart.reduce((s, i) => s + i.qty, 0);
  if (cartCount) cartCount.textContent = count;

  if (cartSection.classList.contains("active")) {
    renderCartItems();
  }

  const total = state.cart.reduce((s, i) => {
    const p = state.products.find((x) => x.id === i.id);
    return s + (p ? p.price * i.qty : 0);
  }, 0);
  cartTotal.textContent = formatPrice(total);
}

// Renderizar productos del carrito
function renderCartItems() {
  cartItems.innerHTML = "";
  if (state.cart.length === 0) {
    cartItems.innerHTML = "<p>Tu carrito está vacío.</p>";
    return;
  }

  const fragment = document.createDocumentFragment();

  state.cart.forEach((ci) => {
    const p = state.products.find((x) => x.id === ci.id);
    if (!p) return;

    const el = document.createElement("div");
    el.className = "cart-item";
    el.innerHTML = `
      <img src="${p.img}" alt="${p.title}">
      <div style="flex:1">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
          <strong>${p.title}</strong>
          <div class="price">${formatPrice(p.price * ci.qty)}</div>
        </div>
        <small style="color:var(--muted)">${p.brand}</small>
        <div style="margin-top:8px;display:flex;align-items:center;gap:8px;">
          <div class="qty-controls">
            <button class="dec" data-id="${ci.id}" type="button">-</button>
            <span>${ci.qty}</span>
            <button class="inc" data-id="${ci.id}" type="button">+</button>
          </div>
          <button class="remove" data-id="${ci.id}" type="button">Quitar</button>
        </div>
      </div>
    `;
    fragment.appendChild(el);
  });

  cartItems.appendChild(fragment);
}

// Delegación de eventos dentro del carrito
cartItems.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const id = btn.dataset.id;
  if (!id) return;

  if (btn.classList.contains("inc")) {
    changeQty(id, +1);
  } else if (btn.classList.contains("dec")) {
    changeQty(id, -1);
  } else if (btn.classList.contains("remove")) {
    removeFromCart(id);
  }
});

// Cambiar cantidad
function changeQty(id, delta) {
  const item = state.cart.find((i) => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
    return;
  }
  saveCart();
  updateCartUI();
}

// Eliminar producto
function removeFromCart(id) {
  state.cart = state.cart.filter((i) => i.id !== id);
  saveCart();
  updateCartUI();
}

// Navegación entre secciones
function showPage(id) {
  document.querySelector
