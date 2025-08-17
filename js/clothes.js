function limpiarPrecio(precioStr) {
  const limpio = precioStr.replace(/[^\d]/g, "");
  return parseInt(limpio) || 0;
}



let productosOriginales = [];

fetch("https://raw.githubusercontent.com/Adriel-nix/ProyectoStreetShop/master/datos/clothes.json")
  .then(res => res.json())
  .then(data => {
    productosOriginales = data.clothes;
    renderizarProductos(); // mostrar inicialmente
  });

function renderizarProductos() {
  const contenedor = $("#datosClothes");
  contenedor.html("");

  let productos = [...productosOriginales];

  const vendidos = JSON.parse(localStorage.getItem("vendidos2")) || [];

  const disponibilidad = $("#filtroDisponibilidad").val();
  const precioOrden = $("#filtroPrecio").val();
  const ordenABC = $("#filtroOrden").val();

  // Filtro por disponibilidad
  if (disponibilidad === "Disponible") {
    productos = productos.filter(p => !vendidos.includes(p.Id));
  } else if (disponibilidad === "Agotado") {
    productos = productos.filter(p => vendidos.includes(p.Id));
  }

  if (precioOrden === "De menor a mayor") {
    productos.sort((a, b) => limpiarPrecio(a.precio) - limpiarPrecio(b.precio));
  } else if (precioOrden === "De mayor a menor") {
    productos.sort((a, b) => limpiarPrecio(b.precio) - limpiarPrecio(a.precio));
  }

  productos.forEach(p => contenedor.append(crearTarjetaRopa(p)));
}

function crearTarjetaRopa(clothes) {
  const vendidos = JSON.parse(localStorage.getItem("vendidos2")) || [];
  const estaVendido = vendidos.includes(clothes.Id);

  return `
    <div class="col-8 col-sm-4 col-md-3 col-lg-3 mb-4">
      <div class="bg-light text-center p-3 h-100 d-flex flex-column justify-content-between"
           style="cursor: pointer;" onclick="verDetalle(${clothes.Id})">
        <img src="${clothes.imagen}" alt="${clothes.descripcion}" class="img-fluid mb-3" style="max-height: 550px; object-fit: contain;">
        <div>
          <p class="mb-1 fw-semibold small">${clothes.descripcion}</p>
          <p class="text-muted small">₡ ${clothes.precio}</p>
          ${estaVendido ? '<span class="badge bg-danger">AGOTADO</span>' : ''}
        </div>
      </div>
    </div>
  `;
}


function verDetalle(id) {
  // Redirige pasando el ID en la URL
  window.location.href = `detalle2.html?id=${id}`;
}

function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito2")) || [];
  const contador = document.getElementById("contadorCarrito2");
  if (contador) {
    contador.textContent = carrito.length;
  }
}

document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);


$("#filtroDisponibilidad, #filtroPrecio, #filtroOrden").on("change", function () {
  renderizarProductos();
});


