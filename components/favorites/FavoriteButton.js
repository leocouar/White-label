// FavoriteButton.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart as faHeartFilled } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';

const FavoriteButton = () => {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <div>
            <button
                className='pt-1 justify-center items-center pb-1 font-primary font-semibold flex p-2 text-md w-full'
                onClick={toggleFavorite}
            >
                {isFavorite ? (
                    <FontAwesomeIcon icon={faHeartFilled} className='w-5 text-red-500' />
                ) : (
                    <FontAwesomeIcon icon={faHeart} className='w-5' />
                )}
            </button>
        </div>
    );
};

export default FavoriteButton;

