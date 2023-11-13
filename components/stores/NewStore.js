import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/client";
import { saveStore } from "/services/storeService";
import { uploadFile } from "/services/fileService";

const NewStore = () => {
    const [session, loading] = useSession();
    //Datos de texto
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [address, setAddress] = useState('');

    //Datos para endpoints
    const [file, setFile] = useState();

    //Imagenes a visualizar
    const [resizedImageUrl, setResizedImageUrl] = useState(null);

    //Errores
    const [errName, setErrName] = useState(false);
    const [errDesc, setErrDesc] = useState(false);
    const [errAddr, setErrAdd] = useState(false);
    const [errEmail, setErrEmail] = useState(false);
    const [errTel, setErrTel] = useState(false);
    const [errImg, setErrImg] = useState(false);

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const phoneRegex = /^\+?[0-9]+$/;

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

        if (!file) {
            errorDetected = true;
            setErrImg(true)
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
            "address": address,
            "owners": [{
                "username": session?.user?.username
            }]
        };
        const response = await saveStore(newStore);
        const folder = response.id;
        uploadFile("store", file, folder)
    };

    //Selecciona una imagen a cargar  
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (upload) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Set the new width and height for the image
                const sides = 368;

                // Draw the image with the new dimensions
                canvas.width = sides;
                canvas.height = sides;
                ctx.drawImage(img, 0, 0, sides, sides);

                // Convert the canvas to a Blob
                canvas.toBlob((blob) => {
                    const type = file.type === 'image/jpeg' ? 'image/jpeg' : 'image/png';
                    const resizedImageFile = new File([blob], file.name, {
                        type: type,
                        lastModified: Date.now(),
                    });

                    // Set the resized file in state
                    setFile(resizedImageFile);

                    // Convert Blob to data URL
                    const imageUrl = URL.createObjectURL(blob);
                    setResizedImageUrl(imageUrl);
                }, 'image/jpeg');
            };
            img.src = upload.target.result;
        };
        reader.readAsDataURL(file);
    };

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
        if (phoneRegex.test(telephone.trim())) setErrTel(false);
    }, [telephone]);

    useEffect(() => {
        if (!emailRegex.test(!email.trim())) setErrEmail(false);
    }, [email]);

    useEffect(() => {
        console.log(errEmail)
    })



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
                        placeholder="Direcci&oacute;n del comercio..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    {errAddr && <p className={`text-red-500 text-xs italic`}>
                        "El campo 'Dirección' es requerido."
                    </p>}
                </div>

                {/*TELEFONO*/}
                <div className="w-full">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3"
                        htmlFor="telephone">Tel&eacute;fono:</label>
                    <input
                        type="tel"
                        id="telephone"
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        placeholder="Número de teléfono"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                    />
                    {errTel && <p className={`text-red-500 text-xs italic`}>
                        "Telefono invalido"
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
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                        />
                        <p className={`text-blue-500 text-xs italic`}>
                            El logo debe ser de 368x368 en formato .jpg o .png. <u>De no ser asi, sera redimensionada.</u>
                        </p>
                        {resizedImageUrl && <img src={resizedImageUrl} alt="Resized" />}
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
