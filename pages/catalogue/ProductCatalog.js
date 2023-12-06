import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProductListings, { prepareDefaultParams } from '@/components/products/ProductListings';
import { findAll as findBrands } from 'services/brandService';
import { findAll as findCategs } from 'services/categoriesService';

const ProductCatalog = ({ brands, categories }) => {
  const router = useRouter();
  const { query } = router.query;
  const [initialSearch, setInitialSearch] = useState();

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
    <div className='w-full flex flex-col'style={{ backgroundImage: `url('/images/bgcatalog.jpg')` }}>
      {query && initialSearch && (
        <div className='text-center'>
        <h2 className='text-sm text-palette-primary font-semibold mt-4'style={{color: "#5d5475",}}>
          Resultados para: "{query}"
        </h2>
        </div>
      )}
      {(!query || !initialSearch) && (
        <div className='text-center'>
        <p className='bg-red mt-4'>
          No se encontraron resultados para "{query}"
        </p>
        </div>
      )}
      {/* Muestra los productos si existen */}
      {initialSearch && (
        <div className='mr-2'>
        <ProductListings
          
          brands={brands}
          categories={categories}
          initialSearch={initialSearch}
          initialTerm={query}
          showFilters={true}
        />
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps() {
  const brands = await findBrands();
  const categories = await findCategs();

  return {
    props: {
      brands,
      categories,
    },
  };
}

export default ProductCatalog;