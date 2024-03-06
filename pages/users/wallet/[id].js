import {getWalletUser} from "../../../services/walletService";
import PageTitle from "@/components/PageTitle";
import WalletOfUser from "../../../components/wallet";
import { getByUsername } from "services/userService";
import userAuthorization from "@/components/userAuthorization";
import SEO from "@/components/SEO";

const Wallet = ({walletOfUser, user}) => {

    return (
        <>
        <SEO title="Mi Billetera" />
        <div className="mx-auto max-w-6xl">
            <PageTitle text="Mi Billetera" />
            <WalletOfUser walletOfUser={walletOfUser} user={user}/>
        </div>
        </>

    )
}
export default userAuthorization(Wallet)

export async function getServerSideProps({query}) {
    const user = await getByUsername(query.id)
    const walletOfUser  = await getWalletUser(query.id)
    return {
        props: {
            user,
            walletOfUser, 
        }
    }
}

