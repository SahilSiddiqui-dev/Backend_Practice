const isValidNumber = (value) => {
    if (typeof value !== 'number' || isNaN(value) || value <= 0 || !Number.isInteger(value)) {
        return false;
    }
    return true;
};

module.exports = isValidNumber;