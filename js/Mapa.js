// Coordenadas del restaurante
const restauranteCoords = { lat: 10.01730, lng: -84.21369 }; // Frente a iglesia San Rafael de Alajuela

let map, userMarker, directionsService, directionsRenderer;

// === 1. Inicializar el mapa ===
// Initialize and add the map

async function initMap() {
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 15,
    center: restauranteCoords,
    mapId: "MapaLocal",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: restauranteCoords,
    title: "Local",
  });

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  obtenerUbicacion();
}




// === 2. Obtener la posición del usuario ===
function obtenerUbicacion() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(mostrarPosicion, manejarError);
  } else {
    alert("Geolocalización no es soportada por tu navegador.");
  }
}

// === 3. Manejo de errores ===
function manejarError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("Permiso denegado para obtener tu ubicación.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Información de ubicación no disponible.");
      break;
    case error.TIMEOUT:
      alert("Tiempo de espera agotado.");
      break;
    default:
      alert("Error desconocido.");
      break;
  }
}

// === 4. Mostrar posición actual en el mapa ===
function mostrarPosicion(position) {
  const userCoords = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };

  calcularDistancia(userCoords);
  trazarRuta(userCoords, restauranteCoords);
}

// === 5. Calcular distancia entre usuario y restaurante ===
function calcularDistancia(origen) {
  const servicio = new google.maps.DistanceMatrixService();
  servicio.getDistanceMatrix(
    {
      origins: [origen],
      destinations: [restauranteCoords],
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (response, status) => {
      if (status === "OK") {
        const distancia = response.rows[0].elements[0].distance.text;
        const duracion = response.rows[0].elements[0].duration.text;
        document.getElementById("distancia").innerText = `Distancia: ${distancia}, Duración: ${duracion}`;
      }
    }
  );
}

// === 6. Trazar ruta desde ubicación actual al restaurante ===
function trazarRuta(origen, destino) {
  const solicitud = {
    origin: origen,
    destination: destino,
    travelMode: google.maps.TravelMode.DRIVING,
  };

  directionsService.route(solicitud, (result, status) => {
    if (status === "OK") {
      directionsRenderer.setDirections(result);
    } else {
      alert("No se pudo trazar la ruta.");
    }
  });
}




const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Enviando...';

   const serviceID = 'default_service';
   const templateID = 'template_ibb85bi';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Message';
      alert('Mensaje Enviado!');
      form.reset();
    }, (err) => {
      btn.value = 'Send Message';
      alert(JSON.stringify(err));
    });
});