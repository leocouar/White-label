import StoreHeading from "@/components/StoreHeading";
import { useState, useEffect } from "react";
import { save } from "../../services/userService";
import SEO from "@/components/SEO";
import { useRouter } from "next/router";
import { emailRegex, phoneRegex } from "@/components/stores/FieldRegexs";
import PhoneInputFields from "@/components/users/PhoneInput";
import { passwrdRegex, dniRegex } from "@/components/stores/FieldRegexs";

const Create = () => {
    const [failedSave, setFailedSave] = useState(false);
    const router = useRouter();
    const [enable, setEnable] = useState(false)
    const [user, setUser] = useState({
        name: "",
        lastName: "",
        password: "",
        cuil: "",
        phone: "",
        city: "",
        direction: "",
        email: ""
    })

    const [passwrdControl, setPasswrdControl] = useState({
        new: "",
        repeat: ""
    })
    const [telephone, setTelephone] = useState("");

    useEffect(() => {
        setUser(prevUser => ({
            ...prevUser,
            phone: telephone
        }));
    }, [telephone]);

    const handleChange = async (e) => {
        await setUser(prevUser => ({
            ...prevUser,
            [e.target.name]: e.target.value,
        }));
    }

    useEffect(() => {
        if (failedSave) {
            validate();
        }
    }, [user, passwrdControl, failedSave]);
    

    const handleChangePass = async (e) => {
        await setPasswrdControl(prevPasswrdControl => ({
            ...prevPasswrdControl,
            [e.target.name]: e.target.value,
        }));
    }

    const handleBlur = () => {
        if (failedSave) validate();
    }

    const [errName, setErrName] = useState(false);
    const [errLastN, setErrLastN] = useState(false);
    const [errEmail, setErrEmail] = useState(false);
    const [errFormatEmail, setErrFormatEmail] = useState(false);
    const [errAddr, setErrAdd] = useState(false);
    const [errTel, setErrTel] = useState(false);
    const [errFormatTel, setErrFormatTel] = useState(false)
    const [errCuil, setErrCuil] = useState(false);
    const [errFormatCuil, setErrFormatCuil] = useState(false);
    const [errCity, setErrCity] = useState(false);
    const [errPass, setErrPass] = useState(false);
    const [errFormatPass, setErrFormatPass] = useState(false);
    const [errRepPass, setErrRepPass] = useState(false);
    const [errMismatch, setErrMismatch] = useState(false);

    const validate = () => {
        let errorDetected = false;

        const validations = [
            { check: () => !user.name.trim(), setErr: setErrName },
            { check: () => !user.lastName.trim(), setErr: setErrLastN },
            { check: () => !user.email.trim(), setErr: setErrEmail },
            { check: () => user.email && !emailRegex.test(user.email), setErr: setErrFormatEmail },
            { check: () => !user.phone.trim(), setErr: setErrTel },
            { check: () => user.phone && !phoneRegex.test(user.phone), setErr: setErrFormatTel },
            { check: () => !user.cuil, setErr: setErrCuil },
            { check: () => user.cuil && !dniRegex.test(user.cuil), setErr: setErrFormatCuil },
            { check: () => !user.city.trim(), setErr: setErrCity },
            { check: () => !user.direction.trim(), setErr: setErrAdd },
            { check: () => !passwrdControl.new.trim(), setErr: setErrPass },
            { check: () => passwrdControl.new && !passwrdRegex.test(passwrdControl.new), setErr: setErrFormatPass},
            { check: () => !passwrdControl.repeat.trim(), setErr: setErrRepPass },
            { check: () => passwrdControl.new !== passwrdControl.repeat, setErr: setErrMismatch }
        ];

        validations.forEach(validation => {
            const errorConditionMet = validation.check();
            if (errorConditionMet) {
                errorDetected = true;
                validation.setErr(true);
            } else {
                validation.setErr(false);
            }
        });

        return errorDetected;
    };

    const onCancel = () => {
        router.push("/users")
    }

    const submit = (e) => {
        e.preventDefault();
        const errorDetected = validate();
        if (!errorDetected) {
            save(user).then((result) => {
                if (result.status === 202) {
                    window.location.href = '/users'
                }
            });
        } else {
            setFailedSave(true);
        }
    }

    return (
        <>
            <SEO title="Crear un nuevo usuario" />
            <StoreHeading title="Registrarse" />

            <div className="min-h-full flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">

                <form onSubmit={submit} className="w-full max-w-lg">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-first-name">
                                Nombre*
                            </label>
                            <input
                                autocomplete="off"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name={"name"}
                                value={user.name}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                type="text"
                                placeholder="Ingrese su nombre"
                            />
                            {errName && <p className="text-red-500 text-xs italic">
                                Complete su nombre.
                            </p>}
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-last-name">
                                Apellido*
                            </label>
                            <input
                                autocomplete="off"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name={"lastName"}
                                value={user.lastName}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                type="text"
                                placeholder="Ingrese su apellido"
                            />
                            {errLastN && <p className="text-red-500 text-xs italic">
                                Complete su apellido.
                            </p>}

                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password">
                                E-mail*
                            </label>
                            <input
                                autocomplete="off"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={user.email}
                                name={"email"}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                type="text"
                                placeholder="Ingrese su e-mail"
                            />
                            {errEmail && <p className="text-red-500 text-xs italic">
                                Complete su correo electronico.
                            </p>}
                            {errFormatEmail && <p className="text-red-500 text-xs italic">
                                El formato del correo electronico es incorrecto.
                            </p>}
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password">
                                DNI ó CUIL*
                            </label>
                            <input
                                autocomplete="off"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={user.cuil}
                                name={"cuil"}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                type="text"
                                placeholder="Ingrese su DNI &oacute; CUIL"
                            />
                            {errCuil && <p className="text-red-500 text-xs italic">
                                Ingrese su CUIL o DNI.
                            </p>}
                            {errFormatCuil && <p className="text-red-500 text-xs italic">
                                Ingrese un CUIL/DNI valido.
                            </p>}
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <PhoneInputFields
                                telephone={telephone}
                                setTelephone={setTelephone}
                            ></PhoneInputFields>
                            {errTel && <p className="text-red-500 text-xs italic">
                                Ingrese un numero de teléfono.
                            </p>}
                            {errFormatTel && <p className="text-red-500 text-xs italic">
                                Ingrese un teléfono apropiado
                            </p>}
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password">
                                Ciudad*
                            </label>
                            <input
                                autocomplete="off"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={user.city}
                                name={"city"}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                type="text"
                                placeholder="Ingrese su cuidad"
                            />
                            {errCity && <p className="text-red-500 text-xs italic">
                                Complete su ciudad.
                            </p>}
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password">
                                Direcci&oacute;n*
                            </label>
                            <input
                                autocomplete="off"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={user.direction}
                                name={"direction"}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                type="text"
                                placeholder="Ingrese su direcci&oacute;n"
                            />
                            {errAddr && <p className="text-red-500 text-xs italic">
                                Complete su dirección.
                            </p>}
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password">
                                C&oacute;digo postal
                            </label>
                            <input
                                autocomplete="off"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={user.postal}
                                name={"postal"}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                type="text"
                                placeholder="Ingrese su código postal."
                            />
                        </div>
                    </div>
                    <div className="flex  flex-wrap -mx-3 mb-6">
                        <div className="w-full  md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password">
                                Contraseña*
                            </label>
                            <input
                                autocomplete="off"
                                onChange={handleChangePass}
                                onBlur={handleBlur}
                                value={passwrdControl.new}
                                name={"new"}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                type="password"
                                placeholder="Ingrese una contraseña"
                            />
                            {errPass && <p className="text-red-500 text-xs italic">
                                Ingrese una contraseña.
                            </p>}
                            {errFormatPass && <p className="text-red-500 text-xs italic">
                                Error: la contraseña no respeta las condiciones indicadas.
                            </p>}
                            {errMismatch && <p className="text-red-500 text-xs italic">
                                Las contraseñas no coinciden.
                            </p>}
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password">
                                Repita su contraseña*
                            </label>
                            <input
                                autocomplete="off"
                                onChange={handleChangePass}
                                onBlur={handleBlur}
                                value={passwrdControl.repeat}
                                name={"repeat"}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                type="password"
                                placeholder="Repita su contraseña"
                            />
                            {errRepPass && <p className="text-red-500 text-xs italic">
                                Repita su contraseña aqui por favor.
                            </p>}
                        </div>
                        <p className={`text-blue-500 text-xs italic mt-1 px-3`}>
                            8 a 16 caracteres al menos 1 mayúscula y 1 dígito
                        </p>
                    </div>

                    <div className="flex space-x-2 mt-8 justify-end">
                        <button type="button" className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded-md mr-2"
                            onClick={() => onCancel()}
                        >
                            Cancelar
                        </button>
                        <button type="submit" className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-md"
                        >
                            Finalizar
                        </button>
                    </div>
                </form>

            </div>

        </>
    )
}

export default Create