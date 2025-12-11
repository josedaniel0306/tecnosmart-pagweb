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
        img: "data:image/jpeg;base64,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"
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
    }
];

// Variable para guardar el carrito
let carrito = [];

// Evento que carga las funciones cuando el HTML está listo
document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos();
});

// === 2. CÓDIGO JS PARA MOSTRAR LISTADO DE PRODUCTOS ===
function renderizarProductos() {
    const contenedor = document.getElementById('contenedor-productos');
    
    // Verificamos si estamos en la página de productos
    if (!contenedor) return; 

    contenedor.innerHTML = ''; // Limpiamos el contenido

    productos.forEach((prod) => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${prod.img}" class="card-img-top" alt="${prod.nombre}" style="height: 200px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${prod.nombre}</h5>
                    <p class="card-text text-muted">${prod.desc}</p>
                    <h4 class="text-primary">$${prod.precio.toLocaleString()}</h4>
                    <!-- Botón que llama a la función agregar -->
                    <button class="btn btn-primary mt-auto" onclick="agregarAlCarrito(${prod.id})">
                        <i class="fas fa-cart-plus"></i> Agregar
                    </button>
                </div>
            </div>
        `;
        contenedor.appendChild(div);
    });
}

// === 3. CÓDIGO JS PARA AGREGAR PRODUCTOS AL CARRITO ===
function agregarAlCarrito(prodId) {
    // Buscar el producto en la base de datos
    const item = productos.find((prod) => prod.id === prodId);
    
    // Agregarlo al array del carrito
    carrito.push(item);
    
    // Actualizar la vista del carrito
    actualizarCarritoDOM();
    
    // Feedback visual (Alerta)
    alert(`¡${item.nombre} agregado al carrito!`);
}

// === 4. CÓDIGO JS PARA ELIMINAR PRODUCTOS DEL CARRITO ===
function eliminarDelCarrito(indice) {
    // Elimina 1 elemento en la posición "indice"
    carrito.splice(indice, 1);
    
    // Actualizar la vista del carrito
    actualizarCarritoDOM();
}

// === FUNCIONES AUXILIARES (Actualizar vista y totales) ===
function actualizarCarritoDOM() {
    const contenedorCarrito = document.getElementById('carrito-contenedor');
    const contadorCarrito = document.getElementById('contador-carrito'); // El badge rojo del header
    const totalCarrito = document.getElementById('carrito-total');
    
    // 1. Actualizar contador rojo
    if (contadorCarrito) {
        contadorCarrito.textContent = carrito.length;
    }

    // 2. Pintar los elementos dentro del Offcanvas
    if (contenedorCarrito) {
        contenedorCarrito.innerHTML = '';

        if (carrito.length === 0) {
            contenedorCarrito.innerHTML = '<p class="text-center text-muted">El carrito está vacío.</p>';
        } else {
            carrito.forEach((prod, indice) => {
                const div = document.createElement('div');
                div.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'border-bottom', 'pb-2');
                div.innerHTML = `
                    <div>
                        <h6 class="mb-0 fs-6">${prod.nombre}</h6>
                        <small class="text-primary">$${prod.precio.toLocaleString()}</small>
                    </div>
                    <button class="btn btn-sm btn-outline-danger" onclick="eliminarDelCarrito(${indice})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                `;
                contenedorCarrito.appendChild(div);
            });
        }
    }

    // 3. Calcular y mostrar total
    if (totalCarrito) {
        const total = carrito.reduce((acc, prod) => acc + prod.precio, 0);
        totalCarrito.textContent = `$${total.toLocaleString()}`;
    }
}
