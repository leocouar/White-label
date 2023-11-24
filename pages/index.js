import ListProducts from "@/components/products/ListProducts";
import Carrusel from "@/components/Carrusel";
import { findAllStores } from "services/storeService";
import * as brandsService from 'services/brandService';
import * as categoriesService from 'services/categoriesService'
import Banner from '@/components/products/CommerceBanner.js';




function IndexPage({brands, categories, stores}) {
  return (
      <>
          <div className='bg-white'>
            <div >
              <Carrusel/>
              {/*<img src="images/inicio.jpg" className="w-full h-screen"></img>*/}
            </div>
            <div className="w-full h-full">
              <div className='flex justify-center'>
                <Banner stores={stores}/>
              </div>
            </div>
            <div className="w-full h-full mt-10">
              <div className='flex justify-center'>
                <ListProducts/>
              </div>
            </div>
            </div>
    </>
  )
}

export async function getServerSideProps() {
  const brands = await brandsService.findAll();
  const categories = await categoriesService.findAll();
  const stores  = await findAllStores();

  return {
    props: {
      brands,
      categories,
      stores,
    },
  }
}

export default IndexPage
