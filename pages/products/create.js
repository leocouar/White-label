import NewProduct from "@/components/products/NewProduct";
import StoreHeading from "@/components/StoreHeading";
import withAuthorization from 'components/withAuthorization';

const Create = ({brands, categories, sizes}) => {
    return(
        <div className="min-h-screen">
            <StoreHeading title="Nuevo Articulo"/>
            <NewProduct brands={brands} categories={categories} sizes={sizes}/>
        </div>
    )
}

  export default withAuthorization(Create);
  
