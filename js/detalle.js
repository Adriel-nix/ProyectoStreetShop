const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// Cargar JSON y buscar el producto
fetch("datos/ropa.json")
  .then(res => res.json())
  .then(data => {
    const producto = data.ropa.find(item => item.Id == id);
    if (producto) {
      mostrarDetalle(producto);
    } else {
      document.getElementById("detalleProducto").innerHTML = "<p>Producto no encontrado.</p>";
    }
  })
  .catch(error => console.error("Error:", error));

// Mostrar info
function mostrarDetalle(ropa) {
  const vendidos = JSON.parse(localStorage.getItem("vendidos")) || [];
  const estaVendido = vendidos.includes(ropa.Id);

  document.getElementById("detalleProducto").innerHTML = `
    <div class="row espacioCarrito">
      <div class="col-md-6">
        <img src="${ropa.imagen}" class="img-fluid rounded">
      </div>
      <div class="col-md-6">
        <h2>${ropa.descripcion}</h2>
        <h4 class="text-muted">₡ ${ropa.precio}</h4>
        <p>Talla: M</p>
        ${estaVendido
          ? '<button class="btn btn-secondary mt-3" disabled>Producto Agotado</button>'
          : `<button class="btn btn-dark mt-3" onclick="agregarACesta(${ropa.Id})">Añadir a la cesta</button>`
        }
      </div>
    </div>
  `;
}

function agregarACesta(id) {
  // Obtener el carrito actual (si existe)
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Verificamos que no esté ya agregado (porque es único)
  if (!carrito.includes(id)) {
    carrito.push(id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
    alert("Producto añadido a la cesta.");
  } else {
    alert("Este producto ya está en la cesta.");
  }
}