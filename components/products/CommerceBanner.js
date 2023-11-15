import { findAllStores } from 'services/storeService';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image'
import Link from 'next/link'
import Price from '@/components/products/Price'
import logo from "../../images/default.jpeg";


function Banner() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    async function fetchStores() {
      try {
        const response = await findAllStores();
        setStores(response);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchStores();
  }, []);

  useEffect(()=>{console.log(stores)},[stores])



  return (
    <div className="bg-gray-100 w-full">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto h-100 py-16 sm:py-24 lg:max-w-none flex overflow-x-auto no-scrollbar">
          {stores.map((store) => (
            <div key={store.id} className="flex-shrink-0 mx-3 max-w-full">
              <Link href={`/commerce/${store.id}`}>
                <a>
                  <div className="bg-white relative h-auto lg:w-48 border-2 border-gray-200 shadow-lg rounded-lg group-hover:opacity-75 sm:h-64 transition-transform duration-300 transform origin-center hover:scale-110">
                    <img src={store.logo} alt={store.name} className="rounded" />
                    <h1 className="flex justify-center mt-4 font-primary">{store.name}</h1>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}




  export default Banner;