const ids = JSON.parse(localStorage.getItem("carrito")) || [];

fetch("datos/ropa.json")
  .then(res => res.json())
  .then(data => {
    const contenedor = document.getElementById("contenedorCarrito");
    if (ids.length === 0) {
      contenedor.innerHTML = "<p>No hay productos en la cesta.</p>";
      return;
    }

    const productos = data.ropa.filter(ropa => ids.includes(ropa.Id));
    productos.forEach(ropa => {
      contenedor.innerHTML += `
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <img src="${ropa.imagen}" class="card-img-top" alt="${ropa.descripcion}">
            <div class="card-body">
              <h5 class="card-title">${ropa.descripcion}</h5>
              <p class="card-text">₡ ${ropa.precio}</p>
            </div>
          </div>
        </div>
      `;
    });
  });


  function vaciarCarrito() {
  localStorage.removeItem("carrito");
  location.reload(); // refrescar
}