// 1. Navegación entre secciones
function mostrarSeccion(id) {
    const secciones = ['dashboard', 'manualidades', 'configuracion'];
    secciones.forEach(s => {
        document.getElementById(s).style.display = (s === id) ? 'block' : 'none';
    });
}

// 2. Lógica de Manualidades
function guardarManualidad() {
    const nombre = document.getElementById('nom-proy').value;
    const desc = document.getElementById('desc-proy').value;
    const mat = document.getElementById('mat-proy').value;

    if(!nombre) return alert("Ponle un nombre al menos");

    const nuevo = { id: Date.now(), nombre, desc, mat };
    let lista = JSON.parse(localStorage.getItem('datos_manualidades')) || [];
    lista.push(nuevo);
    localStorage.setItem('datos_manualidades', JSON.stringify(lista));

    // Limpiar y actualizar
    document.getElementById('nom-proy').value = "";
    document.getElementById('desc-proy').value = "";
    document.getElementById('mat-proy').value = "";
    renderizarManualidades();
}

function renderizarManualidades() {
    const contenedor = document.getElementById('lista-manualidades');
    const lista = JSON.parse(localStorage.getItem('datos_manualidades')) || [];
    contenedor.innerHTML = lista.map(p => `
        <div class="card-proy">
            <h3>${p.nombre}</h3>
            <p><strong>Info:</strong> ${p.desc}</p>
            <p><strong>Materiales:</strong> ${p.mat}</p>
            <button onclick="borrar(${p.id})" style="color:red; border:none; background:none; cursor:pointer;">Eliminar</button>
        </div>
    `).join('');
}

function borrar(id) {
    let lista = JSON.parse(localStorage.getItem('datos_manualidades')) || [];
    lista = lista.filter(p => p.id !== id);
    localStorage.setItem('datos_manualidades', JSON.stringify(lista));
    renderizarManualidades();
}

// 3. Respaldo
function exportarJSON() {
    const data = localStorage.getItem('datos_manualidades');
    const blob = new Blob([data], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mi_respaldo.json';
    a.click();
}

function importarJSON(e) {
    const reader = new FileReader();
    reader.onload = (event) => {
        localStorage.setItem('datos_manualidades', event.target.result);
        renderizarManualidades();
        alert("¡Datos cargados!");
    };
    reader.readAsText(e.target.files[0]);
}

// Iniciar al cargar
window.onload = renderizarManualidades;
