import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { searchList } from 'services/productService';
const ProductCatalog = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [searchedTerm, setSearchedTerm] = useState('');
  const { query } = router.query; 

  useEffect(() => {
    // Llamada a la función searchList para obtener los productos basados en 'query'
    async function fetchProducts() {
      try {
        // Llama a la función searchList con el parámetro 'name' como 'query'
        const results = await searchList(query); // Suponiendo que 'query' es el nombre del producto
        setProducts(results);
        setSearchedTerm(query);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    }

    // Verifica si 'query' tiene un valor antes de realizar la búsqueda
    if (query) {
      // Invoca la función fetchProducts para obtener los productos
      fetchProducts();
    }
  }, [query]);

  return (
    <div>
      <h1>Catálogo de Productos</h1>
      {searchedTerm && (
        <h2>Resultados para: "{searchedTerm}"</h2>
      )}
      {products.length === 0 && searchedTerm && (
        <p className='bg-red'>No se encontraron resultados para "{searchedTerm}"</p>
      )}
      {/* Muestra los productos si existen */}
      {products.length > 0 && (
        <div>
          {products.map(product => (
            <div key={product.id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCatalog;