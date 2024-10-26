const getIncrementalNumberFromName = (nameWithNumber, nameTemplate) => {
    const number = nameWithNumber.replace(`${nameTemplate} -`, '').replace(`${nameTemplate}`, '').trim();
    return Number(number) || null;
};

module.exports = {
    getIncrementalNumberFromName,
};
