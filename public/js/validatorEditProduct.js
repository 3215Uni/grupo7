window.addEventListener('load',function(){    
    const form = document.querySelector('.form-Product');
    form.addEventListener('submit', function(event) {
        //previene que se envie el formulario cundo hago click en actualizar
        event.preventDefault();
        // Remueve mensajes de error anteriores
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(message => message.remove());
        // lógica de validación para cada campo del formulario
        // y muestra mensajes de error si es necesario
        //valu captura el valor, con trim elimina lso epsacio en blanco al final y al principio
        const name = document.getElementById('name').value.trim();
        const description = document.getElementById('description').value.trim();
        const image = document.getElementById('image').value;
        //array de errores
        let errors = [];
       // Validar Nombre 
        if (name.length < 5) {
            errors.push("El nombre de producto debe tener al menos 5 caracteres.");
            displayErrorMessage('name', "El nombre de producto debe tener al menos 5 caracteres.");  
            console.log("El nombre de producto debe tener al menos 5 caracteres.");   
            document.getElementById('name').style.background="pink"; 
        }
       // Validar Descripcion
        if (description.length < 20) {
            errors.push("La descripción debe tener al menos 20 caracteres.");
            displayErrorMessage('description', "La descripcion debe tener al menos 20 caracteres.");
            console.log("La descripcion debe tener al menos 20 caracteres.");
            document.getElementById('description').style.background="pink";  
        }    
        // Validar imagen del producto
        if (!image) {
            errors.push("Debes subir una imagen.");
            displayErrorMessage('image',"Debes subir una imagen.");
            console.log("Debes subir una imagen.");
            
        } else {
            const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];
            const fileExtension = image.split('.').pop().toLowerCase();
            if (!validExtensions.includes(fileExtension)) {
                errors.push("El archivo debe tener una extensión válida (JPG, JPEG, PNG, GIF).");
                displayErrorMessage('image',"El archivo debe tener una extensión válida (JPG, JPEG, PNG, GIF).");
                console.log("El archivo debe tener una extensión válida (JPG, JPEG, PNG, GIF).");
            }
        }                     
        // Pregutna si NO hay errores
        if (errors.length === 0) {
            // Si no hay errores, envia el formulario
            form.submit();
        }
        function displayErrorMessage(fieldId, message) {
            const field = document.getElementById(fieldId);
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message');
            errorMessage.innerText = message;
            errorMessage.style.color="pink";
            field.parentNode.appendChild(errorMessage);
        }
    });
})

