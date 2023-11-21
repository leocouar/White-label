import NewStore from "@/components/stores/NewStore";
import { getSession, getCsrfToken, signIn } from "next-auth/react";
import StoreHeading from "@/components/StoreHeading";
import ListStores from "@/components/stores/ListStore";
import Banner from '@/components/products/CommerceBanner.js';
import { findAllStores } from "services/storeService";

function StoreList({stores}){
  return(
    <div className="w-full h-full">
      <StoreHeading title="Tus Comercios"/>
              <div className='flex justify-center'>
                <Banner stores={stores}/>
              </div>
            </div>
  )
 
  }
  export async function getServerSideProps(context) {
    const session = await getSession(context);
    const stores  = await findAllStores();

    if (!session) {
      return {
        redirect: {
          destination: "/", // Redirigir al dashboard si está autenticado
          permanent: false,          
        },
      };
    }
  
    return {
      props: {
        csrfToken: await getCsrfToken(context),
        stores
      },
    };
    
  }
export default StoreList;
