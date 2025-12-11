// Esperar a que el documento cargue completamente
document.addEventListener('DOMContentLoaded', function() {
    
    console.log("TecnoSmart Scripts cargados correctamente.");

    // --- FUNCIONALIDAD 1: SIMULACIÓN DE CARRITO DE COMPRAS ---
    // Busca todos los botones que digan "Agregar"
    const botonesAgregar = document.querySelectorAll('.btn-primary');
    const contadorCarrito = document.querySelector('.fa-shopping-cart').nextElementSibling; // El numerito rojo

    // Variable para guardar la cantidad
    let cantidadProductos = 2; // Empezamos con 2 como en el ejemplo HTML

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', function(e) {
            // Si es un botón de formulario (submit), no hacer nada aquí
            if(this.type === 'submit') return;

            // Animación simple y aumento de contador
            cantidadProductos++;
            contadorCarrito.innerText = cantidadProductos;
            
            // Alerta visual temporal (Toast simulado)
            alert("¡Producto agregado al carrito exitosamente!");
        });
    });

    // --- FUNCIONALIDAD 2: VALIDACIÓN DE FORMULARIO DE CONTACTO ---
    const formulario = document.querySelector('form');
    
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita que la página se recargue de verdad

            // Capturar datos (Simulación)
            const nombre = document.getElementById('nombre') ? document.getElementById('nombre').value : 'Cliente';
            
            // Mostrar mensaje de éxito
            alert(`¡Gracias ${nombre}! Hemos recibido tu mensaje. Nos contactaremos contigo pronto.`);
            
            // Limpiar el formulario
            formulario.reset();
        });
    }

    // --- FUNCIONALIDAD 3: MARCAR LINK ACTIVO AUTOMÁTICAMENTE (Opcional) ---
    // Esto ayuda si se te olvidó poner la clase 'active' manual en el HTML
    const path = window.location.pathname;
    const page = path.split("/").pop(); // Obtiene 'index.html', 'productos.html', etc.

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if(link.getAttribute('href') === page) {
            link.classList.add('active');
        }
    });
});

