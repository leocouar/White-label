import { useEffect, useState, useRef } from "react";


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

    const [modalVisible, setModalVisible] = useState(showFilters);
    const handleCloseModal = () => {
        setModalVisible(false);
    };

    //****** */

    const [isFilterVisible, setIsFilterVisible] = useState(showFilters);

    useEffect(() => {
        const handleScroll = () => {
          const footer = document.getElementById("Footer"); // Reemplaza "footer" con el ID real de tu footer
          const filterContainer = filterElementRef.current;
      
          if (footer && filterContainer) {
            const footerRect = footer.getBoundingClientRect();
            const filterRect = filterContainer.getBoundingClientRect();
      
            // Si el filtro se superpone con el footer y el modal está abierto, ciérralo
            if (filterRect.bottom > footerRect.top && modalVisible) {
              setModalVisible(false);
            }
          }
        };
      
        window.addEventListener("scroll", handleScroll);
      
        // Limpia el event listener cuando el componente se desmonta
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, [modalVisible]);
      
    
    return (
        
        <div
            ref={filterElementRef}
            className='w-10 h-full fixed inset-0' style={{ zIndex: 2 }}> 
                   <div className={`fixed top-6 transform left-0 transition-transform ease-in-out duration-300 ${modalVisible ? "" : "-translate-x-full"}`}>     
                    <div style={{ height: '100vh'}} className="shadow-2xl h-full bg-gray-300 flex shadow-xl items-center rounded-lg justify-center text-center sm: max-w-auto">
                                    <div className="text-left">
                                    <div className="flex justify-end pr-4 mt-4">
                                    <button
                                        className="hover:text-palette-secondary"
                                        onClick={handleCloseModal}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512">
                                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                                        </svg>
                                    
                                    </button>
                                    </div>
                                    <div
                                        id="categoriesAndBrands"
                                        className="px-4 pb-2 sm:p-6 sm:pb-4"
                                    >
                                        <div id="orderAndButtons"
                                >
                            {columnList ? (
                                <div className="top-0 sm:flex-col">
                                    <div className="text-center w-auto text-sm text-palette-primary font-bold px-5">
                                        Ordenar por:
                                    </div>
                                    <select
                                        className="text-sm text-center text-palette-primary ml-4 mt-4 px-6 h-6 rounded bg-gray-100"
                                        id="orderBy"
                                        value={selectedOrderCol}
                                        onChange={handleChangeColumn}>
                                        {columnList.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <div >
                                    <label className="text-sm flex items-center mt-2 ml-4 px-2 lg:pb-3">
                                        <input
                                            type="radio"
                                            className="form-radio rounded-full text-red-500"
                                            id="ascRadio"
                                            name="order"
                                            checked={!ascOrder}
                                            onChange={() => handleChangeOrder(false)}
                                        />
                                        <span className="ml-2">Mayor a menor</span>
                                    </label>
                                    <label className="text-sm flex items-center ml-4 px-2 lg:pb-3">
                                        <input
                                            type="radio"
                                            className="form-radio rounded-full text-red-500"
                                            id="descRadio"
                                            name="order"
                                            checked={ascOrder}
                                            onChange={() => handleChangeOrder(true)}
                                        />
                                        <span className="ml-2">Menor a mayor</span>
                                    </label>
                                </div>
                                </div>
                            ) : <></>}
                        </div>
                            {filterParams
                                ?
                                filterParams.map((category, arrayIndex) => (
                                    <>
                                    <div className="text-center bg-gray-300 w-auto bg-white text-sm text-palette-primary font-bold px-5 py-2 m-2 -ml-4">
                                    {category.type}
                                </div>
                                <div className={`no-scrollbar text-sm flex-center rounded ml-6 ${category.column ? '' : ''}`}
                                        style={{
                                            minWidth: windowWidth < 768 ? "50%" : "auto",
                                            maxHeight: windowWidth < 768 ? "24vh" : "20vh", // Reducir la altura en pantallas pequeñas (tamaño SM)
                                            overflowY: "auto",
                                        }}
                                    >
                                        <div style={{ maxHeight: "50%" }} className={`lg:grid md:grid w-full ${category.column ? "" : ""}`}>
                                            {category.elements
                                                ? category.elements.map((subcategory, index) => (
                                                    <div key={index} className="mt-2">
                                                        <label className="inline-flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                className="ml-1 form-checkbox rounded-full text-red-500"
                                                                onChange={(e) => handleChangeSubCat(e, arrayIndex)}
                                                                value={subcategory.id}
                                                            />
                                                            <span className="ml-2">{subcategory.name}</span>
                                                        </label>
                                                    </div>
                                                ))
                                                : <></>}
                                        </div>
                                    </div>

                                </>
                                )) : <></>}
                           
                        </div>

                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterModal;