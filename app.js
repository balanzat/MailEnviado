// Variables 
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

// Variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const er =   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


eventListeners();
function eventListeners() {
    // Cuando la App arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    // Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    // Reinicia el formulario 
    btnReset.addEventListener('click', resetearFormulario);

    // Enviar email
    formulario.addEventListener('submit', enviarEmail);

}

function iniciarApp() {

}

// Funciones
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}

// Valida el formulario
function validarFormulario(e) {


    if(e.target.value.length > 0 ) {

        //Eliminar los errores...
        const error = document.querySelector('p.error');
        if(error !== null){ error.remove()};

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }

    if(e.target.type === 'email') {
        if( er.test( e.target.value ) ) {
            const error = document.querySelector('p.error');
            if(error !== null){ error.remove()};
    
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no valido');
        }
    }

    if(er.test( email.value ) && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
    } 
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');
    if(errores.length === 0) {
        formulario.appendChild(mensajeError);
    }

  
}


// Envia el email
function enviarEmail(e) {
    e.preventDefault();

    // mostrr el spinner 
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    // despues de 3s ocultar spinner y mostrar mensaje
    setTimeout(() => {
        spinner.style.display = 'none';

        // mensaje de envio correcto
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envio correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-blod', 'uppercase')

        // inserta el parrafo antes del spinner
        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove(); // eliminar el mensaje de exito
           
                resetearFormulario();
        }, 5000);
    }, 3000 );
}


// Funcion que resetea el formulario
function resetearFormulario() {
    formulario.reset();

    iniciarApp();
}