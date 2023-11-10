import NewStore from "@/components/stores/NewStore";
import StoreHeading from "@/components/StoreHeading";
import withAuthorization from 'components/withAuthorization';

const CreateStore = () => {
    return(
        <div className="min-h-screen">
            <StoreHeading title="Nuevo Comercio"/>
            <NewStore/>
        </div>
    )
}

export default withAuthorization(CreateStore);

