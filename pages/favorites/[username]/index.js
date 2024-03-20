
import { findAllByUser } from "services/favoriteService";
import { useState, useEffect } from "react";
import FavoriteSection from "@/components/favorites/FavoriteSection";
import PageTitle from "@/components/PageTitle";
import SEO from "@/components/SEO";

const Index = ({ favorites }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (favorites.length > 0) {
            const productsArray = favorites.map(item => item.product);
            setProducts(productsArray);
        }
    }, [favorites]);


    return (
        <div className="pb-32">
            <SEO title="Productos Favoritos" />
            <PageTitle text="Productos Favoritos" />
            <FavoriteSection favorites={favorites} />
        </div>
    );
};


export async function getServerSideProps({ params }) {
    const favorites = await findAllByUser(params.username);
    return {
        props: {
            favorites: favorites,
        },
    };
}

export default Index;