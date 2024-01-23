import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProductListings, { prepareDefaultParams } from '@/components/products/ProductListings';
import { findAll as findBrands } from 'services/brandService';
import { findAll as findCategs } from 'services/categoriesService';
import SEO from '@/components/SEO';


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
    <>
    <SEO title={`${query} | Camara Bolivar`}/>  
    <div className='h-full w-full flex flex-col'style={{ backgroundImage: `url('/images/bgcatalog.jpg')` }}>
      {query && initialSearch && (
        <div className='text-center'>
        </div>
      )}
           {initialSearch && (
        <div className='flex relative w-full h-full'>
        <ProductListings
          brands={brands}
          categories={categories}
          initialSearch={initialSearch}
          initialTerm={query}
          showFilters={true}
          className="static right-0"
        />
        </div>
      )}
      {(!query || !initialSearch) && (
           <div className='text-center'>
           </div>
      )}
      {/* Muestra los productos si existen */}
 
    </div>
    </>
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