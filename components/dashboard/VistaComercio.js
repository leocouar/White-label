import { useState, useEffect } from 'react';
import { updateStore } from 'services/storeService.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import imageResizer from '../uploadFile/ImageResizer';
import { deleteStoreLogo } from 'services/storeService.js';
import { uploadFile } from 'services/fileService';
import { findByID } from 'services/storeService.js';
import { useRouter } from "next/router";
import { emailRegex, phoneRegex } from '../stores/FieldRegexs';

const VistaComercio = ({ commerceData }) => {
  const [view, setView] = useState('commerce');
  //(No preguntar porque dice store.store: funciona y ya.)
  const [storeToUpdate, setStoreToUpdate] = useState(commerceData.store.store);
  const [storeToShow, setStoreToShow] = useState(commerceData.store.store)
  const [currentLogoURL, setCurrentLogoURL] = useState("https://i.pinimg.com/564x/56/02/c2/5602c21e0b1cc147c5c7f7ad36e688da.jpg");
  const [logoWasUpdated, setLogoWasUpdated] = useState(false);
  const [newLogoFile, setNewLogoFile] = useState();
  const [editLogoURL, setEditLogoURL] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const router = useRouter();

  const [errEmail, setErrEmail] = useState(false);
  const [errTel, setErrTel] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  useEffect(() => {
    if (storeToShow && storeToShow.logo) {
      const logoURL = storeToShow?.logo?.link;
      setCurrentLogoURL(logoURL);
      setEditLogoURL(logoURL)
    }
  }, [storeToShow])

  //Selecciona una imagen a cargar  
  const handleImageUpload = async (event) => {
    const resizedData = await imageResizer(event);
    setNewLogoFile(resizedData.fileData);
    setEditLogoURL(resizedData.returnedURL);
    setLogoWasUpdated(true);
  };

  const handleEditClick = () => {
    setView('edit');
  };

  const handleDeleteClick = () => {
    
    closePopup()
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

  function extractFilename(url) {
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    return filename;
  }

  const updateStoreData = async () => {
    const updatedStore = await findByID(storeToUpdate.id);
    await setStoreToShow(updatedStore)
    await setCurrentLogoURL(updatedStore?.logo?.link);
  }

  const verifyData = async () => {
    const checkTel = !phoneRegex.test(storeToUpdate.telephone.trim());
    await setErrTel(checkTel);

    const checkEmail = !emailRegex.test(storeToUpdate.email.trim());
    await setErrEmail(checkEmail);
    return { checkTel, checkEmail };
  }

  useEffect(() => { console.log("ESTADO REAL:", errEmail, errTel) }, [errEmail, errTel]);

  const handleSave = async () => {
    const errors = await verifyData();

    if (!errors.checkEmail && !errors.checkTel) {
      await updateStore(storeToUpdate);
      if (logoWasUpdated) {
        if (storeToShow?.logo?.link)
          await deleteStoreLogo(storeToUpdate.id, extractFilename(currentLogoURL));
        await uploadFile("store", newLogoFile, storeToUpdate.id, false);
      }

      await setView("commerce");
      await router.push(`/dashboard/${storeToShow.id}`);
      await updateStoreData();
      setLogoWasUpdated(false);
    }
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
            <img src={currentLogoURL}
              alt={storeToShow.name}
              className="w-48 rounded border-2"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Display commerce information */}
            <div>
              <h2 className="flex place-items-center font-semibold text-lg mb-2"><FontAwesomeIcon icon={faMapMarkerAlt} className="w-5 text-gray-500" />&nbsp;Dónde encontrarnos</h2>
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
              <h2 className="flex place-items-center font-semibold text-lg mb-2"><FontAwesomeIcon icon={faAddressCard} className="w-8 text-gray-500" />&nbsp;Contacto</h2>
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
              className=" w-24 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
              onClick={handleEditClick}
            >
              Editar
            </button>
          </div>
          {/* Delete button */}
          <div className="md:col-span-2 text-right">
            <button
              className="w-24 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md"
              onClick={openPopup}
            >
              Eliminar
            </button>
          </div>
        </div>)}

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded">
            <h1>¡Atención!</h1>
            <p>Eliminar un comercio implica eliminar ademas todos sus productos</p>
            <p>Ademas, es algo que no se puede deshacer.</p>
            <h2>¿Esta seguro de que desea eliminar este comercio?</h2>
            <button onClick={handleDeleteClick} className="mt-4 bg-red-500 text-white p-2">
              Si
            </button>
            <button onClick={closePopup} className="mt-4 bg-red-500 text-white p-2">
              No
            </button>
          </div>
        </div>
      )}

      {view === 'edit' && (
        <div className="inset-0 z-10 flex items-center justify-center">
          <div className="bg-white w-full mx-auto rounded-lg">
            <h2 className="text-lg font-semibold mb-3">Editar información del comercio</h2>
            <div className="flex flex-wrap -mx-3">
              <div className="w-full md:w-1/2 px-3 mb-4">
                <label className="block text-sm font-medium mb-1">Nombre:</label>
                <input
                  type="text"
                  value={storeToUpdate?.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  id="name"
                  name="name"
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-4">
                <label className="block text-sm font-medium mb-1">Descripci&oacute;n:</label>
                <input
                  type="text"
                  value={storeToUpdate?.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  id="description"
                  name="description"
                />
              </div>

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
                {errEmail && <p className={`text-red-500 text-xs italic`}>
                  "E-mail invalido. Verifique este campo"
                </p>}
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
                {errTel && <p className={`text-red-500 text-xs italic`}>
                  "Telefono invalido"
                </p>}
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
              <div className="w-full md:w-1/2 px-3 mb-4">
                <label className="block text-sm font-medium mb-1">Logo:</label>
                {editLogoURL && <img src={editLogoURL}
                  alt={storeToShow.name}
                  className="w-48 rounded border-2"
                />
                }
                <div>
                  <label htmlFor="upload"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm">
                    Subir imagen
                  </label>
                  <input
                    type="file"
                    id="upload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                  <p className={`text-blue-500 text-xs italic`}>
                    El logo debe ser de 368x368 en formato .jpg o .png. <u>De no ser asi, sera redimensionada.</u>
                  </p>
                </div>
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