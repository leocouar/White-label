import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProductListings, {prepareDefaultParams} from '@/components/products/ProductListings';
import {findAll as findBrands} from 'services/brandService';
import {findAll as findCategs} from 'services/categoriesService';

const ProductCatalog = ({ brands, categories}) => {
  const router = useRouter();
  const { query } = router.query; 
  const [initialSearch,setInitialSearch] = useState();

  const fetchInitialSearchResults = async () => {
    const defaultParams = await prepareDefaultParams(query);
    setInitialSearch(defaultParams);
  };

  useEffect(() => {
    setInitialSearch(null);
    if (query) {
      fetchInitialSearchResults();
    }
  }, [query]);

  return (
    <div>
      <h1>Catálogo de Productos</h1>
      {initialSearch && query && (
        <h2>Resultados para: "{query}"</h2>
      )}
      {!initialSearch && !query && (
        <p className='bg-red'>No se encontraron resultados para "{query}"</p>
      )}
      {/* Muestra los productos si existen */}
      {initialSearch && <ProductListings brands={brands} categories={categories} initialSearch={initialSearch} initialTerm={query} showFilters={true}/>}
    </div>
  );
};

export async function getServerSideProps() {
  const brands = await findBrands();
  const categories = await findCategs();
  
  return {
    props: {
      brands,
      categories
    },
  }
}

export default ProductCatalog;