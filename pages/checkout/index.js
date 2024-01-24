import List from "@/components/checkout/List";
import React, {useEffect, useState} from "react";
import {findAll} from "../../services/checkoutService";
import PageTitle from "@/components/PageTitle";
import withAuthorization from 'components/withAuthorization';
import SEO from "@/components/SEO";

const Index = () => {

    return (
        <>
        <SEO title="Tus Compras" />
        <div className="mx-auto max-w-6xl">
            <PageTitle text={`Tus Compras`} />
            <List/>
        </div>
        </>
    )
}

export default withAuthorization(Index);
