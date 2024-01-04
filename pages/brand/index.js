import {findAll} from "../../services/brandService";
import BrandList from "@/components/brands/BrandList";
import PageTitle from "@/components/PageTitle";
import React from "react";
import withAuthorization from 'components/withAuthorization';
import SEO from "@/components/SEO";


const Brand = ({brands}) => {
  return (
        <>
        <SEO title="Marcas" />
        <div className="mx-auto max-w-6xl">
            <PageTitle text="MARCAS"/>
            <BrandList brands={brands}/>
        </div>
        </>
  );
};

export async function getServerSideProps() {
    const brands = await findAll();
    return {
        props: {
            brands  
        }
    };
}

export default withAuthorization(Brand);

