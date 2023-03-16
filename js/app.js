//Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//contenedor para los resultados
const resultado = document.querySelector('#resultado');


//Variable para los años
const max = new Date().getFullYear();
const min = max - 10;

//Generar un objeto con la busqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}


//Eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos); //Muestra autos

    //Llena select de años
    llenarSelect();

});

//EventListener para los select de busqueda
marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;

    filtrarAuto();
});

year.addEventListener('change', e => {
    datosBusqueda.year = e.target.value;

    filtrarAuto();

});

minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value;

    filtrarAuto();


});

maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value;

    filtrarAuto();
});

puertas.addEventListener('change', e => {
    datosBusqueda.puertas = e.target.value;

    filtrarAuto();

});

transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;

    filtrarAuto();

});

color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;
    //console.log(datosBusqueda);

    filtrarAuto();

});


//Funciones
function mostrarAutos(autos){

    //Elimina el HTML previo
    limpiaHTML();
    autos.forEach( auto => {
        const autoHTML = document.createElement('p');
        const { marca, modelo, year, puertas, transmision, precio, color } = auto;
        autoHTML.textContent = `
            ${marca} ${modelo} - Año ${year} - Puertas: ${puertas} - Transmision: ${transmision} - Precio: $${precio} - Color: ${color}
        `;

        //Inserta en el HTML
        resultado.appendChild(autoHTML);
    })
}

//Limpiar HTML
function limpiaHTML(){
    while ( resultado.firstChild ){
        resultado.removeChild( resultado.firstChild );
    }
}

//Generar años del select
function llenarSelect(){
    //console.log('Llenar');

    for( let i = max; i > min; i --){
        //console.log(i);
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);
    }

}

//funcion que filtra en base a la busqueda
function filtrarAuto() {
    //Cuando un funcion toma otra funcion se le llama funcion de alto nivel 
    const resultado = autos.filter( filtraMarca).filter( filtraYear).filter( filtraMinimo).filter(filtraMaximo).filter(filtraPuertas).filter(filtraTransmision).filter(filtraColor);
    console.log(resultado);

    if( resultado.length ){
        mostrarAutos(resultado); //Mostrar resultado en el HTML usando la funcion mostrarAutos, hay que agregar parametros a dicha funcion

    }else{
        noResultado();
    }
}

function noResultado(){

    limpiaHTML();
    
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No Hay Resultados';
    resultado.appendChild(noResultado);
}

function filtraMarca(auto){
    const { marca } = datosBusqueda;
    console.log(marca);
    if( marca ){
        return auto.marca === marca; 
    }
    return auto;
}

function filtraMinimo(auto){
    const { minimo } = datosBusqueda;
    console.log(minimo);
    if( minimo ){
        return auto.precio >= minimo
    }else{
        return auto;
    }
}

function filtraMaximo(auto){
    const { maximo } = datosBusqueda;
    console.log(maximo);
    if( maximo ){
        return auto.precio <= maximo
    }else{
        return auto;
    }
}

function filtraYear(auto){
    const { year } = datosBusqueda;
    console.log(year);
    if( year ){
        return auto.year === parseInt(year);  //Debido al comparador estricto es necesario convertir a entero ya que se encuentra en String
    }else{
    }
    return auto;
}

function filtraPuertas(auto){
    const { puertas } = datosBusqueda;
    console.log(puertas);
    if( puertas ){
        return auto.puertas === parseInt(puertas); //Debido al comparador estricto es necesario convertir a entero ya que se encuentra en String
    }else{
        return auto;
    }
}

function filtraTransmision(auto){
    const { transmision } = datosBusqueda;
    console.log(transmision);
    if( transmision ){
        return auto.transmision === transmision; 
    }else{
        return auto;
    }
}

function filtraColor(auto){
    const { color } = datosBusqueda;
    console.log(color);
    if( color ){
        return auto.color === color; 
    }else{
        return auto;
    }
}

