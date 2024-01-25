const checkInputNumber = (event, amount, digits) => {
    //NOTA: implementar tambien despues en el input de ProductForm (xq sino voy a terminar editando 2000 archivos jajaja)
    const limit = Math.pow(10, digits-1)
    const isNumericKey = /[0-9]/.test(event.key);
    const isBackspaceOrDelete = event.key === 'Backspace' || event.key === 'Delete';
    const isArrowKey = /^Arrow/.test(event.key);

    const keyAllowed = isArrowKey || (isNumericKey && amount < limit) || (isBackspaceOrDelete && amount > 9);
    if (!keyAllowed) {
        event.preventDefault();
    }
}


export default checkInputNumber;