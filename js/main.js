fetch("datos/ropa.json")
  .then(res => res.json())
  .then(data => {
    const contenedor = document.getElementById("datosRopa");
    data.ropa.forEach(ropa => {
      contenedor.innerHTML += crearTarjetaRopa(ropa);
    });
  })
  .catch(error => console.error("Error cargando ropa:", error));
function crearTarjetaRopa(ropa) {
  const vendidos = JSON.parse(localStorage.getItem("vendidos")) || [];
  const estaVendido = vendidos.includes(ropa.Id);

  return `
    <div class="col-8 col-sm-4 col-md-3 col-lg-3 mb-4">
      <div class="bg-light text-center p-3 h-100 d-flex flex-column justify-content-between"
           style="cursor: pointer;" onclick="verDetalle(${ropa.Id})">
        <img src="${ropa.imagen}" alt="${ropa.descripcion}" class="img-fluid mb-3" style="max-height: 550px; object-fit: contain;">
        <div>
          <p class="mb-1 fw-semibold small">${ropa.descripcion}</p>
          <p class="text-muted small">₡ ${ropa.precio}</p>
          ${estaVendido ? '<span class="badge bg-danger">AGOTADO</span>' : ''}
        </div>
      </div>
    </div>
  `;
}


function verDetalle(id) {
  // Redirige pasando el ID en la URL
  window.location.href = `detalle.html?id=${id}`;
}

function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contador = document.getElementById("contadorCarrito");
  if (contador) {
    contador.textContent = carrito.length;
  }
}

document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);

