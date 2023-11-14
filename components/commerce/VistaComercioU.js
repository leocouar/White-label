import { useState,useEffect } from 'react';
import {updateStore} from 'services/storeService.js' 

const VistaComercioU= () => {

    const callout = [
        {
          name: 'Comercio',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
          href: '#'
        },
                          
          
      ] 

  return (
    <div className="w-full h-full">
    <div className="bg-gray-100 p-4 rounded-md shadow-md flex flex-col">
    <div className="w-full h-full">
    <h1 className="text-3xl text-center font-semibold mb-4 mt-4">Nombre de Comercio</h1>
    <hr className="border-b-1 border-gray-300 mb-4" />
    </div>
      <div className="flex w-full justify-around">
        <div className="w-1/2">
          <ul className="mt-6 ml-5 space-y-5">
            <li>
              <span className="font-semibold">Descripción:</span>
            </li>
            <li>
              <span className="font-semibold">Dirección:</span>
            </li>
            <li>
              <span className="font-semibold">Horarios:</span>
            </li>
            <li>
              <span className="font-semibold">Email:</span>
            </li>
            <li>
              <span className="font-semibold">Telefono:</span>
            </li>
          </ul>
        </div>
  
        <div className="w-1/4">
          <img
            src='https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg'
            className="w-full h-auto mb-16 rounded-xl  shadow-lg transition-transform duration-300 transform origin-center hover:scale-110"
          />
        </div>   
      </div>
    </div>
  </div>
  

  );
};  
  export default VistaComercioU;