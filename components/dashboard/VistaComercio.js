import { useState,useEffect } from 'react';
import {updateStore} from 'services/storeService.js' 

const VistaComercio = ({commerceData}) => {
  // State to control the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const [storeToUpdate, setStoreToUpdate] = useState(commerceData.store.store);
  const [storeToShow, setStoreToShow] = useState(commerceData.store.store)
  const [refreshData, setRefreshData] = useState(false)

    useEffect(()=>{
    setStoreToShow({
      ...storeToUpdate
  })
  },[refreshData])
  const handleEditClick = () => {
    // Open the modal when the "Edit" button is clicked
    setIsModalOpen(true);
  };
  const handleChange = (e) => {   
    setStoreToUpdate({
        ...storeToUpdate,
        [e.target.name]: e.target.value,
    });
}
  const handleCloseModal = () => {
    // Close the modal
    setIsModalOpen(false);
  };

  const handleSave = () => {
    // Update the commerce information with the new values
        updateStore(storeToUpdate);
        refreshData === true ? setRefreshData(false) : setRefreshData(true);
    
    // Close the modal
    setIsModalOpen(false);
    }
  

  return (
    <div className="bg-blue-100 p-4 rounded-md shadow-md">
      <h1 className="text-4xl font-semibold mb-4">{storeToShow.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Display commerce information */}
        <div>
          <h2 className="text-2xl font-semibold">"{storeToShow.description}"</h2>
          <ul className="list-disc ml-5 space-y-2">
            <li>
              <span className="font-extrabold">Dirección:</span> {storeToShow.address}
            </li>
            <li>
              <span className="font-extrabold">Horarios:</span> {storeToShow.schedule}
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Contacto</h2>
          <ul className="list-disc ml-5 space-y-2">
            <li>
              <span className="font-extrabold">Teléfono:</span> {storeToShow.telephone}
            </li>
            <li>
              <span className="font-extrabold">Email:</span> {storeToShow.email}
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

      {isModalOpen && (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
      <div className="modal-container bg-white w-80 md:w-4/5 mx-auto p-6 rounded-lg shadow-lg z-20 max-h-96 overflow-y-auto">
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
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
        >
        Guardar
      </button>
      <button
        onClick={handleCloseModal}
        className="bg-red-500 text-white px-4 py-2 rounded-md"
      >
        Cancelar
      </button>
    </div>
  </div>
)}
    </div>
  );
};  
  export default VistaComercio;