import NewStore from "@/components/stores/NewStore";
import { useSession } from "next-auth/react";
import StoreHeading from "@/components/StoreHeading";
import ListStores from "@/components/stores/ListStore";
import Banner from '@/components/products/CommerceBanner.js';
import { findAllStores, getStoresByUser } from "services/storeService";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState ,useEffect} from "react";

function StoreList() {
  const {data :session} =useSession()
  console.log(session?.user?.username);
  const [youStores, setYouStores]=useState()
  useEffect(() => {
    const fetchData = async () => {
        const listStore = await getStoresByUser(session?.user.username)
        setYouStores(listStore)
    };

    fetchData();
  }, []);
  return (
    <div className="h-full items-center">
      <StoreHeading title="Tus Comercios" />
      <div className='flex justify-center'>
        <Banner stores={youStores} />
      </div>
      <div className="flex justify-center mt-20">
        <Link legacyBehavior href={'/stores/create'}>
          <div className="py-2 flex font justify-between items-center bg-palette-secondary hover:bg-red-700 duration-300 cursor-pointer">
            <span className="m-auto font-bold text-white text-lg ml-3 flex items-center">CREAR NUEVO COMERCIO<FontAwesomeIcon icon={faPlus} className="w-4 ml-2 mr-2" /></span>
          </div>
        </Link>
      </div>
    </div>
  )

}
export default StoreList;
