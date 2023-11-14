import VistaComercioU from "@/components/commerce/VistaComercioU.js"
import ProductListings from "@/components/products/ProductListings";
import { findByID } from "services/storeService"; 


function Commerce() {

    return (
        <>
        <div>
            <VistaComercioU/>
        </div>
        <div>
            <ProductListings/>
        </div>
        </>
    )
}

export default Commerce;

