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
        img: "https://images.unsplash.com/photo-1628283927680-e6992d958567?auto=format&fit=crop&w=500&q=80"
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
