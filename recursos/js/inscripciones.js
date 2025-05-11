let materias = [];
let materiasParaInscribirse = [];
let materiasRecomendadas = [];

fetch("../recursos/data/materias.json")
    .then(res => res.json())
    .then(data => {
        materias = data;
        mostrarMateriasRecomendadas();
        mostrarMateriasParaInscribirse();
    })
    .catch(error => {
        console.error("Error al cargar materias:", error);
    });

function mostrarMateriasParaInscribirse(){
    materiasParaInscribirse = materias.filter(
        materia => !materia.estaInscripto && materia.cantidadDeInscriptos < materia.cupo
    );

    const section = document.getElementById("container-materias");
    section.innerHTML = '';

    materiasParaInscribirse.forEach(materia => {
        const card = document.createElement("article");
        card.className = "card";
        card.id = "materia_" + materia.id;

        const cuatrimestreText = formatCuatrimestre(materia.cuatrimestre);

        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${materia.nombre}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">${cuatrimestreText}</h6>
                <p class="card-text">${materia.descripcion}</p>
                <button class="card-link inscribirse btn btn-primary" data-id="${materia.id}" data-nombre="${materia.nombre}">Inscribirse</button>
            </div>
        `;

        const boton = card.querySelector("button");
        boton.addEventListener("click", () => inscribirseAMateria(materia.id, materia.nombre));

        section.appendChild(card);
    });
}

function inscribirseAMateria(id, nombre){
    const materiaInscripta = document.getElementById("materia_" + id);
    if (materiaInscripta){
        alert("Te inscribiste en la materia " + nombre);
        materiaInscripta.style.display = "none";
        const materiaRecomendada = document.getElementById("materiaRecomendada_" + id);
        if(materiaRecomendada){
            materiaRecomendada.style.display = "none";
        }
    }
}

function formatCuatrimestre(cuatrimestre){
    const arrText = cuatrimestre.split("/");
    return `Cuatrimestre ${arrText[0]} del ${arrText[1]}`;
}

function mostrarMateriasRecomendadas(){
    materiasRecomendadas = materias.filter(materia => !materia.estaInscripto && materia.cupo > materia.cantidadDeInscriptos && materia.esRecomendada);
    const section = document.getElementById("container-materias-recomendadas");
    section.innerHTML = '';
    materiasRecomendadas.forEach(materia => {
        const card = document.createElement("article");
        card.id = "materiaRecomendada_" + materia.id;
        card.innerHTML = `
                <button data-id="materiaRecomendada_${materia.id}" class="btn btn-primary">${materia.nombre}</button>`
                
        const boton = card.querySelector("button");
        boton.addEventListener("click", () => llevarAMateria(materia.id, materia.nombre));

        section.appendChild(card);
    });
}

function llevarAMateria(idMateria){
    const materiaSeleccionada = document.getElementById("materia_" + idMateria);
    if(materiaSeleccionada){
        materiaSeleccionada.scrollIntoView();
        materiaSeleccionada.classList.add("materia-destacada");
        setTimeout(() => {
            materiaSeleccionada.classList.remove("materia-destacada");
        }, 3000);
    }
}
