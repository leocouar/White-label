import { useState, useMemo } from "react";
import UploadFile from "@/components/recipes/UploadFile";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faEdit, faTrash, faTag, faInfo } from '@fortawesome/free-solid-svg-icons';


const NewReceipe = () => {
    const [openUploadFile, setOpenUploadFile] = useState(false);


    return (
        <button className="w-64 m-2">
            <div>
                <div>
                    <div
                        aria-label="upload-images"
                        className="bg-green-500 text-gray-800 w-full h-16  font-primary font-semibold flex justify-center items-center group rounded-md cursor-pointer"
                        onClick={() => setOpenUploadFile(true)}>
                        <p className="m-auto group-hover:hidden text-center text-lg">¡Cargue sus recetas aquí!</p>
                        <FontAwesomeIcon icon={faCloudUploadAlt} className="hidden w-10 m-auto group-hover:block" />
                    </div>
                </div>
                <UploadFile
                    isOpen={openUploadFile}
                    setIsOpen={setOpenUploadFile}

                />

            </div>
        </button>)
}

export default NewReceipe;