import StoreHeading from "@/components/StoreHeading";
import {useState} from "react";
import {save} from "../../services/userService";
import SEO from "@/components/SEO";

const Create = () => {


    const [enable, setEnable] = useState(false)

    const [user, setUser] = useState({
        name: "",
        lastName: "",
        cardId: "",
        password: "",
        cuil: "",
        phone: "",
        email: ""
    })


    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
        validate();
    }

    const [errorMessages, setErrorMessages] = useState({
        name: "",
        lastName: "",
        email: "",
        cuil: "",
        password: ""
    });

    function validate() {
        let isValidEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(user.email);
        let isValidPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{7,16}$/i.test(user.password);  
        let isValidDNIoCUIL = /^[0-9.-]+$/i.test(user.cuil);  
    
        let errors = {
            name: "",
            lastName: "",
            email: "",
            cuil: "",
            password: ""
        };
    
        if (!user.name.trim()) {
            errors.name = "Complete su Nombre.";
        }
    
        if (!user.lastName.trim()) {
            errors.lastName = "Complete su Apellido.";
        }
    
        if (!isValidEmail) {
            errors.email = "Ingrese Una Direccion De Correo Electronico.";
        }
    
        if (!isValidDNIoCUIL) {
            errors.cuil = "Complete su DNI o CUIL.";
        }
    
        if (!isValidPassword) {
            errors.password = "Complete su Contraseña (de 8 a 16 caracteres al menos 1 mayúscula y 1 dígito).";
        }
        console.log(isValidPassword);
        if (user.name && user.lastName  && isValidDNIoCUIL && isValidPassword && isValidEmail){
            setEnable(true)  
        
        }

        else {
            setErrorMessages(errors); // Actualiza los mensajes de error solo si se intentó enviar el formulario
        }
    }

    

     

    const submit = (e) => {
        e.preventDefault();
        validate(); // Ejecuta la validación
        if (enable) {
            save(user).then((result) => {
                if (result.status === 202) {
                    window.location.href = '/login'
                }
            });
        }
    }

    return (
        <>
            <SEO title="Crear un nuevo usuario" />
            <StoreHeading title="Registrarse"/>

            <div className="min-h-full flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">

                <form className="w-full max-w-lg">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="grid-first-name">
                                Nombre
                            </label>
                            <input
                                autocomplete="off" 
                                onChange={handleChange}
                                name={"name"}
                                value={user.name}
                                className="appearance-none block w-full capitalize bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                type="text"
                                placeholder="Nombre"/>
                                {
                                   user.name && user.name.length > 3-1
                                   ?
                                   <></>     
                                   :
                                   errorMessages.name && <p className="text-red-500 text-xs italic">{errorMessages.name}</p>
                                   
                                }
                                
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="grid-last-name">
                                Apellido
                            </label>
                            <input
                                autocomplete="off" 
                                onChange={handleChange}
                                name={"lastName"}
                                value={user.lastName}
                                className="appearance-none block capitalize w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                type="text" 
                                placeholder="Ingrese su Apellido"/>
                                {
                                   user.lastName && user.lastName.length > 3-1
                                   ?
                                   <></>     
                                   :
                                   errorMessages.lastName && <p className="text-red-500 text-xs italic">{errorMessages.lastName}</p>
                                   
                                }

                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="grid-password">
                                E-mail
                            </label>
                            <input 
                                autocomplete="off" 
                                onChange={handleChange} 
                                value={user.email}
                                name={"email"}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                type="text" 
                                placeholder="Ingrese un e-mail"/>  
                                {
                                   user.email
                                   ?
                                   <></>     
                                   :
                                   errorMessages.email && <p className="text-red-500 text-xs italic">{errorMessages.email}</p>
                                   
                                }
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="grid-password">
                                DNI ó CUIL
                             </label>
                            <input 
                                autocomplete="off"
                                onChange={handleChange} 
                                value={user.cuil}
                                name={"cuil"}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                type="text"  
                                placeholder="Ingrese su DNI &oacute; CUIL"/> 
                                {
                                   user.cuil && user.cuil.length > 8-1
                                   ?
                                   <></>     
                                   :
                                   errorMessages.cuil && <p className="text-red-500 text-xs italic">{errorMessages.cuil}</p>
                                   
                                }
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="grid-password">
                                Contraseña 
                            </label>
                            <input 
                                autocomplete="off"
                                onChange={handleChange} 
                                value={user.password}
                                name={"password"}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                type="text" 
                                placeholder="Ingrese una contraseña"/> 
                                {

                                   errorMessages.password && <p className="text-red-500 text-xs italic">{errorMessages.password}</p>
                                   
                                }
                        </div>
                    </div>  

                    <div
                        className="grid justify-items-center ">               
                            <button type="submit" onClick={submit}
                                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded `}>
                                Listo !
                            </button> 
                    </div>
                </form>

            </div>

        </>
    )
}

export default Create