const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = 0;

// Cargar productos en el resumen
// fetch("datos/ropa.json")
fetch("https://raw.githubusercontent.com/Adriel-nix/ProyectoStreetShop/master/datos/ropa.json")
  .then(res => res.json())
  .then(data => {
    const lista = document.getElementById("resumenCarrito");
    const productos = data.ropa.filter(item => carrito.includes(item.Id));

    productos.forEach(producto => {
      const precioNum = parseFloat(producto.precio.replace(/[₡.,]/g, ""));
      total += isNaN(precioNum) ? 0 : precioNum;

      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `
        ${producto.descripcion}
        <span class="text-muted">₡ ${producto.precio}</span>
      `;
      lista.appendChild(li);
    });

    document.getElementById("totalPrecio").textContent = `₡ ${total.toLocaleString("es-CR")}`;
  });

// Manejo del formulario
document.getElementById("formCheckout").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const direccion = document.getElementById("direccion").value.trim();
  const metodoPago = document.getElementById("metodoPago").value;

  if (!nombre || !correo || !direccion || !metodoPago) {
    alert("Por favor completá todos los campos.");
    return;
  }

  // Mostrar confirmación
  alert(`Gracias por tu compra, ${nombre}.\nTe contactaremos a ${correo} para coordinar la entrega.`);

  
  // Vaciar carrito
  localStorage.removeItem("carrito");
  window.location.href = "index.html"; // Volver a la tienda

  let vendidos = JSON.parse(localStorage.getItem("vendidos")) || [];
vendidos = [...new Set([...vendidos, ...carrito])]; // Evita duplicados
localStorage.setItem("vendidos", JSON.stringify(vendidos));

// Vaciar carrito
localStorage.removeItem("carrito");
});



