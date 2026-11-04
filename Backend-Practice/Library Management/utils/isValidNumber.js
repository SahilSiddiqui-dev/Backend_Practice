const isValidNumber = (n) => {
    if(typeof n === 'number' && !isNaN(n)){
        return true;
    }
    return false;
}

module.exports = isValidNumber;
