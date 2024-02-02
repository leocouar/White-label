import { getByUser } from "../../../services/checkoutService";
import PageTitle from "@/components/PageTitle";
import React from "react";
import { useSession } from "next-auth/react";
import SEO from "@/components/SEO";
import List from "@/components/checkout/List";

const UserCheckouts = ({checkoutList }) => {
    const { data: session, status } = useSession();

    return (
        <>
        <SEO title="Historial de tus compras" />
        <div className="mx-auto max-w-6xl">
            <PageTitle text={`Historial de tus compras `} />
            <List user={session?.user?.username} />
        </div>
        </>
    )

}

export default UserCheckouts;