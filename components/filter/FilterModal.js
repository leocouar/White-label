import { useEffect, useState, useRef } from "react";

/*Elemplos de los tipos de parametros que deberia recibir en filterParams y columnList

//Aqui se reciben los valores para utilizar en la consulta y el nombre a mostrar al usuario.
const columnList = [
    { value: 'sales', label: 'Popularidad' },
    { value: 'price', label: 'Precio' },
    { value: 'stock', label: 'Stock' },
    { value: 'name', label: 'Nombre' },
];

//type es el nombre a mostrar al usuario.
//elements es un array a devolver con los elementos seleccionados por numero.
//column es utilizado para determinar si una columna deberia ser gruesa o mas fina.
const filterParams = [
    { type: "Categorias", elements: categories, column: true },
    { type: "Marcas", elements: brands, column: false }
];*/

function FilterModal({ filterParams, searchFunction, searchTerm, columnList, showFilters }) {
    const filterElementRef = useRef(null);
    const [windowWidth, setWindowWidth] = useState();
    const [windowHeight, setWindowHeight] = useState();
    const [selectedOrderCol, setSelectedOrderCol] = useState(columnList[0].value);
    const [ascOrder, setAscOrder] = useState(false);
    const [queryParameters, setQueryParameters] = useState(new Array(filterParams.length).fill([]));
    const customParams = {
        term: searchTerm,
        params: queryParameters,
        orderBy: selectedOrderCol,
        asc: ascOrder ? "T" : "F"
    };

    const prepareSearch = (params, orderBy, asc) =>{
        return {
            "term": searchTerm,
            "params": params,
            "orderBy": orderBy,
            "asc": asc ? "T" : "F"
        }
    }

    const searchNow = (typeOfChange, parameters) => {
        let finalParams;
        switch (typeOfChange) {
            case 1:
                finalParams = prepareSearch(parameters, selectedOrderCol, ascOrder);
                searchFunction(finalParams); break;
            case 2:
                finalParams = prepareSearch(queryParameters, parameters, ascOrder);
                searchFunction(finalParams); break;
            case 3:
                finalParams = prepareSearch(queryParameters, selectedOrderCol, parameters);
                searchFunction(finalParams); break;
        }

    }

    //Prepara los parametros para la consulta
    const handleChangeSubCat = async (e, index) => {
        const updatedParameters = queryParameters.map((arr, i) => {
            //Si el indice actual coincide con el brindado, creamos un nuevo array
            // If the current index matches the provided index, we create a new array.
            if (i === index) {
                const existingIndex = arr.indexOf(e.target.value);
                //Remueve o elimina el elemento del array segun el caso
                if (existingIndex !== -1) {
                    return arr.filter((_, i) => i !== existingIndex);
                } else {
                    return [...arr, e.target.value];
                }
            }
            //En caso de que no haya cambios, retorna el array tal como esta
            return arr;
        });
        setQueryParameters(updatedParameters);  //Guarda los parametros      
        searchNow(1, updatedParameters)            //Realiza la busqueda
    };

    //Indica cual sera la columna de la tabla que se utilizara para el orden.
    const handleChangeColumn = async (e) => {
        const orderCol = e.target.value
        setSelectedOrderCol(orderCol);
        searchNow(2, orderCol);
    }

    //Indica en que orden (ascendente o descendente) se traeran los resultados
    const handleChangeOrder = async (value) => {
        setAscOrder(value);
        searchNow(3, value);
    }



    useEffect(() => {
        // Update the window width when the window is resized
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        };

        window.addEventListener("resize", handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    function searchButton() {
        searchFunction(customParams);
    }

    return (
        <div ref={filterElementRef} className=''>
            <div id="modal" className={`top-1/2 left-1/2 ${showFilters ? "" : "hidden"}  `}
                tyle={{ minHeight: windowWidth < 768 ? "100vh" : "85vh" }}>
                <div className="flex shadow-xl items-center bg-white rounded-lg justify-center min-height-100vh text-center sm:block sm:p-0"
                    style={{ width: windowWidth >= 1200 ? "70rem" : (windowWidth < 1024 ? (windowWidth < 768 ? "100vw" : "50rem") : "60rem") }}>
                    <div className="w-auto sm:w-11/12 inline-block text-left 
                        transform transition-all align-middle
                        sm:min-height-full md:min-height-full"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-headline">

                        <div id="categoriesAndBrands"
                            className="px-4 pt-6 pb-2 sm:p-6 sm:pb-4 flex"
                            style={{ maxHeight: windowWidth < 768 ? "85vh" : "55vh" }}>
                            {filterParams
                                ?
                                filterParams.map((category, arrayIndex) => (
                                    <div className={`flex-center col-span-2 rounded 
                                            ${category.column ? "lg:w-1/4 md:w-1/4" : "lg:w-3/4 md:w-3/4"}`}
                                        style={{
                                            minWidth: windowWidth < 768 ? "50%" : "auto",
                                            maxHeight: windowWidth < 768 ? "52vh" : "45vh"
                                        }}>
                                        <div className="w-auto bg-white text-sm text-palette-primary font-bold px-5 py-2 m-2 -ml-4 text-2xl">
                                            {category.type}
                                        </div>
                                        <div
                                            style={{ maxHeight: "80%" }}
                                            className={`overflow-y-auto scrollbar-thin lg:grid md:grid
                                                ${category.column ? "lg:grid-cols-1" : "lg:grid-cols-4 md:grid-cols-3"}`}>

                                            {category.elements
                                                ?
                                                category.elements.map((subcategory, index) => (
                                                    <div key={index} className=" block mt-2 px-2" >
                                                        <label className="inline-flex items-center">
                                                            <input type="checkbox"
                                                                className="form-checkbox rounded text-red-500 "
                                                                onChange={(e) => handleChangeSubCat(e, arrayIndex)}
                                                                value={subcategory.id} />
                                                            <span className="ml-2">{subcategory.name}</span>
                                                        </label>
                                                    </div>
                                                )) : <></>}
                                        </div>
                                    </div>
                                )) : <></>}
                        </div>

                        <div id="orderAndButtons"
                        >
                            {columnList ? (
                                <div className={`px-4 md:pt-6 lg:pt-6 pb-2 ${windowWidth < 768 ? "grid" : "flex flex-wrap"}`}>
                                    <div className="w-auto text-sm text-palette-primary font-bold px-5 m-2 -ml-4 text-2xl">
                                        Ordenar por:
                                    </div>
                                    <select
                                        className="text-palette-primary px-5 h-12 bg-gray-200"
                                        id="orderBy"
                                        value={selectedOrderCol}
                                        onChange={handleChangeColumn}>
                                        {columnList.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <label className="flex items-center mt-2 px-2 lg:pb-3">
                                        <input
                                            type="radio"
                                            className="form-radio rounded text-red-500"
                                            id="ascRadio"
                                            name="order"
                                            checked={!ascOrder}
                                            onChange={() => handleChangeOrder(false)}
                                        />
                                        <span className="ml-2">Mayor a menor</span>
                                    </label>
                                    <label className="flex items-center mt-2 px-2 lg:pb-3">
                                        <input
                                            type="radio"
                                            className="form-radio rounded text-red-500"
                                            id="descRadio"
                                            name="order"
                                            checked={ascOrder}
                                            onChange={() => handleChangeOrder(true)}
                                        />
                                        <span className="ml-2">Menor a mayor</span>
                                    </label>
                                </div>
                            ) : <></>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterModal;