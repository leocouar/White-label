import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function NavSearch() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

  // Función para redirigir a los resultados de búsqueda
  function redirectToSearchResults() {
    if (searchTerm.trim() !== '') {
      router.push(`/catalogue/ProductCatalog?query=${searchTerm}`);
    }
  }

    return (
        <div className="flex items-center">
    <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-palette-primary w-full border-r-0 w-x placeholder-palette-slighter font-semibold text-l p-2 my-auto rounded-xl shadow-lg outline-none transition-all rounded-tr-none rounded-br-none"
        placeholder="Buscar"
        id="search"
    />
    
    <button className="justify-between my-auto border-l-0 border border-palette-primary placeholder-palette-slighter font-semibold hover:text-red active:bg-palette-slight font-bold uppercase text-xl p-2 my-auto rounded-xl rounded-tl-none rounded-bl-none shadow-lg shadow-indigo-500/50 outline-none focus:outline-none ease-linear transition-all duration-150"
        onClick={redirectToSearchResults}
    >
        <FontAwesomeIcon icon={faSearch} className="w-6 m-auto" />
    </button>
</div>


    ); 
};

export default NavSearch;
