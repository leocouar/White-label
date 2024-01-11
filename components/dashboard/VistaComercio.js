import { useState, useEffect, useRef } from 'react';
import { updateStore } from 'services/storeService.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import imageResizer from '../uploadFile/ImageResizer';
import { deleteStoreLogo } from 'services/storeService.js';
import { uploadFile } from 'services/fileService';
import { findByID } from 'services/storeService.js';
import { useRouter } from "next/router";
import { emailRegex, phoneRegex } from '../stores/FieldRegexs';
import DeleteWarning from './DeleteWarning';
import { deleteStore } from 'services/storeService.js';

const VistaComercio = ({ commerceData }) => {
  const [view, setView] = useState('commerce');
  const [storeToUpdate, setStoreToUpdate] = useState(commerceData.store.store);
  const [storeToShow, setStoreToShow] = useState(commerceData.store.store);
  const [currentLogoURL, setCurrentLogoURL] = useState("https://i.pinimg.com/564x/56/02/c2/5602c21e0b1cc147c5c7f7ad36e688da.jpg");
  const [logoWasUpdated, setLogoWasUpdated] = useState(false);
  const [newLogoFile, setNewLogoFile] = useState();
  const [editLogoURL, setEditLogoURL] = useState(null);
  const router = useRouter();

  ////*** Errores */
  const [errEmail, setErrEmail] = useState(false);
  const [errTel, setErrTel] = useState(false);
  const [errName, setErrName] = useState(false);
  const [errAdress, setErrAdress] = useState(false);
  const [erraddress, setErraddress] = useState(false);
  const [errSchedule, setErrSchedule] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openWarning = () => {
    setIsModalOpen(true);
  };

  const closeWarning = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (storeToShow && storeToShow.logo) {
      const logoURL = storeToShow?.logo?.link;
      setCurrentLogoURL(logoURL);
      setEditLogoURL(logoURL);
    }
  }, [storeToShow]);

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

  const handleDelClick = async () => {
    await deleteStore(commerceData.store.store.id);
    router.push("/stores/list");
  }

  const handleCancelClick = () => {
    setView('commerce');
  };

  const handleChange = (e) => {
    setStoreToUpdate((prevStore) => ({
      ...prevStore,
      [e.target.name]: e.target.value,
    }));
  };

  function extractFilename(url) {
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    return filename;
  }

  const updateStoreData = async () => {
    const updatedStore = await findByID(storeToUpdate.id);
    setStoreToShow(updatedStore);
    setCurrentLogoURL(updatedStore?.logo?.link);
  };

  const verifyData = async () => {
    const checkTel = !phoneRegex.test(storeToUpdate.telephone.trim());
    setErrTel(checkTel);

    const checkEmail = !emailRegex.test(storeToUpdate.email.trim());
    await setErrEmail(checkEmail)

    return { checkTel, checkEmail };
  };

  const handleSave = async () => {
    const errors = await verifyData();

    const missingFields = [];
    if (!storeToUpdate.name || !storeToUpdate.name.trim()) {
      setErrName(true);
      missingFields.push("Nombre");
    } else {
      setErrName(false);
    }

    if (!storeToUpdate.address || !storeToUpdate.address.trim()) {
      setErraddress(true);
      missingFields.push("Dirección");
    } else {
      setErraddress(false);
    }

    if (!storeToUpdate.Adress || !storeToUpdate.Adress.trim()) {
      setErrAdress(true);
      missingFields.push("Descripción");
    } else {
      setErrAdress(false);
    }

    if (!storeToUpdate.schedule || !storeToUpdate.schedule.trim()) {
      setErrSchedule(true);
      missingFields.push("Horarios");
    } else {
      setErrSchedule(false);
    }



    if (missingFields.length > 0) {
      // Mostrar mensaje de error

      return;
    }

    if (!errors.checkEmail && !errors.checkTel) {
      await updateStore(storeToUpdate);

      if (logoWasUpdated) {
        if (storeToShow?.logo?.link) {
          await deleteStoreLogo(storeToUpdate.id, extractFilename(currentLogoURL));
        }
        await uploadFile("store", newLogoFile, storeToUpdate.id, false);
      }

      await setView("commerce");
      await router.push(`/dashboard/${storeToShow.id}`);
      await updateStoreData();
      setLogoWasUpdated(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-md">
      {view === 'commerce' && (
        <div>
          <div className="flex items-center mb-4">
            <div className="mr-16">
              <h1 className="text-4xl font-semibold mb-4">"{storeToShow.name}"</h1>
              <h2 className="text-2xl italic mb-4">{storeToShow.Adress}</h2>
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
          <div className="md:col-span-2 text-right mt-2">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md mr-2"
              onClick={openWarning}
            >
              Eliminar
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
              onClick={handleEditClick}
            >
              Editar
            </button>
          </div>

          {/*MODAL TESTING*/}
          <div className="min-h-screen flex items-center justify-center">
            <DeleteWarning isOpen={isModalOpen} onClose={closeWarning}>
              <h1 className="text-4xl font-bold mb-4 text-center">¡ATENCIÓN!</h1>
              <h3 className="text-lg mb-4 text-center">
                Esto eliminará todos los productos relacionados al comercio{' '}
                {commerceData.store.store.name}, los mismos{' '}
                <u>
                  <b>no se podrán recuperar en absoluto.</b>
                </u>
              </h3>
              <p className="mb-4 text-center">¿Está seguro de que desea continuar?</p>
              <div className="flex justify-center">
                <button onClick={handleDelClick} className="bg-red-500 text-white px-4 py-2 rounded mr-2">
                  Confirmar
                </button>
                <button onClick={closeWarning} className="bg-gray-500 text-white px-4 py-2 rounded">
                  Cancelar
                </button>
              </div>
            </DeleteWarning>
          </div>
          {/*MODAL TESTING*/}

        </div>)}

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
                  maxLength={50}
                />
                {errName && <p className="text-red-500 text-xs italic">Falta completar este campo</p>}
              </div>
              <div className="w-full md:w-1/2 px-3 mb-4">
                <label className="block text-sm font-medium mb-1">Descripci&oacute;n:</label>
                <input
                  type="text"
                  value={storeToUpdate?.Adress}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  id="Adress"
                  name="Adress"
                  maxLength={50}
                />
                {errAdress && <p className="text-red-500 text-xs italic">Falta completar este campo</p>}
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
                <div className="flex items-center">
                  <span className="absolute text-gray-500 pl-3">+54 9</span>
                  <input

                    type="text"
                    value={storeToUpdate?.telephone}
                    onChange={handleChange}
                    className="w-full pl-16 pr-3 py-2 border rounded-md"
                    id="telephone"
                    name="telephone"
                  />
                </div>
                {errTel && <p className={`text-red-500 text-xs italic`}>
                  "Ingrese su número sin el 0 y sin el 15, y sin guiones en el medio"
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
                  maxLength={50}
                />
                {erraddress && <p className="text-red-500 text-xs italic">Falta completar este campo</p>}
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
                  maxLength={50}
                />
                {errSchedule && <p className="text-red-500 text-xs italic">Falta completar este campo</p>}
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