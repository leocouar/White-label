import React, { useState, useEffect } from 'react';
import logo from "../../images/default.jpeg";
const ComercioUnico = ({store}) => {
    const DefaultImage = "https://i.pinimg.com/564x/56/02/c2/5602c21e0b1cc147c5c7f7ad36e688da.jpg";

    return (
        <div className="w-full h-full">
            <div id={store.id} className="bg-gray-100 p-4 rounded-md shadow flex flex-col">
                <div className="w-full h-full">
                    <h1 className="text-3xl text-center font-semibold mb-4 mt-4">{store.name}</h1>
                    <hr className="border-b-1 border-gray-300 mb-4" />
                </div>
                <div className="flex w-full justify-around">
                    <div className="w-1/2">

                        <ul className="mt-12 ml-5 space-y-5">
                            <li>
                                <span className="font-semibold">Descripción:</span><a className="pl-2">{store.description}</a>
                            </li>
                            <li>
                                <span className="font-semibold">Dirección:</span><a className="pl-2">{store.address}</a>
                            </li>
                            <li>
                                <span className="font-semibold">Horarios:</span><a className="pl-2"></a>
                            </li>
                            <li>
                                <span className="font-semibold">Email:</span><a className="pl-2">{store.email}</a>
                            </li>
                            <li>
                                <span className="font-semibold">Telefono:</span><a className="pl-2">{store.telephone}</a>
                            </li>
                        </ul>

                    </div>
                    <div className="w-1/4">
                        <img
                            src={store.logo?.link || DefaultImage} // Utilizar logo predeterminado si no hay uno en la tienda

                            className="w-full h-auto mb-16 rounded-xl shadow-lg transition-transform duration-300 transform origin-center hover:scale-110"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ComercioUnico;