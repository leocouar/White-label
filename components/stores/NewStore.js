import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/client";
import { saveStore } from "/services/storeService";
import { uploadFile } from "/services/fileService";


const NewStore = () => {
    const [session, loading] = useSession();
    //Datos de texto
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');


    //Datos para endpoints
    const [file, setFile] = useState();

    //Imagenes a visualizar
    const [selectedImage, setSelectedImage] = useState(null);

    //Errores
    const [errName, setErrName] = useState(false);
    const [errDesc, setErrDesc] = useState(false);
    const [errImg, setErrImg] = useState(false);

    const handleFormSubmit = (event) => {
        event.preventDefault(); // Prevent the form from submitting

        //Si hay algun error, se muestra en pantalla
        if (!name.trim()) {
            setErrName(true);
        }
        if (!description.trim()) {
            setErrDesc(true);
        }
        if (!file) {
            setErrImg(true)
        }

        //De lo contrario, continuamos
        if (name.trim() && description.trim() && file) {
            saveNewStore();
        }
    };

    //Guarda la tienda con su logo
    const saveNewStore = async () => {
        const newStore = {
            "name": name,
            "description": description,
            "owner": session?.user?.username
        };

        const response = await saveStore(newStore); // Assuming saveStore returns a promise
        const folder = response.id;
        uploadFile("store", file, folder)
    };


    //Selecciona una imagen a cargar
    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        setFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            setSelectedImage(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    //Carga la imagen en pantalla guardandola en la cache
    const handleImageLoad = (event) => {
        const img = event.target;
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        try {
            localStorage.setItem('cachedImage', canvas.toDataURL());
        } catch (e) {
            console.error('Error saving image to cache:', e);
        }
    };

    useEffect(() => {
        if (name.trim()) setErrName(false);
    }, [name]);

    useEffect(() => {
        if (description.trim()) setErrDesc(false);
    }, [description]);

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
                        placeholder="Nombre del Producto"
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
                        placeholder="Descripci&oacute;n del Producto"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {errDesc && <p className={`text-red-500 text-xs italic`}>
                        "El campo 'Descripci&oacute;n' es requerido."
                    </p>}
                </div>

                {/*LOGO*/}
                <div className="w-full">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3"
                        htmlFor="description">Logo:</label>
                    <div>
                        <input type="file" accept="image/*" onChange={handleImageSelect} />
                        {selectedImage && (
                            <div>
                                <img
                                    src={selectedImage}
                                    alt="Selected"
                                    onLoad={handleImageLoad}
                                    style={{ display: 'block', maxWidth: '100%', maxHeight: '400px' }}
                                />
                            </div>
                        )}
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
