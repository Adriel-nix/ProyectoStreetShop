const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// Cargar JSON y buscar el producto
fetch("datos/clothes.json")
  .then(res => res.json())
  .then(data => {
    const producto = data.clothes.find(item => item.Id == id);
    if (producto) {
      mostrarDetalle(producto);
    } else {
      document.getElementById("detalleProducto2").innerHTML = "<p>Producto no encontrado.</p>";
    }
  })
  .catch(error => console.error("Error:", error));

// Mostrar info
function mostrarDetalle(clothes) {
  const vendidos = JSON.parse(localStorage.getItem("vendidos2")) || [];
  const estaVendido = vendidos.includes(clothes.Id);

  document.getElementById("detalleProducto2").innerHTML = `
    <div class="row espacioCarrito">
      <div class="col-md-6">
        <img src="${clothes.imagen}" class="img-fluid rounded">
      </div>
      <div class="col-md-6">
        <h2>${clothes.descripcion}</h2>
        <h4 class="text-muted">₡ ${clothes.precio}</h4>
        <p>${clothes.Talla}</p>
        ${estaVendido
          ? '<button class="btn btn-secondary mt-3" disabled>Producto Agotado</button>'
          : `<button class="btn btn-dark mt-3" onclick="agregarACesta(${clothes.Id})">Añadir a la cesta</button>`
        }
      </div>
    </div>
  `;
}

function agregarACesta(id) {
  // Obtener el carrito actual (si existe)
  let carrito2 = JSON.parse(localStorage.getItem("carrito2")) || [];

  // Verificamos que no esté ya agregado (porque es único)
  if (!carrito2.includes(id)) {
    carrito2.push(id);
    localStorage.setItem("carrito2", JSON.stringify(carrito2));
    actualizarContadorCarrito();
    alert("Producto añadido a la cesta.");
  } else {
    alert("Este producto ya está en la cesta.");
  }
}