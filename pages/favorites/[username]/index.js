import Products from "@/components/products/Products";
import { findAllByUser } from "services/favoriteService";
import { useState, useEffect } from "react";

const Index = ({ favorites }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        console.log("Favorites received:", favorites);
        if (favorites.length > 0) {
            // Extrae los productos de los favoritos recibidos
            const productsArray = favorites.map(item => item.product);
            console.log("Products extracted:", productsArray);
            // Establece los productos en el estado
            setProducts(productsArray);
        } else {
            console.log("No favorites received.");
        }
    }, [favorites]);

    return (
        <>
            {/* Muestra los productos utilizando el componente Products */}
            <Products products={products}/>
        </>
    );
};

// Función para obtener los favoritos del usuario del servidor
export async function getServerSideProps(params) {
    try {
        // Imprime el valor de params.username
        console.log("Username:", params.username);

        // Llama a findAllByUser para obtener los favoritos del usuario
        const favorites = await findAllByUser(params.username);
        // Devuelve los favoritos como props
        return {
            props: {
                favorites: favorites,
            },
        };
    } catch (error) {
        console.error("Error fetching favorites:", error);
        // Maneja cualquier error y devuelve una lista de favoritos vacía
        return {
            props: {
                favorites: [],
            },
        };
    }
}

export default Index;
