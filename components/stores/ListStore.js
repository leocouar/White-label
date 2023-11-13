import Link from 'next/link';
import { useState, useEffect } from 'react';

const ListStores = ({ stores }) => {
    return (
        <div className="max-w-md mx-auto shadow-lg bg-white rounded-lg overflow-hidden">
            <ul>
                {stores.map((store, index) => (
                    <Link href={`/dashboard/${store.id}`} >
                        <li
                            key={index}
                            className="py-2 flex justify-between items-center hover:bg-gray-200 ease-in duration-300 cursor-pointer"
                        >
                            <span className="m-auto text-lg">{store.name}</span>
                            {/* Agrega más detalles del store si es necesario */}
                        </li>
                    </Link>
            ))}
            <Link href={'/stores/create'}>
                <li className="py-2 flex  font rounded-b-lg justify-between items-center bg-palette-secondary hover:bg-red-700 ease-in duration-300 cursor-pointer">
                    <span className="m-auto font-bold text-white text-lg">crear nuevo comercio+</span>
                </li>
            </Link>
        </ul>
        </div >
      );
    };
export default ListStores;