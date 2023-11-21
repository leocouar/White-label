import NewStore from "@/components/stores/NewStore";
import { getSession, getCsrfToken, signIn } from "next-auth/react";
import StoreHeading from "@/components/StoreHeading";
import ListStores from "@/components/stores/ListStore";
import Banner from '@/components/products/CommerceBanner.js';
import { findAllStores } from "services/storeService";
import Link from "next/link";

function StoreList({ stores }) {
  return (
    <div className="h-full items-center">
      <StoreHeading title="Tus Comercios" />
      <div className='flex justify-center'>
        <Banner stores={stores} />
      </div>
      <div className="flex justify-center">
        <Link legacyBehavior href={'/stores/create'}>
          <div className="py-2 flex font justify-between items-center bg-palette-secondary hover:bg-red-700 duration-300 cursor-pointer">
            <span className="m-auto ml-5 mr-5 font-bold text-white text-lg">CREAR NUEVO COMERCIO+</span>
          </div>
        </Link>
      </div>
    </div>
  )

}
export async function getServerSideProps(context) {
  const session = await getSession(context);
  const stores = await findAllStores();

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
