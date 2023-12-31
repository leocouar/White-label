import axios from 'axios';

export async function uploadFile(type, file, folder, redirect = true){
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);
    axios.post(`${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/file/upload`, formData)
        .then(resp => {
            if (redirect)
                return window.location.href = '/' + type + '/' + folder
        }).catch(error => {
            console.log(error);
        });

};