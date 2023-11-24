import { useState,useEffect } from 'react';
import {updateStore} from 'services/storeService.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faAddressCard , faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons'; 

const VistaComercio = ({commerceData}) => {
  const [view, setView] = useState('commerce');
  const [storeToUpdate, setStoreToUpdate] = useState(commerceData.store.store);
  const [storeToShow, setStoreToShow] = useState(commerceData.store.store)
  const [refreshData, setRefreshData] = useState(false)
  const DefaultImage = "https://i.pinimg.com/564x/56/02/c2/5602c21e0b1cc147c5c7f7ad36e688da.jpg"
  useEffect(()=>{
    setStoreToShow({
      ...storeToUpdate
  })
  },[refreshData])
  
  const handleEditClick = () => {
    setView('edit');
  };
  const handleCancelClick = () => {
    setView('commerce');
  };

  const handleChange = (e) => {   
    setStoreToUpdate({
        ...storeToUpdate,
        [e.target.name]: e.target.value,
    });
  }

  const handleSave = () => {
    // Update the commerce information with the new values
        updateStore(storeToUpdate);
        refreshData === true ? setRefreshData(false) : setRefreshData(true);
    setView('commerce');
    }
  

  return (
    <div className="bg-white p-4 rounded-md">
      {view === 'commerce' && (
        <div>
          <div className="flex items-center mb-4">
            <div className="mr-16">
              <h1 className="text-4xl font-semibold mb-4">"{storeToShow.name}"</h1>
              <h2 className="text-2xl italic mb-4">{storeToShow.description}</h2>
            </div>
            <img src={storeToShow?.logo?.link || DefaultImage} alt={storeToShow.name} className="w-48 rounded border-2"/>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Display commerce information */}
            <div>
              <h2 className="flex place-items-center font-semibold text-lg mb-2"><FontAwesomeIcon icon={faMapMarkerAlt} className="w-5 text-gray-500"/>&nbsp;Dónde encontrarnos</h2>
              <ul className="list-disc ml-5 space-y-2">
                <li className="font-light">
                  <span className="font-medium">Dirección:</span> {storeToShow.address}
                </li>
                <li className="font-light">
                  <span className="font-medium">Horarios:</span> {storeToShow.schedule}
                </li>
              </ul>
            </div>
            <div>
              <h2 className="flex place-items-center font-semibold text-lg mb-2"><FontAwesomeIcon icon={faAddressCard} className="w-8 text-gray-500"/>&nbsp;Contacto</h2>
              <ul className="list-disc ml-5 space-y-2">
                <li className="font-light">
                  <span className="font-medium">Teléfono:</span> {storeToShow.telephone}
                </li>
                <li className="font-light">
                  <span className="font-medium">Email:</span> {storeToShow.email}
                </li>
              </ul>
            </div>
          </div>
          {/* Edit button */}
          <div className="md:col-span-2 text-right">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
              onClick={handleEditClick}
            >
              Editar
            </button>
          </div>
        </div>)}

      {view === 'edit' && (
        <div className="inset-0 z-10 flex items-center justify-center">
          <div className="bg-white w-full mx-auto rounded-lg overflow-y-auto">
            <h2 className="text-lg font-semibold mb-3">Editar información del comercio</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Descripción:</label>
              <input
                type="text"
                value={storeToUpdate?.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                id="description"
                name="description"
              />
            </div>
            <div className="flex flex-wrap -mx-3">
              <div className="w-full md:w-1/2 px-3 mb-4">
                <label className="block text-sm font-medium mb-1">Email:</label>
                <input
                  type="text"
                  value={storeToUpdate?.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  id="email"
                  name="email"
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-4">
                <label className="block text-sm font-medium mb-1">Teléfono:</label>
                <input
                  type="text"
                  value={storeToUpdate?.telephone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  id="telephone"
                  name="telephone"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3">
              <div className="w-full md:w-1/2 px-3 mb-4">
                <label className="block text-sm font-medium mb-1">Dirección:</label>
                <input
                  type="text"
                  value={storeToUpdate?.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  id="address"
                  name="address"
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-4">
                <label className="block text-sm font-medium mb-1">Horarios:</label>
                <input
                  type="text"
                  value={storeToUpdate?.schedule}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  id="schedule"
                  name="schedule"
                />
              </div>
            </div>
              <div className="flex place-content-end">
                <button
                  onClick={handleCancelClick}
                  className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded-md mr-2"
                  >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-md"
                  >
                  Guardar
                </button>
              </div>    
          </div>
        </div>
      )}
    </div>
  );
};  
  export default VistaComercio;