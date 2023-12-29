import NewProduct from "@/components/products/NewProduct";
import withAuthorization from 'components/withAuthorization';

const Create = () => {
    return(
        <div className="min-h-screen pt-4">
            <NewProduct/>
        </div>
    )
}

  export default withAuthorization(Create);
  
