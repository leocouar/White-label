// FavoriteButton.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartFilled } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getStatus, save, deleteFav } from 'services/favoriteService';
import { useRouter } from 'next/router';

const FavoriteButton = ({ productData }) => {
    const [favoriteId, setFavoriteId] = useState(false);
    const { data: session, status } = useSession()
    const sessionUser = session?.user?.username
    const router = useRouter();

    // Llamar a la función para verificar si el producto es favorito para el usuario
    const checkFavoriteStatus = async () => {
        if (sessionUser) {
            const favoriteId = await getStatus(productData.id, sessionUser);
            setFavoriteId(favoriteId);
        }
    };

    useEffect(() => {
        console.log(productData.id, sessionUser)
        checkFavoriteStatus();
    }, [sessionUser, productData.id]);


    const toggleFavorite = async () => {
        if (!sessionUser) {
            // Redirigir al usuario a la página de inicio de sesión si no está autenticado
            router.push('/login');
            return;
        }
        
        if (favoriteId === "") {
            const newFavorite = await save(
                {
                    "productId": productData.id,
                    "username": sessionUser
                }
            );
            setFavoriteId(newFavorite.id);
        } else {
            deleteFav(favoriteId);
            setFavoriteId("")
        }
    };

    return (
        <div>
            <button
                className='pt-1 justify-center items-center pb-1 font-primary font-semibold flex p-2 text-md w-full'
                onClick={toggleFavorite}
            >
                {favoriteId != "" ? (
                    <FontAwesomeIcon icon={faHeartFilled} className='w-5 text-red-500' />
                ) : (
                    <FontAwesomeIcon icon={faHeart} className='w-5' />
                )}
            </button>
        </div>
    );
};

export default FavoriteButton;

