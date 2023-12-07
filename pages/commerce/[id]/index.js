import ComercioUnico from "@/components/commerce/ComercioUnico";
import ProductByStoreId from "@/components/commerce/ProductByStoreId";
import { findByID } from "services/storeService";

function Commerce(store) {
    return (
        <div className="" style={{ backgroundImage: `url('/images/bgcatalog.jpg')` }}>
            <div>
                {/* Pass the stores data to the ComercioUnico component */}
                <ComercioUnico store={store.store} />
            </div>
            <div>
                <ProductByStoreId storeId={store.store.id} />
            </div>
        </div>
    );
}

export default Commerce;

export async function getServerSideProps({query}) {
    const store  = await findByID(query.id);
  
    return {
        props: {
            store
        }
    }
}



