// Carrito: añadir
function addToCart(id, qty = 1) {
  const item = state.cart.find((i) => i.id === id);
  if (item) {
    item.qty += qty;
  } else {
    state.cart.push({ id, qty });
  }
  saveCart();
  updateCartUI();
}

// Guardar/recuperar carrito
function saveCart() {
  localStorage.setItem("tecno_cart_v1", JSON.stringify(state.cart));
}
function loadCart() {
  try {
    const raw = localStorage.getItem("tecno_cart_v1");
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

// Interfaz del carrito
function updateCartUI() {
  const count = state.cart.reduce((s, i) => s + i.qty, 0);
  cartCount.textContent = count;
  // If cart page visible, render items
  if (document.getElementById("cart").classList.contains("active")) {
    renderCartItems();
  }
  // update total
  const total = state.cart.reduce((s, i) => {
    const p = state.products.find((x) => x.id === i.id);
    return s + (p ? p.price * i.qty : 0);
  }, 0);
  cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Renderiza items del carrito
function renderCartItems() {
  cartItems.innerHTML = "";
  if (state.cart.length === 0) {
    cartItems.innerHTML = "<p>Tu carrito está vacío.</p>";
    return;
  }
  state.cart.forEach((ci) => {
    const p = state.products.find((x) => x.id === ci.id);
    if (!p) return;
    const el = document.createElement("div");
    el.className = "cart-item";
    el.innerHTML = `
      <img src="${p.img}" alt="${p.title}" />
      <div style="flex:1">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <strong>${p.title}</strong>
          <div class="price">$${(p.price * ci.qty).toFixed(2)}</div>
        </div>
        <small style="color:var(--muted)">${p.brand}</small>
        <div style="margin-top:8px;display:flex;align-items:center;gap:8px">
          <div class="qty-controls">
            <button class="dec" data-id="${ci.id}">-</button>
            <span style="padding:6px 10px;border-radius:6px;border:1px solid #eef4fb">${ci.qty}</span>
            <button class="inc" data-id="${ci.id}">+</button>
          </div>
          <button class="remove" data-id="${ci.id}" style="margin-left:auto;background:#fff;border:1px solid #f1c0c0;padding:6px;border-radius:8px">Quitar</button>
        </div>
      </div>
    `;
    cartItems.appendChild(el);
  });

  // eventos
  cartItems.querySelectorAll(".inc").forEach((b) => {
    b.addEventListener("click", () => changeQty(b.dataset.id, +1));
  });
  cartItems.querySelectorAll(".dec").forEach((b) => {
    b.addEventListener("click", () => changeQty(b.dataset.id, -1));
  });
  cartItems.querySelectorAll(".remove").forEach((b) => {
    b.addEventListener("click", () => {
      removeFromCart(b.dataset.id);
    });
  });
}

// Cambiar cantidad
function changeQty(id, delta) {
  const item = state.cart.find((i) => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  saveCart();
  updateCartUI();
  renderCartItems();
}

// Remover
function removeFromCart(id) {
  state.cart = state.cart.filter((i) => i.id !== id);
  saveCart();
  updateCartUI();
  renderCartItems();
}

// Navegación simple entre secciones
function navigate(page) {
  Object.values(pages).forEach((el) => el.classList.remove("active"));
  pages[page].classList.add("active");
  // when entering cart, render
  if (page === "cart") renderCartItems();
  if (page === "checkout") renderCheckoutSummary();
}

// Setup eventos globales
function setupEvents() {
  // back buttons
  document.querySelectorAll(".back-btn").forEach((b) => {
    b.addEventListener("click", (ev) => {
      const target = ev.currentTarget.dataset.target || "home";
      navigate(target);
    });
  });

  // abrir carrito
  btnCart.addEventListener("click", () => navigate("cart"));
  ctaShop.addEventListener("click", () => navigate("home"));
  btnCheckout.addEventListener("click", () => navigate("checkout"));

  // búsqueda en tiempo real
  searchInput.addEventListener("input", (e) => {
    const q = e.target.value.trim().toLowerCase();
    if (!q) state.filtered = state.products;
    else
      state.filtered = state.products.filter((p) =>
        (p.title + p.brand + p.category).toLowerCase().includes(q)
      );
    renderProducts(state.filtered);
  });

  // checkout
  const checkoutForm = document.getElementById("checkoutForm");
  checkoutForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    if (state.cart.length === 0) {
      showToast("El carrito está vacío");
      return;
    }
    const form = new FormData(checkoutForm);
    // Simular procesamiento
    const order = {
      id: "TS-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
      date: new Date().toISOString(),
      customer: {
        name: form.get("name"),
        email: form.get("email"),
        address: form.get("address"),
        city: form.get("city"),
      },
      payment: form.get("payment"),
      items: state.cart.map((i) => {
        const p = state.products.find((x) => x.id === i.id);
        return { id: p.id, title: p.title, price: p.price, qty: i.qty };
      }),
    };
    // limpiar carrito
    state.cart = [];
    saveCart();
    updateCartUI();
    navigate("home");
    showToast("Compra realizada. ID: " + order.id);
    // aquí podrías enviar "order" a tu servidor vía fetch()
    checkoutForm.reset();
  });
}

// Mostrar resumen en checkout
function renderCheckoutSummary() {
  const container = document.getElementById("checkoutSummary");
  if (!container) return;
  if (state.cart.length === 0) {
    container.innerHTML = "<p>Carrito vacío</p>";
    return;
  }
  const lines = state.cart
    .map((i) => {
      const p = state.products.find((x) => x.id === i.id);
      return `
        <div style="display:flex;justify-content:space-between">
          <span>${p.title} x ${i.qty}</span>
          <strong>$${(p.price * i.qty).toFixed(2)}</strong>
        </div>
      `;
    })
    .join("");
  const total = state.cart.reduce(
    (s, i) => s + state.products.find((x) => x.id === i.id).price * i.qty,
    0
  );
  container.innerHTML = `
    ${lines}
    <hr/>
    <div style="display:flex;justify-content:space-between">
      <strong>Total</strong>
      <strong>$${total.toFixed(2)}</strong>
    </div>
  `;
}

// Toast simple
function showToast(msg, timeout = 2200) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), timeout);
}

// simple UI update helpers
function openHome() {
  navigate("home");
}

// helper to ensure cart loaded at start
updateCartUI();
