import React, { useState, useEffect , useRef } from 'react';
import { useRouter } from 'next/router';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function NavSearch() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const searchInputRef = useRef(null);

    //Identifica si la URL ha cambiado (para determinar searchTerm y pasar su valor al text input)
    useEffect(() => {
      const getQueryFromURL = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const queryParam = urlParams.get('query');
        return queryParam || '';
      };
  
      const handleURLChange = () => {
        const newQuery = getQueryFromURL();
        setSearchTerm(newQuery);
      };
  
      const pushStateHandler = () => {
        handleURLChange();
      };
  
      window.addEventListener('popstate', pushStateHandler);
      handleURLChange();
      const originalPushState = window.history.pushState;
      window.history.pushState = function (...args) {
        originalPushState.apply(window.history, args);
        pushStateHandler();
      };
  
      return () => {
        window.removeEventListener('popstate', pushStateHandler);
        window.history.pushState = originalPushState;
      };
    }, []); 

  // Función para redirigir a los resultados de búsqueda
  function redirectToSearchResults() {
    if (searchTerm.trim() !== '') {
      router.push(`/catalogue/ProductCatalog?query=${searchTerm}`);
    }
  }
  // Handle 'Enter' key press for form submission
  const handleKeyPress = async (e) => {
    if (e.key === 'Enter' && isFocused) {
      await setSearchTerm(e.target.value);
      redirectToSearchResults();
    }
  }
    
  return (
      <div className="flex items-center"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}>
        <input
          type="text"
          ref={searchInputRef}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e)}
          className={`border border-gray-400 ${isFocused ? "w-2/3" : "w-1/3"} border-r-0 ring-inset focus:ring-1 placeholder-palette-slighter font-semibold text-l p-2 my-auto rounded-xl shadow-lg outline-none transition-all ease-in duration-300 rounded-tr-none rounded-br-none`}
          placeholder="Buscar"
          id="search"
        />

        <button className="justify-between my-auto border-l-0 border border-gray-400 p-2 rounded-xl rounded-tl-none rounded-bl-none shadow-lg shadow-indigo-500/50 outline-none"
          onClick={redirectToSearchResults}
        >
          <FontAwesomeIcon icon={faSearch} className="w-6 m-auto" />
        </button>
      </div>


    ); 
};

export default NavSearch;
