const ids = JSON.parse(localStorage.getItem("carrito2")) || [];

fetch("https://raw.githubusercontent.com/Adriel-nix/ProyectoStreetShop/master/datos/clothes.json")
  .then(res => res.json())
  .then(data => {
    const contenedor = document.getElementById("contenedorCarrito2");
    if (ids.length === 0) {
      contenedor.innerHTML = "<p>No hay productos en la cesta.</p>";
      return;
    }
   const productos = data.clothes.filter(clothes => ids.includes(clothes.Id));
    productos.forEach(clothes => {
      contenedor.innerHTML += `
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <img src="${clothes.imagen}" class="card-img-top" alt="${clothes.descripcion}">
            <div class="card-body">
              <h5 class="card-title">${clothes.descripcion}</h5>
              <p class="card-text">₡ ${clothes.precio}</p>
            </div>
          </div>
        </div>
      `;
    });
  });


  function vaciarCarrito() {
  localStorage.removeItem("carrito2");
  location.reload(); // refrescar
  }