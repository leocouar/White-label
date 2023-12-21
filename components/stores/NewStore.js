import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { saveStore } from "/services/storeService";
import { uploadFile } from 'services/fileService';
import imageResizer from '../uploadFile/ImageResizer';
import { getByUsername } from 'services/userService';
import { emailRegex, phoneRegex } from '../stores/FieldRegexs';

const NewStore = () => {
    const { data: session, status } = useSession();
    const [firstLoad, setFirstLoad] = useState(true);
    //Datos de texto
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [schedule, setSchedule] = useState('');
    const [address, setAddress] = useState('');

    //Datos para propietarios
    const [newOwner, setNewOwner] = useState('');
    const [ownerIds, setOwnerIds] = useState([]);

    //Datos para endpoints
    const [file, setFile] = useState();

    //Imagenes a visualizar
    const [resizedImageUrl, setResizedImageUrl] = useState();

    //Errores
    const [errName, setErrName] = useState(false);
    const [errDesc, setErrDesc] = useState(false);
    const [errAddr, setErrAdd] = useState(false);
    const [errEmail, setErrEmail] = useState(false);
    const [errSch, setErrSch] = useState(false);
    const [errTel, setErrTel] = useState(false);
    const [errImg, setErrImg] = useState(false);
    const [errNewOwn, setErrNewOwn] = useState(false)   //Cuando se intenta agregar un propietario inexistente
    const [errRepOwn, setErrRepOwn] = useState(false)   //Cuando el usuario ya se ingreso a la lista
    const [errOwn, setErrOwn] = useState(false);        //Cuando no se agrego ningun propietario al comercio

    const handleFormSubmit = async (event) => {
        event.preventDefault(); // Prevent the form from submitting
        let errorDetected = false;

        //Si hay algun error, se muestra en pantalla
        if (!name.trim()) {
            errorDetected = true;
            setErrName(true);
        }
        if (!description.trim()) {
            errorDetected = true;
            setErrDesc(true);
        }

        if (!address.trim()) {
            errorDetected = true;
            setErrAdd(true)
        }

        if (!phoneRegex.test(telephone.trim())) {
            errorDetected = true;
            setErrTel(true)
        }

        if (!emailRegex.test(email.trim())) {
            errorDetected = true;
            setErrEmail(true);
        }

        if (!schedule.trim()) {
            errorDetected = true;
            setErrSch(true)
        }

        if (!file) {
            errorDetected = true;
            setErrImg(true)
        }

        if (ownerIds.length == 0) {
            errorDetected = true;
            setErrOwn(true);
        }

        //De lo contrario, continuamos
        if (!errorDetected) {
            saveNewStore();
        }

    };

    //Guarda la tienda con su logo
    const saveNewStore = async () => {
        const newStore = {
            "name": name,
            "description": description,
            "telephone": telephone,
            "email": email,
            "schedule": schedule,
            "address": address
        };
        const response = await saveStore(newStore, {
            params: {
                "ownerIds": ownerIds.join(',')
            }
        });
        const folder = response.id;
        uploadFile("commerce", file, folder)
    };

    //Selecciona una imagen a cargar  
    const handleImageUpload = async (event) => {
        const resizedData = await imageResizer(event);
        setFile(resizedData.fileData);
        setResizedImageUrl(resizedData.returnedURL);
    };

    const handleAddUser = async () => {
        const owner = await getByUsername(newOwner.trim());
        const ownerId = owner?.username;
        if (ownerId) {

            if (!ownerIds.some(existingId => existingId === ownerId)) {
                const updatedIds = [...ownerIds, ownerId];
                setOwnerIds(updatedIds);
                setErrOwn(false);
                setNewOwner("");
            } else {
                setNewOwner("");
                setErrRepOwn(true)
            }
        }
        else {
            console.log("I went here...")
            setNewOwner("");
            setErrNewOwn(true);
        }
    }

    const editNewOwner = (value) => {
        setErrNewOwn(false);
        setErrRepOwn(false);
        setNewOwner(value);
    }

    const cleanOwners = () => {
        setErrNewOwn(false);
        setErrRepOwn(false);
        setOwnerIds([]);
    }

    useEffect(() => {
        if (firstLoad && !(status === 'loading')) {
            const userIsntAdmin = !session.user.role.includes('ADMIN');
            if (userIsntAdmin) {
                setOwnerIds([session.user.username]);
            }
            setFirstLoad(false);
        }
    }, [session, firstLoad, setOwnerIds]);

    useEffect(() => {
        if (name.trim()) setErrName(false);
    }, [name]);

    useEffect(() => {
        if (description.trim()) setErrDesc(false);
    }, [description]);

    useEffect(() => {
        if (address.trim()) setErrAdd(false);
    }, [address]);

    useEffect(() => {
        if (schedule.trim()) setErrSch(false);
    }, [schedule]);

    useEffect(() => {
        if (phoneRegex.test(telephone.trim())) setErrTel(false);
    }, [telephone]);

    useEffect(() => {
        if (!emailRegex.test(!email.trim())) setErrEmail(false);
    }, [email]);

    useEffect(() => {
        if (file) setErrImg(false);
    }, [file]);

    return (
        <div className="flex justify-center">
            <form className="w-full max-w-lg flex flex-wrap -mx-3 mb-6"
                onSubmit={handleFormSubmit}
            >
                {/*NOMBRE*/}
                <div className="w-full">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3"
                        htmlFor="name">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        placeholder="Nombre del comercio"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errName && <p className={`text-red-500 text-xs italic`}>
                        "El campo 'Nombre' es requerido."
                    </p>}
                </div>

                {/*DESCRIPCION*/}
                <div className="w-full">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3"
                        htmlFor="description">Descripci&oacute;n:</label>
                    <input
                        type="text"
                        id="description"
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        placeholder="Descripci&oacute;n del comercio"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {errDesc && <p className={`text-red-500 text-xs italic`}>
                        "El campo 'Descripci&oacute;n' es requerido."
                    </p>}
                </div>

                {/*DIRECCION*/}
                <div className="w-full">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3"
                        htmlFor="address">Dirección:</label>
                    <input
                        type="text"
                        id="address"
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        placeholder="Direcci&oacute;n del comercio"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    {errAddr && <p className={`text-red-500 text-xs italic`}>
                        "El campo 'Dirección' es requerido."
                    </p>}
                </div>

                {/*TELEFONO*/}
                <div className="w-full">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold"
                        htmlFor="telephone">Tel&eacute;fono:</label>
                    <p className="text-xs text-gray-400">Podrá ser utilizado como contacto de WhatsApp</p>
                    <div className="flex items-center mb-3">
                    <span className="absolute text-gray-500 pl-3">+54 9</span>
                    <input
                        type="text"
                        id="telephone"
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 pl-16 pr-3 leading-tight focus:outline-none focus:bg-white"
                        placeholder="Ejemplo: 2314123456"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        />
                    </div>
                    {errTel && <p className={`text-red-500 text-xs italic`}>
                        "Ingrese su número sin el 0 y sin el 15, y sin guiones en el medio"
                    </p>}
                </div>

                {/*HORARIOS*/}
                <div className="w-full">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3"
                        htmlFor="schedule">Horarios:</label>
                    <input
                        type="text"
                        id="schedule"
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        placeholder="Horarios de apertura"
                        value={schedule}
                        onChange={(e) => setSchedule(e.target.value)}
                    />
                    {errSch && <p className={`text-red-500 text-xs italic`}>
                        "Por favor, ingrese los horarios de apertura."
                    </p>}
                </div>

                {/*EMAIL*/}
                <div className="w-full">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3"
                        htmlFor="email">E-mail:</label>
                    <input
                        type="text"
                        id="email"
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        placeholder="Direcci&oacute;n de correo electr&oacute;nico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errEmail && <p className={`text-red-500 text-xs italic`}>
                        "E-mail invalido. Verifique este campo"
                    </p>}
                </div>

                {/*PROPIETARIOS*/}
                <div className="w-full mb-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3"
                        htmlFor="ownerIds">Propietarios:</label>
                    <input
                        type="text"
                        id="newOwner"
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                        placeholder="Ingrese el nombre de usuario de un propietario"
                        value={newOwner}
                        onChange={(e) => editNewOwner(e.target.value)}
                    />
                    <div>
                        <div className="flex items-center">
                            <input
                                className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-2 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
                                value="Añadir propietario"
                                type="button"
                                id="addOwner"
                                onClick={handleAddUser}
                            />
                            <input
                                className={`${ownerIds.length === 0 ? "hidden" : ""
                                    } ml-2 inline-flex justify-center rounded-md border border-transparent shadow-sm px-2 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm`}
                                value="Limpiar lista"
                                type="button"
                                id="clean"
                                onClick={cleanOwners}
                            />
                        </div>
                        {ownerIds && ownerIds.map((owner, index) => (
                            <p className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-1 py-1 bg-gray-400 text-base font-medium text-black hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:w-auto sm:text-sm mr-1 my-2"
                                key={index}>{owner}</p>
                        ))}
                    </div>

                    {errNewOwn && <p className={`text-red-500 text-xs italic`}>
                        "Error: el usuario ingresado no existe"
                    </p>}
                    {errRepOwn && <p className={`text-red-500 text-xs italic`}>
                        "Error: el usuario ya fue ingresado"
                    </p>}
                    {errOwn && <p className={`text-red-500 text-xs italic`}>
                        "Debe escoger al menos un propietario para su comercio"
                    </p>}
                </div>

                {/*LOGO*/}
                <div className="w-full block">
                    <label className="block mb-3 uppercase tracking-wide text-gray-700 text-xs font-bold "
                        htmlFor="description">Logo:</label>
                    <div>
                        <label htmlFor="upload" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm">
                            Subir imagen
                        </label>
                        <input
                            type="file"
                            id="upload"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e)}
                            style={{ display: 'none' }}
                        />
                        <p className={`text-blue-500 text-xs italic mt-1`}>
                            El logo debe ser de 368x368 en formato .jpg o .png. <u>De no ser asi, sera redimensionada.</u>
                        </p>
                        {resizedImageUrl && <img className="w-1/2" src={resizedImageUrl} alt="Resized" />}
                    </div>
                    {errImg && <p className={`text-red-500 text-xs italic`}>
                        "Se requiere que escoja un logotipo."
                    </p>}
                </div>

                <button type="submit" className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8`}>
                    Guardar
                </button>
            </form>
        </div>
    );
};

export default NewStore;
