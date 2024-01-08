import SEO from "@/components/SEO";
import NewProduct from "@/components/products/NewProduct";
import withAuthorization from 'components/withAuthorization';

const Create = () => {
    return(
        <>
        <SEO title="Agregar nuevo producto" />
        <div className="min-h-screen pt-4">
            <NewProduct admin={true}/>
        </div>
        </>
    )
}

  export default withAuthorization(Create);
  
