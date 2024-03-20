import { useState, useEffect } from 'react'
import Link from 'next/link'
import Price from '@/components/products/Price'
import logo from "../../images/default.jpeg";
import Image from 'next/image'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { deleteFav } from 'services/favoriteService';
import BackToProductButton from '../products/BackToProductButton';

function FavoriteSection({ favorites }) {
    const [currentFavs, setCurrentFavs] = useState(favorites);
    const [groupedItems, setGroupedItems] = useState([]);

    const defaultImage = {
        "url": "default.jpeg",
        "link": logo,
        "main": false
    };

    useEffect(() => { console.log(gropeItems), [groupedItems] })

    const gropeItems = currentFavs.reduce((groups, item) => {
        const storeName = item?.product?.store?.name;

        if (!groups.some(store => store.name === storeName)) {
            groups.push({
                id: item?.product?.store?.id,
                name: storeName,
                items: [],
                logoLink: item.product?.store?.logo ? item.product?.store.logo.link : null
            });
        }

        const store = groups.find(store => store.name === storeName);
        store.items.push(item);

        return groups;
    }, []);

    useEffect(() => {
        setGroupedItems(gropeItems)
    }, [currentFavs])

    const deleteItem = (id) => {
        const updatedFavorites = currentFavs.filter(fav => fav.id !== id);
        setCurrentFavs(updatedFavorites);
        deleteFav(id);
    };


    return (
        <div className=''>
            {groupedItems && groupedItems.map((storeName, index) => (
                <div key={index} className="min-h-50 max-w-6xl my-4 sm:my-8 sm:mx-auto sm:w-full pb-10">
                    <div className="flex items-center font-primary font-semibold px-6 py-2 bg-gray-200">
                        <img
                            src={groupedItems[index].logoLink}
                            className="rounded-md mr-2"
                            style={{ width: "4rem" }}
                            alt="Logo"
                        />
                        <h1 className="text-xl">
                            <Link legacyBehavior passHref href={`/commerce/${groupedItems[index].id}`}>
                                <a className="pt-1 hover:text-palette-dark ml-4 truncate">
                                    {groupedItems[index].name}
                                </a>
                            </Link>
                        </h1>
                    </div>
                    <div className="flex uppercase text-xs sm:text-sm text-palette-primary border-b">
                        <div className="w-1/2 lg:pl-12 font-primary font-normal py-4 -px-6">Producto</div>
                        <div className="w-1/4 font-primary font-normal px-2 sm:px-6 py-2  flex items-center justify-center ">Precio</div>
                        <div className="w-1/4 font-primary font-normal px-2 sm:px-6 py-2  flex items-center justify-center ">Puntos</div>
                        <div className="w-1/4 font-primary font-normal px-2 sm:px-6 py-2  flex items-center justify-center ">Eliminar</div>
                    </div>
                    {groupedItems[index].items.map((item, index) => (
                        <div key={index} className="flex items-center text-sm sm:text-base text-gray-600">
                            <div className="w-1/2 font-primary font-medium py-2 flex items-center pl-10">
                                <Image src={item?.product?.images?.[0]?.link ?? defaultImage.link}
                                    width={50}
                                    height={50}
                                    className="w-12 h-12 rounded-full hidden sm:inline" />
                                <Link legacyBehavior passHref href={`/products/${item?.product?.id}`}>
                                    <a className="pt-1 hover:text-palette-dark ml-4">
                                        {item?.product?.name}
                                    </a>
                                </Link>
                            </div>
                            <div className=" flex items-center justify-center w-1/4 font-primary text-base font-light px-2 sm:px-6 py-2">
                                <Price
                                    currency="$"
                                    num={item?.product?.price}
                                    numSize="text-lg"
                                />
                            </div>
                            <div className="w-1/4 font-primary text-base font-light px-2 sm:px-6 py-2  flex items-center justify-center ">
                                <label>
                                    {item?.product?.points}
                                </label>
                            </div>
                            <div className="w-1/4 flex items-center justify-center font-primary font-medium px-4 sm:px-6 py-4">
                                <button
                                    aria-label="delete-item"
                                    className=""
                                    onClick={() => deleteItem(item?.id)}
                                >
                                    <FontAwesomeIcon icon={faTimes} className="w-8 h-8 text-palette-primary border border-palette-primary p-1 hover:bg-palette-lighter" />
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            ))}
            {groupedItems.length === 0 && (
                <>
                    <h1 className="leading-relaxed font-primary justify-between font-extrabold text-3xl text-center text-palette-primary mt-4 py-2 sm:py-4">
                        No hay Art&iacute;culos por aqu&iacute;
                    </h1>
                    <div className="w-80 m-auto">
                        <BackToProductButton />
                    </div>
                </>
            )}
        </div>
    
    );
    
}

export default FavoriteSection;
