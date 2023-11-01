import MenuDashboard from "@/components/dashboard/MenuDashboard.js"
import { findByID } from "services/storeService"; 


function Dashboard(store) {

    return (
        <div>
            <MenuDashboard store={store}/>
        </div>
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