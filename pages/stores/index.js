import Stores from "@/components/stores/Stores";
import { findAllStores } from "services/storeService";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";
import {PlusIcon} from "@heroicons/react/20/solid";
import withAuthorization from 'components/withAuthorization';
import SEO from "@/components/SEO";

const StoreManager = ({stores}) => {
    return (
        <>
        <SEO title="Comercios" />
        <div className="items-center mx-auto bg-white max-w-6xl relative">
            <PageTitle text="Comercios" />
            <Link legacyBehavior href="/stores/create" passHref>
                <div className="absolute top-0 right-0 mt-4 mr-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
                        <PlusIcon className="h-5 w-5" />
                        <span className="ml-2">Nuevo Comercio</span>
                    </button>
                </div>

            </Link>
            <Stores stores={stores}/>
        </div>
        </>
    )
}

export async function getServerSideProps() {
    const stores = await findAllStores();
    return {
        props: {
            stores
        }
    };
}

export default withAuthorization(StoreManager);