// Función para cargar los datos cuando se abre la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarManualidades();
});

function agregarManualidad() {
    const nombre = document.getElementById('nombre-proyecto').value;
    const info = document.getElementById('info-proyecto').value;
    const materiales = document.getElementById('materiales-proyecto').value;

    if (nombre === "" || info === "" || materiales === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const nuevoProyecto = {
        id: Date.now(), // ID único basado en el tiempo
        nombre: nombre,
        info: info,
        materiales: materiales
    };

    // 1. Obtener lo que ya existe en LocalStorage
    let proyectos = JSON.parse(localStorage.getItem('misManualidades')) || [];
    
    // 2. Agregar el nuevo
    proyectos.push(nuevoProyecto);
    
    // 3. Guardar de nuevo en LocalStorage (esto hace que no se pierdan los datos)
    localStorage.setItem('misManualidades', JSON.stringify(proyectos));

    // Limpiar campos y actualizar vista
    document.getElementById('nombre-proyecto').value = "";
    document.getElementById('info-proyecto').value = "";
    document.getElementById('materiales-proyecto').value = "";
    
    mostrarManualidades();
}

function mostrarManualidades() {
    const contenedor = document.getElementById('contenedor-proyectos');
    const proyectos = JSON.parse(localStorage.getItem('misManualidades')) || [];
    
    contenedor.innerHTML = ""; // Limpiar antes de mostrar

    proyectos.forEach(p => {
        contenedor.innerHTML += `
            <div class="card-proyecto">
                <h4>${p.nombre}</h4>
                <p><strong>Descripción:</strong> ${p.info}</p>
                <p><strong>Materiales:</strong> ${p.materiales}</p>
                <button class="btn-eliminar" onclick="eliminarManualidad(${p.id})">Eliminar</button>
            </div>
        `;
    });
}

function eliminarManualidad(id) {
    let proyectos = JSON.parse(localStorage.getItem('misManualidades')) || [];
    proyectos = proyectos.filter(p => p.id !== id);
    localStorage.setItem('misManualidades', JSON.stringify(proyectos));
    mostrarManualidades();
}
