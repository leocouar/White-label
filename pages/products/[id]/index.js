import ProductSection from '@/components/products/ProductSection'
import Gallery from "@/components/products/Gallery";
import {getProduct,getProductsRelated} from "../../../services/productService";
import SEO from '@/components/SEO';
import useAuthorization from "../../../hooks/useAuthorization";

function Index({ productData ,related}) {
    const storeid= productData.store.id
    const {Auth} = useAuthorization(storeid)
    console.log(Auth);

    return (
        <>
        {Auth
        ?
        <div className="w-5 h-5 bg-green-500"></div>
        :
        <div className="w-5 h-5 bg-red-500"></div>
        }
        <section>
            <div className="justify-center">
                <ProductSection productData={productData} />
            </div>
            <Gallery productData={related} />
        </section>
        </>
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
