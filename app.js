let amigos = [];

function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();
    
    if (!nombre) {
        alert("Por favor, inserte un nombre válido.");
        input.focus();
        return;
    }
    
    if (amigos.includes(nombre)) {
        alert("El nombre ya fue ingresado.");
        input.select();
        return;
    }
    
    amigos.push(nombre);
    actualizarListaAmigos();
    input.value = "";
    input.focus();
}

function actualizarListaAmigos() {
    const listaAmigos = document.getElementById("listaAmigos");
    listaAmigos.innerHTML = "";
    
    // Usamos fragmento para mejor rendimiento
    const fragmento = document.createDocumentFragment();
    amigos.forEach(amigo => {
        const li = document.createElement("li");
        li.textContent = amigo;
        fragmento.appendChild(li);
    });
    listaAmigos.appendChild(fragmento);
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Se necesitan al menos 2 amigos para sortear.");
        return;
    }

    let shuffled;
    let intentos = 0;
    const MAX_INTENTOS = 100;

    // Algoritmo mejorado para asignación segura
    do {
        shuffled = [...amigos].sort(() => Math.random() - 0.5);
        intentos++;
    } while (shuffled.some((nombre, i) => nombre === amigos[i]) && intentos < MAX_INTENTOS);

    if (intentos >= MAX_INTENTOS) {
        alert("No se pudo generar un sorteo válido.");
        return;
    }

    const resultado = amigos.map((amigo, i) => ({
        amigo,
        secreto: shuffled[i]
    }));

    mostrarResultado(resultado);
}

function mostrarResultado(resultado) {
    const resultadoLista = document.getElementById("resultado");
    resultadoLista.innerHTML = "";
    
    const fragmento = document.createDocumentFragment();
    resultado.forEach(pair => {
        const li = document.createElement("li");
        li.innerHTML = `<span class="amigo">${pair.amigo}</span> → <span class="secreto">${pair.secreto}</span>`;
        fragmento.appendChild(li);
    });
    resultadoLista.appendChild(fragmento);
}

function seleccionarAmigoAleatorio() {
    if (!amigos.length) {
        alert("No hay amigos en la lista para sortear.");
        return;
    }
    
    const ganador = amigos[Math.floor(Math.random() * amigos.length)];
    const resultado = document.getElementById("resultado");
    
    // Versión segura contra XSS
    resultado.innerHTML = "";
    const li = document.createElement("li");
    li.textContent = "El amigo seleccionado es: ";
    const strong = document.createElement("strong");
    strong.textContent = ganador;
    li.appendChild(strong);
    resultado.appendChild(li);
}