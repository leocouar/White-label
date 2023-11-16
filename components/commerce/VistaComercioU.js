import { findAllStores } from 'services/storeService';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import logo from "../../images/default.jpeg";

const VistaComercioU = () => {
  const router = useRouter();
  const { id } = router.query;

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

  
  useEffect(() => {
    console.log(stores);
  }, [stores]);

  const selectedStore = stores.find(store => store.id === parseInt(id));

  if (!selectedStore) {
   
    return <p>Cargando...</p>;
  }


  return (
    <div className="w-full h-full">
      <div id={selectedStore.id} className="bg-gray-100 p-4 rounded-md shadow flex flex-col">
        <div className="w-full h-full">
          <h1 className="text-3xl text-center font-semibold mb-4 mt-4">{selectedStore.name}</h1>
          <hr className="border-b-1 border-gray-300 mb-4" />
        </div>
        <div className="flex w-full justify-around">
          <div className="w-1/2">
            <ul className="mt-12 ml-5 space-y-5">
              <li>
                <span className="font-semibold">Descripción:</span><a className="pl-2">{selectedStore.description}</a>
              </li>
              <li>
                <span className="font-semibold">Dirección:</span><a className="pl-2">{selectedStore.address}</a>
              </li>
            <li>
              <span className="font-semibold">Horarios:</span><a className="pl-2"></a>
            </li>
            <li>
              <span className="font-semibold">Email:</span><a className="pl-2">{selectedStore.email}</a>
            </li>
            <li>
              <span className="font-semibold">Telefono:</span><a className="pl-2">{selectedStore.telephone}</a>
            </li>
            </ul>
          </div>
          <div className="w-1/4">
            <img
              src={selectedStore.logo.link}
              className="w-full h-auto mb-16 rounded-xl shadow-lg transition-transform duration-300 transform origin-center hover:scale-110"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VistaComercioU;