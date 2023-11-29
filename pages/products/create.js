import NewProduct from "@/components/products/NewProduct";
import StoreHeading from "@/components/StoreHeading";
import withAuthorization from 'components/withAuthorization';

const Create = () => {
    return(
        <div className="min-h-screen">
            <StoreHeading title="Nuevo Articulo"/>
            <NewProduct/>
        </div>
    )
}

  export default withAuthorization(Create);
  
