import React, { useEffect, useState } from 'react';
import ProductListings from '@/components/products/ProductListings';
import Carrusel from "@/components/Carrusel";
import { findAllStores } from "services/storeService";
import * as brandsService from 'services/brandService';
import * as categoriesService from 'services/categoriesService';
import Banner from '@/components/products/CommerceBanner.js';
import { prepareDefaultParams } from '@/components/products/ProductListings';
import SEO from '@/components/SEO';

function IndexPage({ brands, categories, initialSearch, stores }) {
  const [carouselLoaded, setCarouselLoaded] = useState(false);

  useEffect(() => {
    // Carga de Carrusel antes que Banner //
    setCarouselLoaded(true);
  }, []);

  return (
    <>
      <SEO title="Camara Bolivar" />
      <div className=''>
        <div>
          <Carrusel />
        </div>
        {carouselLoaded && (
          <div className="w-full h-full">
            <div className='flex justify-center'>
              <Banner stores={stores} />
            </div>
          </div>
        )}
        <ProductListings brands={brands} categories={categories} initialSearch={initialSearch} showFilters={false} showMsg={false} />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const brands = await brandsService.findAll();
  const categories = await categoriesService.findAll();
  const stores = await findAllStores();

  return {
    props: {
      brands,
      categories,
      stores,
    },
  };
}

export default IndexPage;
