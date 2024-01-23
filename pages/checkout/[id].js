import { getById } from "../../services/checkoutService";
import Details from "@/components/checkout/details";
import PageTitle from "@/components/PageTitle";
import React from "react";
import { useSession } from "next-auth/react";

const Checkout = ({ checkout }) => {
    const { data: session, status } = useSession();

    return (
        <div className="mx-auto max-w-6xl">
            <PageTitle text={`Checkout #${checkout.id}\n `} />
            <h1 className="text-center mb-2 -mt-4 text-lg">
                {
                    session?.user?.role?.includes('ADMIN')
                    && 
                    <>
                        <b>Usuario:</b> {checkout.username} &emsp;
                    </>
                }
                <b>Status:</b> {checkout.status}
            </h1>
            <Details checkout={checkout} />
        </div>
    )

}

export default Checkout

export async function getServerSideProps({ query }) {
    const checkout = await getById(query.id);

    return {
        props: {
            checkout
        },
    }
}