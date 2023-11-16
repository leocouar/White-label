import ProductListings from '@/components/products/ProductListings'
import Carrusel from "@/components/Carrusel";
import * as brandsService from 'services/brandService';
import * as categoriesService from 'services/categoriesService'
import Banner from '@/components/products/CommerceBanner.js';
import { prepareDefaultParams } from '@/components/products/ProductListings';

function IndexPage({ brands, categories, initialSearch }) {
  return (
    <div className='bg-white'>
      <div >
        <Carrusel />
        {/*<img src="images/inicio.jpg" className="w-full h-screen"></img>*/}
      </div>
      <div className="w-full h-full">
        <div className='flex justify-center'>
          <Banner />
        </div>
      </div>
      <ProductListings brands={brands} categories={categories} initialSearch={initialSearch} showFilters={false}/>
    </div>
  )
}

export async function getServerSideProps() {
  const brands = await brandsService.findAll();
  const categories = await categoriesService.findAll();
  const initialSearch = await prepareDefaultParams();

  return {
    props: {
      brands,
      categories,
      initialSearch
    },
  }
}

export default IndexPage
