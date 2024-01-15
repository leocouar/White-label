import NewStore from "@/components/stores/NewStore";
import StoreHeading from "@/components/StoreHeading";
import withAuthorization from 'components/withAuthorization';
import SEO from "@/components/SEO";
import { findAll } from 'services/userService';

const CreateStore = ({users}) => {
    return(
        <>
        <SEO title="Agregar un nuevo comercio" />
        <div className="min-h-screen">
            <StoreHeading title="Nuevo Comercio"/>
            <NewStore users={users}/>
        </div>
        </>
    )
}

export async function getServerSideProps() {
    const users = await findAll();

    return {
        props: {
            users
        }
    };
}

export default CreateStore;
/*
export default withAuthorization(CreateStore);
*/
