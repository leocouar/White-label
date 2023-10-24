import Products from "@/components/products/Products";
import {all, getProducts} from "../../services/productService";
import PageTitle from "@/components/PageTitle";
import withAuthorization from 'components/withAuthorization';
import NewRecipe from "@/components/recipes/NewRecipe";

const ProductsManager = ({products}) => {

    return (

        <div className="items-center mx-auto bg-white max-w-6xl relative">
                <div className="flex justify-between items-center">
                    <PageTitle text="Recetas" />
                    <NewRecipe className="absolute top-0 right-0 mt-4"/>
                </div>
            <Products products={products}/>
        </div>

    )

}

export async function getServerSideProps() {
    const products = await all()
    return {
        props: {
            products: products,
        },
    }
}

export default withAuthorization(ProductsManager)