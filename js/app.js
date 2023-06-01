// constructores
function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
};

// realiza la cotizacion con los datos
Seguro.prototype.cotizarSeguro = function() {
    /*
        1 = americano 1.15
        2 = asiatico 1.05
        3 = europeo 1.35 
    */

    let cantidad;
    const base = 2000;

    switch(this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
        default:
            break;
    };

    // leer el año
    const diferencia = new Date().getFullYear() - this.year;

    // cada año que la diferencia es mayor, el costo va a reducirse un 3%
    cantidad -= ((diferencia*3) * cantidad) / 100;

    // si el seguro es basico se multiplica por un 30% mas
    // si el seguro es completo se multiplica por un 50% mas
    if (this.tipo === 'basico') {
        cantidad *= 1.30;
    } else {
        cantidad *= 1.50;
    };

    return cantidad;
};

function UI() {

};

// Llena las opciones de los años
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
        min = max - 20;

    const selectYear = document.querySelector('#year');

    for (let i = max; i > min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    };
};


// creando proto que muestra alertas en pantalla
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement('div');

    if (tipo === 'error') {
        div.classList.add('mensaje', 'error');
    } else {
        div.classList.add('mensaje', 'correcto');
    };

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    // insertar en HTML
    const form = document.querySelector('#cotizar-seguro');
    form.insertBefore(div, document.querySelector('#resultado'));

    // agregando el metodo setTimeout para que no se muestre el mensaje todo el tiempo
    setTimeout(() => {
        div.remove();
    }, 3000);
};


// instanciar UI
const ui = new UI();



document.addEventListener('DOMContentLoaded', () => {
    // una vez cargado el documento mandamos a llamar al proto de ui
    ui.llenarOpciones();//llena el select con los años
});


// eventos
eventListeners();
function eventListeners() {
    const form = document.querySelector('#cotizar-seguro');
    form.addEventListener('submit', cotizarSeguro);
};


// funcion de cotizar seguro 
function cotizarSeguro(e) {
    e.preventDefault();

    // leer la marca seleccionada
    const marca = document.querySelector('#marca').value;
    // leer año
    const year = document.querySelector('#year').value;
    // leer cobertura
    // de esta forma accedemos al valor del input button
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if (marca === '' || year === '' || tipo === '') {
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    };

    ui.mostrarMensaje('Cotizando..', 'correcto');

    // instanciar el seguro
    const seguro = new Seguro(marca, year, tipo);
    seguro.cotizarSeguro();
    // utilizar proto que cotiza

};