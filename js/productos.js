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
                <p>${producto.nombre}</p>
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
