import axios from 'axios';

export async function uploadRecipe (form,file) {
    const formData = {
        "file": file,
        "recipe": form
    }
    console.log(formData);
    debugger
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/recipes` ;
    try {
        let response = await axios.post(fetchUrl, formData)
        return  response.data;
    } catch(error) {
            console.log(error);
            throw new Error("No se pudo cargar la receta")
        };

};