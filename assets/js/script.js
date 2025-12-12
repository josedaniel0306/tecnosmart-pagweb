// === 1. BASE DE DATOS DE PRODUCTOS (Array de Objetos) ===
const productos = [
  {
    id: 1,
    nombre: "Memoria RAM DDR4 8GB",
    precio: 120000,
    desc: "Marca Kingston - 3200MHz",
    img: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 2,
    nombre: "Disco SSD 480GB",
    precio: 180000,
    desc: "Marca Adata - SATA III",
    img: "https://technologystore2006.com/wp-content/uploads/2020/10/ADATA-SU630-480-1.png"
  },
  {
    id: 3,
    nombre: "Teclado Mecánico RGB",
    precio: 210000,
    desc: "Redragon Kumara",
    img: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 4,
    nombre: "Monitor Gamer 24''",
    precio: 650000,
    desc: "144Hz - 1ms Respuesta",
    img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 5,
    nombre: "RAM DDR4 16GB RGB",
    precio: 260000,
    desc: "Corsair Vengeance - 3600MHz",
    img: "https://images.unsplash.com/photo-1555618568-9b165d957134?auto=format&fit=crop&w=500&q=60"
  }
];

// === 2. INICIALIZAR EL CARRITO (RECUPERAR DATOS) ===
let carrito = JSON.parse(localStorage.getItem("carritoTecnoSmart")) || [];

// Cuando el HTML esté listo
document.addEventListener("DOMContentLoaded", () => {
  renderizarProductos();     // Solo hace algo en productos.html
  actualizarCarritoDOM();    // Actualiza numerito y offcanvas en cualquier página
  initBuscador();            // Activa la barra de búsqueda del navbar
});

// === 3. MOSTRAR PRODUCTOS EN EL CATÁLOGO (productos.html) ===
function renderizarProductos(lista = productos) {
  const contenedor = document.getElementById("contenedor-productos");
  if (!contenedor) return; // Si no existe, estamos en index u otra página

  contenedor.innerHTML = "";

  if (lista.length === 0) {
    contenedor.innerHTML = `
      <div class="col-12">
        <p class="text-center text-muted">No se encontraron productos.</p>
      </div>`;
    return;
  }

  lista.forEach((prod) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${prod.img}" class="card-img-top" alt="${prod.nombre}"
             style="height: 200px; object-fit: cover;">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${prod.nombre}</h5>
          <p class="card-text text-muted">${prod.desc}</p>
          <h4 class="text-primary">$${prod.precio.toLocaleString()}</h4>
          <button class="btn btn-primary mt-auto" onclick="agregarAlCarrito(${prod.id})">
            <i class="fas fa-cart-plus"></i> Agregar
          </button>
        </div>
      </div>
    `;
    contenedor.appendChild(div);
  });
}

// === 4. AGREGAR AL CARRITO Y GUARDAR ===
function agregarAlCarrito(prodId) {
  const item = productos.find((prod) => prod.id === prodId);
  if (!item) return;

  carrito.push(item);
  guardarEnStorage();
  actualizarCarritoDOM();
  alert(`¡${item.nombre} agregado al carrito!`);
}

// === 5. ELIMINAR DEL CARRITO Y GUARDAR ===
function eliminarDelCarrito(indice) {
  carrito.splice(indice, 1);
  guardarEnStorage();
  actualizarCarritoDOM();
}

// === 6. GUARDAR EN LOCALSTORAGE ===
function guardarEnStorage() {
  localStorage.setItem("carritoTecnoSmart", JSON.stringify(carrito));
}

// === 7. ACTUALIZAR LA VISTA (CONTADOR Y LISTA DEL OFFCANVAS) ===
function actualizarCarritoDOM() {
  const contenedorCarrito = document.getElementById("carrito-contenedor");
  const contadorCarrito = document.getElementById("contador-carrito");
  const totalCarrito = document.getElementById("carrito-total");

  // Numerito rojo
  if (contadorCarrito) {
    contadorCarrito.textContent = carrito.length;
  }

  // Lista en el offcanvas
  if (contenedorCarrito) {
    contenedorCarrito.innerHTML = "";

    if (carrito.length === 0) {
      contenedorCarrito.innerHTML =
        '<p class="text-center text-muted">El carrito está vacío.</p>';
    } else {
      carrito.forEach((prod, indice) => {
        const div = document.createElement("div");
        div.classList.add(
          "d-flex",
          "justify-content-between",
          "align-items-center",
          "border-bottom",
          "pb-2"
        );
        div.innerHTML = `
          <div>
            <h6 class="mb-0 fs-6">${prod.nombre}</h6>
            <small class="text-primary">$${prod.precio.toLocaleString()}</small>
          </div>
          <button class="btn btn-sm btn-outline-danger"
                  onclick="eliminarDelCarrito(${indice})">
            <i class="fas fa-trash-alt"></i>
          </button>
        `;
        contenedorCarrito.appendChild(div);
      });
    }
  }

  // Total
  if (totalCarrito) {
    const total = carrito.reduce((acc, prod) => acc + prod.precio, 0);
    totalCarrito.textContent = `$${total.toLocaleString()}`;
  }
}

// === 8. FINALIZAR COMPRA (BOTÓN DEL OFFCANVAS → checkout.html) ===
const btnFinalizarCompra = document.getElementById("btnFinalizarCompra");
if (btnFinalizarCompra) {
  btnFinalizarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    // Ir a la página de checkout
    window.location.href = "checkout.html";
  });
}

// === 9. BUSCADOR EN EL NAVBAR (filtra productos en productos.html) ===
function initBuscador() {
  const input = document.getElementById("searchInput");
  if (!input) return;

  input.addEventListener("input", () => {
    const texto = input.value.toLowerCase().trim();
    if (!document.getElementById("contenedor-productos")) {
      // Si no estamos en productos.html, solo actualiza el valor para cuando vayamos
      return;
    }
    const filtrados = productos.filter((p) =>
      p.nombre.toLowerCase().includes(texto) ||
      p.desc.toLowerCase().includes(texto)
    );
    renderizarProductos(filtrados);
  });
}

// Alternar mostrar/ocultar input de búsqueda (lo llama el botón de la lupa)
function toggleSearch() {
  const input = document.getElementById("searchInput");
  if (!input) return;
  input.classList.toggle("d-none");
  if (!input.classList.contains("d-none")) {
    input.focus();
  }
}
