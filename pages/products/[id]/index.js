import ProductSection from '@/components/products/ProductSection'
import Gallery from "@/components/products/Gallery";
import {getProduct,getProductsRelated} from "../../../services/productService";

function Index({ productData ,related}) {

    return (
        <section>
            <div className="justify-center">
                <ProductSection productData={productData} />
            </div>
            <Gallery productData={related} />
        </section>
    )
}
 
export async function getServerSideProps({ params }) {
    const productData = await getProduct(params.id)
    const related = await getProductsRelated(productData, 12);

    return {
        props: {
            productData,
            related,
        },
    }
}

export default Index
