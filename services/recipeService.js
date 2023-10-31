import axios from 'axios';

export async function uploadRecipe (form,file) {
    
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/recipes` ;
    try {
        let response = await axios.post(fetchUrl, form)
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", response.data.id);
        let fileresponse =await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/file/upload`,formData)
        return  fileresponse.data;
    } catch(error) {
            console.log(error);
            throw new Error("No se pudo cargar la receta")
        };

};