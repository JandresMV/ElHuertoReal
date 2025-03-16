document.addEventListener("DOMContentLoaded", function () {
    fetch("data/productos.json")
        .then(response => response.json())
        .then(data => {
            cargarProductos(data.frutas.frutos_rojos, "frutos-rojos");
            cargarProductos(data.frutas.frutas_tropicales, "frutas-tropicales");
            cargarProductos(data.verduras.verduras_frescas, "verduras-frescas");
            cargarProductos(data.verduras.tuberculos_hortalizas, "tuberculos-hortalizas");
        })
        .catch(error => console.error("Error cargando productos:", error));
});

function cargarProductos(listaProductos, contenedorId) {
    let contenedor = document.getElementById(contenedorId);
    listaProductos.forEach(producto => {
        let productoHTML = `
            <div class="producto">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p class="descripcion">${producto.descripcion}</p>
                <p>Precio: $${producto.precio_kg}/kg | $${producto.precio_lb}/lb</p>

                <label for="unidad-${producto.nombre}">Comprar por:</label>
                <select id="unidad-${producto.nombre}">
                    <option value="kg">Kilo</option>
                    <option value="lb">Libra</option>
                </select>

                <label for="cantidad-${producto.nombre}">Cantidad:</label>
                <input type="number" id="cantidad-${producto.nombre}" value="1" min="1">

                <button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio_kg}, ${producto.precio_lb})">Añadir al carrito</button>
            </div>
        `;
        contenedor.innerHTML += productoHTML;
    });
}

function agregarAlCarrito(nombre, precio_kg, precio_lb) {
    let unidadSeleccionada = document.getElementById(`unidad-${nombre}`).value;
    let cantidad = parseFloat(document.getElementById(`cantidad-${nombre}`).value);
    let precio = unidadSeleccionada === "kg" ? precio_kg : precio_lb;

    // Si la cantidad es válida
    if (cantidad > 0) {
        let productoExistente = carrito.find(item => item.nombre === nombre && item.unidad === unidadSeleccionada);

        if (productoExistente) {
            productoExistente.cantidad += cantidad;
        } else {
            carrito.push({ nombre, precio, unidad: unidadSeleccionada, cantidad });
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        alert(`${cantidad} ${unidadSeleccionada}(s) de ${nombre} añadido al carrito`);
    } else {
        alert("Por favor ingresa una cantidad válida.");
    }
}
