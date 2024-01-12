import SEO from "@/components/SEO";
import NewProduct from "@/components/products/NewProduct";
import withAuthorization from 'components/withAuthorization';
import { useRouter } from "next/router";

const Create = () => {
    const router = useRouter();

    const onCancel = () =>{
        router.push("/products");
    }

    return(
        <>
        <SEO title="Agregar nuevo producto" />
        <div className="min-h-screen pt-4">
            <NewProduct onCancel={onCancel} admin={true}/>
        </div>
        </>
    )
}

  export default withAuthorization(Create);
  
