const validatePasswordConfirmation = (value, { req }) => {
    if (value !== req.body.contrasena) {
        throw new Error('Las contraseñas no coinciden');
    }
    return true;
};

module.exports=validatePasswordConfirmation;