const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', ()=>{
    formulario.addEventListener('submit', buscarClima);
})

function buscarClima(e){
    e.preventDefault();

    // Validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    // console.log(ciudad);
    // console.log(pais);
    if(ciudad==='' || pais === ''){
        // Hubo error
        mostrarError('Ambos campos son obligatorios');
        return;
    }
    // Consulta a la API
    consultarAPI(ciudad, pais);

}

function mostrarError(mensaje){
    const alerta = document.querySelector('.bg-red-100');

    if (!alerta){
    // Crear Alerta
    const alerta = document.createElement('DIV');
    alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
     alerta.innerHTML = `
     <strong class="font-bold">Error!</strong>
     <span class="block">${mensaje}</span>
     `;
    container.appendChild(alerta);

        // Se elimina la alerta luego de unos segundos
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}
function consultarAPI(ciudad, pais){
    const appId = 'a6575e45f0c3e0a163aab6ab5e2c10da';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}, ${pais}&appid=${appId}`;
    // console.log(url);
    Spinner(); // Muestra una spinner recarga
    fetch(url)
        .then(respuesta=> respuesta.json())
        .then(datos=>{
            console.log(datos);
            limpiarHTML();
            if(datos.cod === "404"){
                mostrarError('Ciudad no encontrada');
            }
            // iMPRIME RESPUESTA EN HTML
            mostrarClima(datos);
        });
}
function mostrarClima(datos){
    const {name, main: {temp, temp_max, temp_min}} = datos;
    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);
    // console.log(temp - 273.15);
    const actual = document.createElement('P');
    actual.innerHTML = `${centigrados} &#8451;`
    actual.classList.add('font-bold', 'text-6xl');

    const nombreCiudad = document.createElement('P');
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2zl');
    
    const tempMaxima = document.createElement('P');
    tempMaxima.classList.add('text-xl');
    tempMaxima.innerHTML = `Temp Maxima: ${max} &#8451;`;

    const tempMin = document.createElement('P');
    tempMin.classList.add('text-xl');
    tempMin.innerHTML = `Temp Minima: ${min} &#8451;`;

    const resultadoDiv = document.createElement('DIV');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMin);
    resultado.append(resultadoDiv);
}

const kelvinACentigrados = grados => parseInt(grados-273.15);

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}
function Spinner(){
    limpiarHTML();
    const divSpinner = document.createElement('DIV');
    divSpinner.classList.add('sk-fading-circle');
    divSpinner.innerHTML =`
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
    `;
    resultado.appendChild(divSpinner);
}