let materias = [];
let materiasInscriptas = [];

obtenerMaterias();

async function obtenerMaterias() {
  try {
    const response = await fetch("../recursos/data/materias.json");
    if (!response.ok) {
      throw new Error("Error mensaje" + response.status);
    }
    const data = await response.json();
    materias = data;
    mostrarMateriasInscriptas();
  } catch (error) {
    console.error("Error en la carga de las materias");
  }
}

function mostrarMateriasInscriptas(){
    materiasInscriptas = materias.filter(materia => materia.estaInscripto);
    const section = document.getElementById("container-materias-ins");
    section.innerHTML = '';
    materiasInscriptas.forEach(materia => {
        const card = document.createElement("article");
        card.className = "card"; 
        const cuatrimestreText = formatCuatrimestre(materia.cuatrimestre);
        card.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${materia.nombre}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">${cuatrimestreText}</h6>
                    <p class="card-text">${materia.descripcion}</p>
                </div>`
        section.appendChild(card);
    });
}

function formatCuatrimestre(cuatrimestre){
    const arrText = cuatrimestre.split("/");
    return `Cuatrimestre ${arrText[0]} del ${arrText[1]}`;
}