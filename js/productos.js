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
    contenedor.innerHTML = ""; // Limpiar el contenedor antes de cargar nuevos productos
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
    const cantidad = document.getElementById(`cantidad-${nombre}`).value;
    const unidad = document.getElementById(`unidad-${nombre}`).value;
    const precio = unidad === "kg" ? precio_kg : precio_lb;

    const item = {
        nombre: nombre,
        precio: precio,
        cantidad: parseInt(cantidad),
        unidad: unidad
    };

    // Aquí se debe agregar el item al carrito (puedes usar localStorage o una variable global)
    carrito.push(item); // Asegúrate de que `carrito` esté definido en un ámbito accesible
    alert(`${nombre} ha sido añadido al carrito.`);
}
