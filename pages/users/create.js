import StoreHeading from "@/components/StoreHeading";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { save } from "../../services/userService";
import SEO from "@/components/SEO";
import { useRouter } from "next/router";
import { emailRegex, phoneRegex } from "@/components/stores/FieldRegexs";
import PhoneInputFields from "@/components/users/PhoneInput";
import { passwrdRegex, dniRegex } from "@/components/stores/FieldRegexs";
import availableRoles from "@/components/users/ListOfRoles";
import { handleChangePass, PasswordManagement } from "@/components/users/PasswordControl";

const Create = () => {
    const { data: session, status } = useSession();
    const [failedSave, setFailedSave] = useState(false);
    const router = useRouter();
    const [enable, setEnable] = useState(false)
    const [user, setUser] = useState({
        name: "",
        lastName: "",
        password: "",
        cuit: "",
        phone: "",
        city: "",
        direction: "",
        role: ""
    });
    const [role, setRole] = useState("");

    const [passwrdControl, setPasswrdControl] = useState({
        new: "",
        repeat: ""
    });
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

    const handleChangeRole = async (e) => {
        const role = e.target.value;
        await setRole(role);
    }

    useEffect(() => {
        if (failedSave) {
            validate();
        }
    }, [user, failedSave]);

    const handleBlur = () => {
        if (failedSave) validate();
    }

    const [errName, setErrName] = useState(false);
    const [errLastN, setErrLastN] = useState(false);
    const [errUsername, setErrUsername] = useState(false);
    const [errFormatUsername, setErrFormatUsername] = useState(false);
    const [errAddr, setErrAdd] = useState(false);
    const [errTel, setErrTel] = useState(false);
    const [errFormatTel, setErrFormatTel] = useState(false)
    const [errCuit, setErrCuit] = useState(false);
    const [errFormatCuit, setErrFormatCuit] = useState(false);
    const [errCity, setErrCity] = useState(false);
    const [errPass, setErrPass] = useState(false);
    const [errFormatPass, setErrFormatPass] = useState(false);
    const [errRepPass, setErrRepPass] = useState(false);
    const [errMismatch, setErrMismatch] = useState(false);
    const [errRole, setErrRole] = useState(false);

    const validate = () => {
        let errorDetected = false;

        const validations = [
            { check: () => !user.name.trim(), setErr: setErrName },
            { check: () => !user.lastName.trim(), setErr: setErrLastN },
            { check: () => !user.username.trim(), setErr: setErrUsername },
            { check: () => user.username && !emailRegex.test(user.username), setErr: setErrFormatUsername },
            { check: () => !user.phone.trim(), setErr: setErrTel },
            { check: () => user.phone && !phoneRegex.test(user.phone), setErr: setErrFormatTel },
            { check: () => !user.cuit, setErr: setErrCuit },
            { check: () => user.cuit && !dniRegex.test(user.cuit), setErr: setErrFormatCuit },
            { check: () => !user.city.trim(), setErr: setErrCity },
            { check: () => !user.direction.trim(), setErr: setErrAdd },
            { check: () => !user.role.trim(), setErr: setErrRole },
            { check: () => !passwrdControl.new.trim(), setErr: setErrPass },
            { check: () => passwrdControl.new && !passwrdRegex.test(passwrdControl.new), setErr: setErrFormatPass },
            { check: () => !passwrdControl.repeat.trim(), setErr: setErrRepPass },
            { check: () => passwrdControl.new !== passwrdControl.repeat, setErr: setErrMismatch },
            { check: () => !role.trim(), setErr: setErrRole }
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

    //A partir de ahora se sube un usuario con rol en lugar de un usuario solitario.
    const submit = (e) => {
        e.preventDefault();
        const errorDetected = validate();
        if (!errorDetected) {
            const userUpload = {
                role: role,
                user: user
            }
            save(userUpload).then((result) => {
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
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password">
                                E-mail*
                            </label>
                            <input
                                autocomplete="off"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={user.username}
                                name={"username"}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                type="text"
                                placeholder="Ingrese su e-mail"
                            />
                            {errUsername && <p className="text-red-500 text-xs italic">
                                Complete su correo electronico.
                            </p>}
                            {errFormatUsername && <p className="text-red-500 text-xs italic">
                                El formato del correo electronico es incorrecto.
                            </p>}
                        </div>
                    </div>
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
                                DNI ó CUIL*
                            </label>
                            <input
                                autocomplete="off"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={user.cuit}
                                name={"cuit"}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                type="text"
                                placeholder="Ingrese su DNI &oacute; CUIL"
                            />
                            {errCuit && <p className="text-red-500 text-xs italic">
                                Ingrese su CUIL o DNI.
                            </p>}
                            {errFormatCuit && <p className="text-red-500 text-xs italic">
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
                    {session?.user?.role?.includes('ADMIN') &&
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="grid-password">
                                    Rol*:
                                </label>
                                <select value={user.role} onChange={handleChange} name="role" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="role">
                                    <option disabled={true} value="">Seleccionar</option>
                                    {
                                        availableRoles.map(role => (
                                            <option value={role.value}>{role.name}</option>
                                        ))
                                    }
                                </select>
                                {errRole && <p className="text-red-500 text-xs italic">
                                    Escoja un rol de la lista por favor.
                                </p>}
                            </div>
                        </div>

                    }
                    <PasswordManagement
                        passwrdControl={passwrdControl}
                        setPasswrdControl={setPasswrdControl}
                        onChange={handleChangePass}
                        onBlur={handleBlur}
                        errPass={errPass}
                        errFormatPass={errFormatPass}
                        errRepPass={errRepPass}
                        errMismatch={errMismatch}
                    />
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