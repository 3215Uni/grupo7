window.addEventListener('load',function(){ 
    
    const form = document.querySelector('.form-registrosDatos');

    form.addEventListener('submit', function(event) {
        //previene que se envie el formulario cundo hago click en actualizar
        event.preventDefault();
        // Remueve mensajes de error anteriores
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(message => message.remove());

        // lógica de validación para cada campo del formulario
        // y muestra mensajes de error si es necesario
   
        const nombre = document.getElementById('nombre').value.trim();
        const apellido = document.getElementById('apellido').value.trim();
        const email=document.getElementById('email').value.trim();
        const contrasena = document.getElementById('contrasena').value.trim();
        const repitContrasena = document.getElementById('repitContrasena').value.trim();
        const avatar = document.getElementById('avatar').value;

        let errors = [];
       // Validar Nombre 
        if (nombre.length < 2) {
            errors.push("El nombre debe tener al menos 2 caracteres.");
            displayErrorMessage('nombre', "El nombre debe tener al menos 2 caracteres.");
        }
       // Validar apellido
        if (apellido.length < 2) {
            errors.push("El apellido debe tener al menos 2 caracteres.");
            displayErrorMessage('apellido', "El apellido debe tener al menos 2 caracteres.");
        }
       // Validar email
        if (!validateEmail(email)) {
            errors.push("El email ingresado no es válido.");
            displayErrorMessage('email',"El email ingresado no es válido.");
        }

        // Validar Contrasena
        if (contrasena.length < 8) {
            errors.push("La contraseña debe tener al menos 8 caracteres.");
            displayErrorMessage('contrasena',"La contraseña debe tener al menos 8 caracteres.");
        }else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(contrasena)) {
                errors.push("La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.");
                displayErrorMessage('contrasena',"La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.");
            
        }
        
        // Validar Repetir Contraseña
        if (repitContrasena.length < 8) {
            errors.push("La contraseña debe tener al menos 8 caracteres.");
            displayErrorMessage('repitContrasena',"La contraseña debe tener al menos 8 caracteres.");
        }else{
                if (repitContrasena != contrasena) {
                    errors.push("Las contraseñas no coinciden.");
                    displayErrorMessage('repitContrasena',"Las contraseñas no coinciden.");
                }
        }

        // Validar Avatar
        if (!avatar) {
            errors.push("Debes subir una imagen.");
            displayErrorMessage('avatar',"Debes subir una imagen.");
        } else {
            const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];
            const fileExtension = avatar.split('.').pop().toLowerCase();
            if (!validExtensions.includes(fileExtension)) {
                errors.push("El archivo debe tener una extensión válida (JPG, JPEG, PNG, GIF).");
                displayErrorMessage('avatar',"El archivo debe tener una extensión válida (JPG, JPEG, PNG, GIF).");
            }
        }                     
        // Pregutna si NO hay errores
        if (errors.length === 0) {
            // Si no hay errores, envia el formulario
            form.submit();
        }
    });
})


function displayErrorMessage(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.innerText = message;
    field.parentNode.appendChild(errorMessage);
}

// Función para validar el formato del correo electrónico
// Función de validación de email con expresión regular mejorada
function validateEmail(email) {
const regex = new RegExp("(?=[a-z0-9@.!#$%&'*+/=?^_`{|}~-]{6,254})(?=[a-z0-9.!#$%&'*+/=?^_`{|}~-]{1,64}@)[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:(?=[a-z0-9-]{1,63}\\.)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+(?=[a-z0-9-]{1,63})[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", "gm");
return regex.test(email);
}
