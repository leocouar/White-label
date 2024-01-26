import {getById} from "../../services/checkoutService";
import Details from "@/components/checkout/details";
import PageTitle from "@/components/PageTitle";
import React from "react";
import SEO from "@/components/SEO";

const Checkout = ({checkout}) => {

    return (
        <>
        <SEO title="Tus Compras" />
        <div className="mx-auto max-w-6xl">
            <PageTitle text="Tus Compras"/>
            <Details checkout={checkout}/>
        </div>
        </>
    )

}

export default Checkout

export async function getServerSideProps({query}) {
    const checkout = await getById(query.id);

    return {
        props: {
            checkout
        },
    }
}