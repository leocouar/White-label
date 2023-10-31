import { useDropzone } from "react-dropzone";
import { NotificationContainer,NotificationManager } from "react-notifications";
import useForm from "../../hooks/useForm";
import { useState, useMemo } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage} from '@fortawesome/free-solid-svg-icons';
import * as recipeService from 'services/recipeService'

const UploadFile = ({ isOpen, setIsOpen, folder }) => {
    const [openUploadFile, setOpenUploadFile] = useState(false);
    const initialForm = useMemo(() => ({
        cuil: "",
        contact: ""
    })
    );
    const validationsForm = (form) => {
        let errors = {};

        if (!form.cuil.trim()) {
            errors.cuil = "El campo 'cuil' es requerido";
        }

        if (!form.contact.trim()) {
            errors.contact = "El campo 'Teléfono' es requerido";
        }

        return errors;
    };

    const {
        form,
        errors,
        handleChange,
        handleBlur,
        handleSubmit, } = useForm(initialForm, validationsForm);


    const [file, setFile] = useState();
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        accept: 'image/jpeg, image/png, image/jpg',
        onDrop: acceptedFiles => {
            setFile(acceptedFiles[0]);
        }
    });

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    const handleShowModal = (isClose) => {
        setIsOpen(isClose)
    }

    function upload() {
        recipeService.uploadRecipe(form,file).then(
            NotificationManager.info('Receta Enviada, en la brevedad se enviara el presupuesto', 'Envio Exitoso', 4000,  () => {
            })
        )
        setIsOpen(false)
    };

    return (

        isOpen === false
            ?
            <></>
            :

            <div className="fixed z-40 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog"
                aria-modal="true">
                <div className="flex items-end justify-center m min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                        aria-hidden="true"></div>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true">&#8203;</span>

                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">

                        <div className="flex px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

                            <div className="sm:flex sm:items-start">
                                <div
                                    className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                        Seleccione una imagen
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">

                                            <section className="container">
                                                <div {...getRootProps({ className: 'dropzone p-10 h-auto w-40 rounded bg-blue-200' })}>
                                                    <input {...getInputProps()} />
                                                    <p className="m-auto text-center text-gray-700 items-center">
                                                    <FontAwesomeIcon icon={faImage}/>
                                                    </p>
                                                    <p>Arrastre Receta aqui</p>
                                                </div>

                                                <aside>
                                                    <h4>Archivo: </h4>
                                                    <div class="border-2 border-dashed border-slate mx-1">
                                                        <ul>{files}</ul>
                                                    </div>
                                                </aside>
                                                

                                            </section>

                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex mx-10 justify-center">
                                <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="cuil">
                                                CUIL
                                            </label>
                                            <input
                                                autoComplete="off"
                                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                id="cuil" type="text"
                                                placeholder="Número de CUIL"
                                                name="cuil"
                                                value={form.cuil}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                            />
                                            {errors.cuil && <p className={`text-red-500 text-xs italic`}>{errors.cuil}</p>}
                                        </div>
                                        <div className="w-full">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3"
                                                htmlFor="contact">
                                                Teléfono de contacto
                                            </label>
                                            <textarea
                                                autoComplete="off"
                                                className="resize-none appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="contact" placeholder="xxxx-xxxxxx" name="contact" rows="3"
                                                value={form.contact}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                            />
                                            {errors.contact && <p className={`text-red-500 text-xs italic`}>{errors.contact}</p>}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button type="button" onClick={upload}
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                                Guardar
                            </button>
                            <button type="button" onClick={() => handleShowModal(false)}
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default UploadFile;