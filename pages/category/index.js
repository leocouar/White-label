import { findAll } from "services/categoriesService";
import CategoriesList from "@/components/categories/CategoriesList";
import PageTitle from "@/components/PageTitle";
import withAuthorization from 'components/withAuthorization';
import React from "react";
import SEO from "@/components/SEO";

const Category = ({categories}) => {
  return (
    <>
    <SEO title="Artículos" />
        <div className="mx-auto max-w-6xl">
            <PageTitle text="Artículos"/>
            <CategoriesList categories={categories}/>
        </div>
    </>
  );
};

export async function getServerSideProps() {
    const categories = await findAll();
    return {
        props: {
            categories  
        }
    };
}

export default withAuthorization(Category);

