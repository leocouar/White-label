import MenuDashboard from "@/components/dashboard/MenuDashboard.js"
import { findByID } from "services/storeService"; 
import SEO from "@/components/SEO";

function Dashboard(store) {

    return (
        <>
        <SEO title={store.store.name} />
        <div>
            <MenuDashboard store={store}/>
        </div>
        </>
    )
}
export default Dashboard

export async function getServerSideProps({query}) {
    const store  = await findByID(query.id);
  
    return {
        props: {
            store
        }
    }
}