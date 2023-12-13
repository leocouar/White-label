const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const filterFunction = (items, filterText, field) => {
    const sanitizedFilterText = removeAccents(filterText.toLowerCase());

    const filteredItems = items.filter(item => {
        const itemNameWithoutAccents = removeAccents(item.name.toLowerCase());
        return itemNameWithoutAccents.includes(sanitizedFilterText);
    });

    return filteredItems;
};

export default filterFunction;
