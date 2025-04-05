
    // se encarga de asegurarse que 
    // todo el codigo html este cargado 
    // menos imagenes(obligatorio añadir)
    document.addEventListener("DOMContentLoaded", function () { 
        
    // Función para mostrar estrellas en las reseñas existentes
    // 1. Función para mostrar estrellas en las reseñas existentes
    const ratings = document.querySelectorAll(".star-rating");
    ratings.forEach(rating => {
    const score = parseInt(rating.getAttribute("data-rating"), 10);  // obtiene el valor numérico de la calificación
    let stars = "";
    for (let i = 1; i <= 5; i++) { //repite el codigo 5 veces
        stars += i <= score ? "★" : "☆";  // agrega una estrella llena o vacía según el puntaje
    }
    rating.innerHTML = stars;  // refleja las estrellas en el html
  });
});



// 🔹 NUEVO: Obtener reseñas desde PHP
fetch("resenas.php")  // Se agregó esta línea para llamar al PHP
.then(response => response.json())  // Convertir la respuesta en JSON
.then(data => {  // Se agregó la función para manejar los datos
    const reviewContainer = document.querySelector(".Reseñas");  // Se selecciona el contenedor donde van las reseñas
    reviewContainer.innerHTML = "";  // Limpiar el contenedor antes de agregar las reseñas

    data.forEach(review => {  // Se recorre cada reseña obtenida
        const newReview = document.createElement("div");  // Se crea un nuevo div
        newReview.classList.add("review-container");  // Se agrega la clase CSS

        newReview.innerHTML = `
            <div class="review-header">
                <span class="username">${review.Nombre}</span> 
                <p class="review-text">${review.Comentario}</p> 
                <div class="star-rating">${"★".repeat(review.Valoracion) + "☆".repeat(5 - review.Valoracion)}</div>
            </div>
            `
        ;

        reviewContainer.appendChild(newReview);  // Se agrega la reseña al contenedor
    });
})
.catch(error => console.error("Error al obtener reseñas:", error));  // Manejo de errores

////////////////////////////////////////////////////////////////////////////////////////////////////


// 4. Evento para manejar la creación de una nueva reseña
document.getElementById("submit-review").addEventListener("click", function () {
  const username = document.getElementById("username").value.trim();  // obtiene el nombre de usuario
  const reviewText = document.getElementById("review-text").value.trim();  // obtiene el texto de la reseña

  // Verificar que se haya completado el formulario
  if (username === "" || reviewText === "" || selectedRating === 0) {
      alert("Por favor completa todos los campos y selecciona una calificación.");
      return;  // si falta algún dato, no se crea la reseña
  }

  // Crear el nuevo elemento de reseña
  const newReview = document.createElement("div");
  newReview.id = "review-container"; //problema
  newReview.innerHTML = `
      <div id="review-header">
          <span class="username">${username}</span>
          <p class="review-text">${reviewText}</p>
          <div class="star-rating">${"★".repeat(selectedRating) + "☆".repeat(5 - selectedRating)}</div>
      </div>

  `;
  
  // Agregar la nueva reseña al contenedor
  document.querySelector(".Reseñas").prepend(newReview);


  // Limpiar el formulario
  document.getElementById("username").value = "";  // limpiar campo de nombre
  document.getElementById("review-text").value = "";  // limpiar campo de texto
  starInputs.forEach(s => s.classList.remove("selected"));  // eliminar el resalto de las estrellas
  selectedRating = 0;  // resetear la calificación seleccionada

  });

  // 2. Variables para manejar la calificación seleccionada
  let selectedRating = 0;
  const starInputs = document.querySelectorAll(".star-input span");

// 3. Evento para seleccionar la calificación de estrellas
  starInputs.forEach(star => {
  star.addEventListener("click", function () {
  // Obtiene el valor de la calificación de estrellas desde el atributo 'data-value'
  // y lo convierte a un número entero usando base 10 cuando se hace clic en una estrella
  selectedRating = parseInt(this.getAttribute("data-value"), 10);

  // Elimina la clase 'selected' de todas las estrellas
  // Esto asegura que solo la estrella seleccionada esté resaltada
  starInputs.forEach(s => s.classList.remove("selected"));

  // Agrega la clase 'selected' a la estrella que se hizo clic
  // Esto cambia el color de la estrella seleccionada para reflejar la calificación
  this.classList.add("selected");
      });
  });