const validateNumericPhone = value => {
    if (!/^\d+$/.test(value)) {
        throw new Error('El número de celular solo puede contener dígitos');
    }
    return true;
};

module.exports=validateNumericPhone;