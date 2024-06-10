window.addEventListener('load',function(){
    const form = document.querySelector('.form-Product');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(message => message.remove());

        let errors = [];

        //nombre del producto (obligatorio, con al menos 5 caracteres)
        const name = document.getElementById('name').value.trim();

        if (name.length < 5) {
            errors.push("El nombre de producto debe tener al menos 5 caracteres.");
            displayErrorMessage('name', "El nombre de producto debe tener al menos 5 caracteres.");  
            console.log("El nombre de producto debe tener al menos 5 caracteres.");   
            document.getElementById('name').style.background="pink"; 
        }

        //descripcion: deberá tener al menos 20 caracteres
        const description = document.getElementById('description').value.trim();

        if (description.length < 20) {
            errors.push("La descripción debe tener al menos 20 caracteres.");
            displayErrorMessage('description', "La descripcion debe tener al menos 20 caracteres.");
            console.log("La descripcion debe tener al menos 20 caracteres.");
            document.getElementById('description').style.background="pink";  
        }    

        //Imagen: Deberá ser un archivo válido (JPG, JPEG, PNG, GIF)
        const image = document.getElementById('image').value;

        if (!image) {
            errors.push("Debes subir una imagen.");
            displayErrorMessage('image',"Debes subir una imagen.");
            console.log("Debes subir una imagen.");
            
        }else{
            const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];
            const fileExtension = image.split('.').pop().toLowerCase();
            if (!validExtensions.includes(fileExtension)) {
                errors.push("El archivo debe tener una extensión válida (JPG, JPEG, PNG, GIF).");
                displayErrorMessage('image',"El archivo debe tener una extensión válida (JPG, JPEG, PNG, GIF).");
                console.log("El archivo debe tener una extensión válida (JPG, JPEG, PNG, GIF).");
            }
        }
        
        if (errors.length > 0) {
            alert("UPS! FALLO LA CARGA DEL PRODUCTO");
            
        }
        if (errors.length === 0) {
            alert("CARGA EXITOSA DE PRODUCTO");
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
});




