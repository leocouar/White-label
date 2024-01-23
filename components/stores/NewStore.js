import React, { useState, useEffect, useRef } from 'react';
import { useSession } from "next-auth/react";
import { saveStore } from "services/storeService";
import { uploadFile } from 'services/fileService';
import imageResizer from '../uploadFile/ImageResizer';
import { getByUsername } from 'services/userService';
import { emailRegex, phoneRegex } from '../stores/FieldRegexs';
import 'react-notifications/lib/notifications.css';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import PhoneInputFields from '../users/PhoneInput';

const NewStore = ({ users }) => {
    const { data: session, status } = useSession();
    const [firstLoad, setFirstLoad] = useState(true);
    const adminUserSel = useRef();

    //Datos de texto
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [schedule, setSchedule] = useState('');
    const [address, setAddress] = useState('');

    //Datos para propietarios
    const [newOwner, setNewOwner] = useState('');
    const [ownerIds, setOwnerIds] = useState([]);                   //Lista final de ids a entregar al backend
    const [userAdmin, setUserAdmin] = useState(null);

    useEffect(() => {
        if (session) {
            const userIsAdmin = session?.user?.role.includes("ADMIN");
            setUserAdmin(userIsAdmin);
        }
    }, [session])


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
        if (setErrName(!name.trim())) {
            errorDetected = true;
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
        try {
            const response = await saveStore(newStore, {
                params: {
                    "ownerIds": ownerIds.join(',')
                }
            });
            const folder = response.id;
            await uploadFile("commerce", file, folder)
        } catch (error) {
            NotificationManager.warning('El comercio: ' + '\"' + newStore.name + '\"' + ' ya existe', 'Error', 2000);
        }
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
                setNewOwner("");
            } else {
                setNewOwner("");
                setErrRepOwn(true)
            }
        }
        else {
            setNewOwner("");
            setErrNewOwn(true);
        }
    }


    const handleChangeOwners = (e) => {
        const value = e.target.value;

        if (value != "Seleccionar") {
            const selectedUserId = users.find(owner => owner.username === value).username;
            if (selectedUserId && !ownerIds.some(ownerId => ownerId === selectedUserId)) {
                const updatedIds = [...ownerIds, selectedUserId];
                setOwnerIds(updatedIds);
            }
            setErrOwn(false);
        }
    };

    const deleteOwner = (e) => {
        const value = e.target.value;
        const updatedDataOwnerIds =  ownerIds.filter(owner => owner !== value) ;
        setOwnerIds(updatedDataOwnerIds);
        const selectElement = adminUserSel.current;
        selectElement.value = selectElement.options[0].value;
    }


    const editNewOwner = (value) => {
        setErrNewOwn(false);
        setErrRepOwn(false);
        setNewOwner(value);
    }

    const cleanOwners = () => {
        setErrNewOwn(false);
        setErrRepOwn(false);
        if (ownerIds.length > 1) {
            const firstOwner = ownerIds[0];
            setOwnerIds([firstOwner]);
        }
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

    return <>
        <NotificationContainer />
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
                    <PhoneInputFields
                        telephone={telephone}
                        setTelephone={setTelephone}
                    ></PhoneInputFields>
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
                        htmlFor="ownerIds">Propietarios:
                    </label>
                    {userAdmin ?
                        <>
                            <select
                                onChange={handleChangeOwners}
                                ref={adminUserSel}
                                name={users.username}
                                value={users.username}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="owners"
                            >
                                <option value={null}>Seleccionar</option>
                                {users
                                    ? users.map(user => (
                                        <option key={user.username} value={user.username}>
                                            {user.name} ({user.username})
                                        </option>
                                    ))
                                    : <option>Propietarios</option>
                                }
                            </select>
                            <div className="flex grid grid-cols-4 gap-8 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight">
                                {
                                    ownerIds?.map((owner) => {
                                        return (
                                            <div className="flex w-32 justify-between mx-2 rounded shadow-xl bg-blue-500 text-white" key={owner}>
                                                <div className="flex w-3/4 m-auto text-xs p-2">{owner}</div>
                                                <button className="w-1/4 rounded-r bg-red-500 uppercase text-white h-full" onClick={e => { deleteOwner(e) }} value={owner}>x</button>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </>
                        :
                        <>
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

                        </>
                    }
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
    </>;
};

export default NewStore;
