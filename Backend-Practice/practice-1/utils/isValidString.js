const isValidString = (s) => {
    if(typeof s === 'string', s.trim().length > 0){
        return true;
    }
    return false;
}

module.exports = isValidString;