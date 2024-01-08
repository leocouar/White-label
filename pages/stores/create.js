import NewStore from "@/components/stores/NewStore";
import StoreHeading from "@/components/StoreHeading";
import withAuthorization from 'components/withAuthorization';
import SEO from "@/components/SEO";


const CreateStore = () => {
    return(
        <>
        <SEO title="Agregar un nuevo comercio" />
        <div className="min-h-screen">
            <StoreHeading title="Nuevo Comercio"/>
            <NewStore/>
        </div>
        </>
    )
}

export default CreateStore;
/*
export default withAuthorization(CreateStore);
*/
