import ComercioUnico from "@/components/commerce/ComercioUnico";
import ProductListings from "@/components/products/ProductListings";
import { findByID } from "services/storeService"; 


function Commerce({ brands, categories, initialSearch, stores}) {

    return (
        <>
        <div>
            <ComercioUnico/>
        </div>
        <div>
            <ProductListings brands={brands} categories={categories} initialSearch={initialSearch} showFilters={false}/>
        </div>
        </>
    )
}

export default Commerce;
