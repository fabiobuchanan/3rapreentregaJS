const productos = [
    { id: 1, nombre: "Suscripción Mensual", img: "img/yoga1.jpg", categoria: "suscripción", precio: 20 },
        { id: 2, nombre: "Suscripción Semestral", img: "img/yoga2.jpg", categoria: "suscripción", precio: 18 },
        { id: 3, nombre: "Suscripción Anual", img: "img/yoga3.jpg", categoria: "suscripción", precio: 16 },
        { id: 4, nombre: "Paquete 3 Clases", img: "img/yoga4.jpg", categoria: "clase", precio: 10 },
        { id: 5, nombre: "Paquete 5 Clases", img: "img/yoga5.jpg", categoria: "clase", precio: 16 },
        { id: 6, nombre: "Paquete 7 Clases", img: "img/yoga6.jpg", categoria: "clase", precio: 24 },
        { id: 7, nombre: "Paquete 9 Clases", img: "img/yoga7.jpg", categoria: "clase", precio: 30 },
        { id: 8, nombre: 'Remera', img: "img/yoga8.jpg", categoria: "indumentaria", precio: 5000 },
        { id: 9, nombre: 'Calza', img: "img/yoga9.jpg", categoria: "indumentaria", precio: 10000 },
        { id: 10, nombre: 'Gorra', img: "img/yoga10.jpg", categoria: "indumentaria", precio: 4500 },
        { id: 11, nombre: 'Sweater', img: "img/yoga11.jpg", categoria: "indumentaria", precio: 12000 },
        { id: 12, nombre: 'Campera', img: "img/yoga12.jpg", categoria: "indumentaria", precio: 20000 }
    ];

    const productContainer = document.getElementById("product-container");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    let cart = [];

    // Función para mostrar productos en tarjetas
    function mostrarProductosEnTarjetas() {
        productContainer.innerHTML = "";

        productos.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <img src="${product.img}" alt="${product.nombre}">
                <h2>${product.nombre}</h2>
                <p>Precio: $${product.precio}</p>
                <button onclick="agregarAlCarrito(${product.id})">Agregar al Carrito</button>
            `;
            productContainer.appendChild(card);
        });
    }

    // Función para agregar productos al carrito
    function agregarAlCarrito(productId) {
        const product = productos.find(p => p.id === productId);
        if (product) {
            cart.push(product);
            actualizarCarrito();
            guardarCarritoEnLocalStorage();
        }
    }

    // Función para actualizar la vista del carrito
    function actualizarCarrito() {
        cartItems.innerHTML = "";
        let totalPrice = 0;

        cart.forEach(product => {
            const cartItem = document.createElement("li");
            cartItem.innerHTML = `
                <span>${product.nombre}</span>
                <span>$${product.precio}</span>
                <button onclick="eliminarDelCarrito(${product.id})">Eliminar</button>
            `;
            cartItems.appendChild(cartItem);
            totalPrice += product.precio;
        });

        cartTotal.textContent = `Total: $${totalPrice}`;
    }

    // Función para eliminar productos del carrito
    function eliminarDelCarrito(productId) {
        const productIndex = cart.findIndex(p => p.id === productId);
        if (productIndex !== -1) {
            cart.splice(productIndex, 1);
            actualizarCarrito();
            guardarCarritoEnLocalStorage();
        }
    }

    // Función para cargar los datos del carrito desde Local Storage
    function cargarCarritoDesdeLocalStorage() {
        const carritoGuardado = localStorage.getItem("carrito");
        if (carritoGuardado) {
            cart = JSON.parse(carritoGuardado);
            actualizarCarrito();
        }
    }

    // Función para guardar los datos del carrito en Local Storage
    function guardarCarritoEnLocalStorage() {
        localStorage.setItem("carrito", JSON.stringify(cart));
    }

    cargarCarritoDesdeLocalStorage(); // Cargamos el carrito al cargar la página
    mostrarProductosEnTarjetas();