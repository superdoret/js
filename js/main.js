
const tours = document.querySelector('#ListaDeTours');  
const total = document.querySelector('#total');
const contenidoDelCarrito = document.querySelector('#carritoContenido tbody');
const botonVaciar = document.querySelector('#vaciarCarrito');
let contenidoGeneral = [];

//Creo los listeners
loadEventListeners();

function loadEventListeners () {
    
//comprar Tour
tours.addEventListener('click', comprarTour);
//remover curso
contenidoDelCarrito.addEventListener('click', removerTour);
//limpiar carrito
botonVaciar.addEventListener('click', limpiarCarrito);
//domcargado
document.addEventListener('DOMContentLoaded', getFromLocalStorage);   
}
// Creo las funciones

$(document).ready(()=> {     // No es necesario el document.ready 
    $("#contenido").show("slow", ()=> {
        $.getJSON("js/datos.json", (response, status)=> {
            if (status === "success") {
                let contenido = response
                    contenidoGeneral = contenido
                    for (const tour2 of contenido) {
                        $("#ListaDeTours").append(cargoCard(tour2));
                    }
            } else {
                $("#ListaDeTours").html(contenidoError);
            }
            $("#ListaDeTours").fadeIn("slow");
        })
    });
});  

const contenidoError = `<div class="center">
                            <h4 >No se pudo recuperar el contenido</h4>
                            <h5>Intente nuevamente en unos segundos...</h5>
                        </div>`

const cargoCard = (tour2) => {
    let streaming = JSON.stringify(tour2)
        const card = `  <div class="col">
                            <div class="card">
                                <img src="${tour2.img}" class="card-img-top">
                                <div class="card-body">
                                    <h4>${tour2.h4}</h4>
                                    <p class="price">$<span>${tour2.price}</span></p>
                                    <a href="#" class="btn btn-danger input agregarAlCarrito" data-id="${tour2.id}">Reservar</a>
                                    <a href="#" class="btn btn-outline-primary">+Info</a>
                                </div>
                            </div>
                        </div>`
        return card;
}


//Función para comprar tours
function comprarTour(e) {
    e.preventDefault();
    
    if (e.target.classList.contains('agregarAlCarrito')) {
        const tour = e.target.parentElement.parentElement;
        infoDeTours(tour);
    }
}

function infoDeTours(tour) {
    // Objetos con info de los datos seleccionados
    const tourInfo = {
        image: tour.querySelector('img').src,
        title: tour.querySelector('h4').textContent,
        price: parseInt( tour.querySelector('.price span').textContent),
        id: tour.querySelector('a').getAttribute('data-id')
    }
    
    // Agregar en el carrito
    agregarDentroCarrito(tourInfo);
    
}

function agregarDentroCarrito(tour) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <tr>
            <td>
                <img src="${tour.image}" width=100>
            </td>
            <td>${tour.title}</td>
            <td>${tour.price}</td>
            <td>
                <a href="#" class="remove" data-id="${tour.id}">-</a>
            </td>
        </tr> `;
        contenidoDelCarrito.appendChild(row);
        //Agregar en local storage
        guardarDentroCarrito(tour);
        //Llama a la función de suma total del carrito
        sumTotal(tour);
}

function sumTotal (tour) {
        let sumar = getTourFromStorage();
        //Luego de obtener los datos del localstorage filtro los datos dejando solo Precios
        let sumarMap = sumar.map((sumar) => sumar.price);
        //Itero para sumar los valores del total
        let sumado=0;
        for(let i of sumarMap) sumado+=i;
        console.log(sumado);  
        
        //Creando la etiqueta en el carrito del Total, limpiando previamente si existe algun dato, para evitar sumas duplicadas (me volvi loco con esto)
        var div = document.getElementById('total');
         while(div.firstChild){ 
             div.removeChild(div.firstChild); 
        }
        //Creando la etiqueta de suma
        const row = document.createElement('div');
         row.innerHTML = `
                <h4>Total: $${sumado}</h4> `;
                total.appendChild(row);
        }

//Agregando los cursos en localStorage
function guardarDentroCarrito(tour) {
    let tours = getTourFromStorage();
    tours.push(tour);
    localStorage.setItem('tours', JSON.stringify(tours) );
}

function getTourFromStorage(){
    //debugger
    let tours;
    // si existe algo previo, obtenemos el valor o limpiamos el array
    if (localStorage.getItem('tours') === null) {   //Revisar tours y el contenido
        tours = [];
        
    } else {
        tours = JSON.parse(localStorage.getItem('tours'));
    }
    return tours;
}
    
// Remover tour del DOM
function removerTour(e) {
    let tour, tourID;

    // Remover
    if(e.target.classList.contains('remove')) {
         e.target.parentElement.parentElement.remove();
         tour = e.target.parentElement.parentElement;
         tourID = tour.querySelector('a').getAttribute('data-id');
    }
    console.log(tourID);
    // Remover de local storage - Item
    removerTourLocalStorage(tourID);
}

// Removiendo curso del localstorage
function removerTourLocalStorage(id) {
    // Acceso a los datos
    let toursLS = getTourFromStorage();

    // iterando el array para comparar con el id obtenido el selector para eliminar el objeto del array
    toursLS.forEach(function(tourLS, index) {
         if(tourLS.id === id) {
              toursLS.splice(index, 1);
         }
    });

    // Agregar el resto del array al localstorage
    localStorage.setItem('tours', JSON.stringify(toursLS));
    // Llama la funcion suma del total de carrito
    sumTotal();
}

//Funcion que vacia el carrito completamente
function limpiarCarrito (e) {
    while (contenidoDelCarrito.firstChild) {
        contenidoDelCarrito.removeChild (contenidoDelCarrito.firstChild);
        
    }
    while (total.firstChild) {
        total.removeChild (total.firstChild);
        
    }
    //Cuando presiono el botón "Vaciar Carrito"
    localStorage.clear() //Limpia localStorage
}
//Genera nuevamente el carrito luego de eliminar algun item de la lista
function getFromLocalStorage() {
    let toursLS = getTourFromStorage();

    toursLS.forEach(function(tour) {
        //Crear la tabla 
        const row = document.createElement('tr')
        row.innerHTML =`
            <tr>
                <td>
                    <img src="${tour.image}" width=100>
                </td>
                <td>${tour.title}</td>
                <td>${tour.price}</td>
                <td>
                    <a href="#" class="remove" data-id="${tour.id}">-</a>
                </td>
            </tr> `;

        contenidoDelCarrito.appendChild(row);
    });
}



/*  
const busqueda = document.querySelector ('#busqueda');

const buscar = () => {
    console.log(busqueda.value);
    ListaDeTours.innerHTML = ""
     
    const texto = busqueda.value.toLowerCase();
    for (let tourss of TOURS){
        let h4 = tourss.h4.toLowerCase();
        if (h4.indexOf(texto) !== -1){
            $("#ListaDeTours").append (`<div class="col">
                                        <div class="card">
                                            <img src="${tourss.img}" class="card-img-top">
                                            <div class="card-body">
                                                <h4>${tourss.h4}</h4>
                                                <p class="price">$<span>${tourss.price}</span></p>
                                                <a href="#" class="btn btn-danger input agregarAlCarrito" data-id="${tourss.id}">Reservar</a>
                                            </div>
                                        </div>
                                    </div>`);
        }
    }
    if (ListaDeTours.innerHTML === ""){
        ListaDeTours.innerHTML +=`
        <li>Tour no encontrado...</li>
        `
    buscar();
    }
}
buscar();
busqueda.addEventListener('keyup', buscar);

*/