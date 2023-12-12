
import { findByID } from "services/storeService";
import { getOwnerIds } from "services/storeService";
import { updateStore } from "services/storeService";
import { NotificationContainer } from 'react-notifications';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import * as usersServices from 'services/userService'
import { useState, useEffect } from "react";
import { emailRegex, phoneRegex } from "@/components/stores/FieldRegexs";
import withAuthorization from 'components/withAuthorization';


const Update = ({ store, ownerIds, users }) => {
    const [data, setData] = useState({
        name: store.name ? store.name : "Comercio",
        description: store.description ? store.description : "Descripcion",
        address: store.address ? store.address : "Dirección",
        telephone: store.telephone ? store.telephone : "Telefono",
        schedule: store.schedule ? store.schedule : "Horarios",
        email: store.email ? store.email : "E-mail",
        logo: store.logo.link ? store.logo.link : null,
        owners: ownerIds ? ownerIds : []
    })

    useEffect(() => { console.log(data) }, [data])
    const [errors, setErrors] = useState({});
    const validationsForm = (form) => {
        let errors = {};

        if (!form.name.trim()) {
            errors.name = "El campo 'Nombre' es requerido";
        }

        if (!form.description.trim()) {
            errors.description = "El campo 'Descripcion' es requerido";
        }

        if (!phoneRegex.test(form.telephone.trim())) {
            errors.description = "El campo 'Telefono' esta vacio o mal escrito";
        }

        if (!emailRegex.test(form.description.trim())) {
            errors.description = "El campo 'E-mail' esta vacio o mal escrito";
        }

        if (!form.description.trim()) {
            errors.description = "El campo 'Descripcion' es requerido";
        }

        if (form.owners.length == 0) {
            errors.owners = "El comercio debe tener al menos un propietario";
        }

        //implementar logo aqui...

        return errors
    };


    const handleChange = (e) => {
        const { name, value } = e.target

        setData({
            ...data,
            [name]: value
        })
    }

    const handleChangeOwners = (e) => {
        const value = e.target.value;

        const selectedUserId = users.find(owner => owner.username === value).username;

        if (selectedUserId && !data.owners.some(ownerId => ownerId === selectedUserId)) {
            setData({
                ...data,
                owners: [
                    ...data.owners,
                    selectedUserId
                ]
            });
        }

        setErrors(validationsForm(data));
    };





    const deleteOwner = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            owners: data.owners.filter(owner => owner !== value)
        })
        setErrors(validationsForm(data))

    }

    const handleBlur = (e) => {
        handleChange(e);
        setErrors(validationsForm(data));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validationsForm(data));
        if (errors.name || errors.code || errors.category || errors.brand || errors.price || errors.stock || errors.points || errors.sizes || data.sizes.length == 0 || data.category.id == "" || data.brand.id == "") {
            NotificationManager.info('No fue posible actualizar el articulo: ' + '\"' + store.name + '\"', 'Administracion de comercios', 2000)
        } else {
            update(store.id, data).then((result) => {
                NotificationManager.info('El articulo: ' + '\"' + data.name + '\"' + "se actualizo correctamente", 'Administracion de comercios', 2000);
            })
            window.location.href = '/stores/'
        }

    }


    const goToStoresList = () => {
        window.location.href = '/stores'
    }

    const showStore = () => {
        window.location.href = '/commerce/' + store.id
    }


    return <>
        <NotificationContainer />
        <div className="flex justify-center">
            <form className="w-full max-w-lg" onSubmit={e => handleSubmit(e)}>
                <div className="flex flex-wrap -mx-3 mb-6">

                    {/*ID Y NOMBRE*/}
                    <div className="w-full">
                        <label className="block uppercase tracking-wide text-palette-dark text-xs font-bold mb-2 mt-2 text-3xl" htmlFor="grid-first-name">
                            ID #{store.id}
                        </label>
                        <label className="block uppercase tracking-wide text-palette-primary text-xs font-bold mb-2"
                            htmlFor="name">
                            Nombre
                        </label>
                        <input
                            autoComplete="off"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="name" type="text"
                            placeholder="Nombre del Producto"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                        {errors.name && <p className={`text-red-500 text-xs italic`}>{errors.name}</p>}
                    </div>

                    {/*DESCRIPCION*/}
                    <div className="w-full">
                        <label className="block uppercase tracking-wide text-palette-primary text-xs font-bold mb-2"
                            htmlFor="grid-last-name">
                            Descripci&Oacute;n
                        </label>
                        <textarea
                            autoComplete="off" value={data.description}
                            className="resize-none appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name" placeholder="Descripci&oacute;n del comercio" name="description" rows="3"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                        {errors.description && <p className={`text-red-500 text-xs italic`}>{errors.description}</p>}
                    </div>

                    {/*DIRECCIÓN*/}
                    <div className="w-full">
                        <label className="block uppercase tracking-wide text-palette-primary text-xs font-bold mb-2"
                            htmlFor="grid-last-name">
                            Direcci&Oacute;n
                        </label>
                        <textarea
                            autoComplete="off" value={data.address}
                            className="resize-none appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name" placeholder="Direcci&Oacute;n del comercio" name="address" rows="2"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                        {errors.address && <p className={`text-red-500 text-xs italic`}>{errors.address}</p>}
                    </div>

                    {/*TELEFONO*/}
                    <div className="w-full">
                        <label className="block uppercase tracking-wide text-palette-primary text-xs font-bold mb-2"
                            htmlFor="grid-last-name">
                            Tel&eacute;fono
                        </label>
                        <textarea
                            autoComplete="off" value={data.telephone}
                            className="resize-none appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name" placeholder="Tel&eacute;fono del comercio" name="telephone" rows="1"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                        {errors.telephone && <p className={`text-red-500 text-xs italic`}>{errors.telephone}</p>}
                    </div>

                    {/*HORARIOS*/}
                    <div className="w-full">
                        <label className="block uppercase tracking-wide text-palette-primary text-xs font-bold mb-2"
                            htmlFor="grid-last-name">
                            Horarios
                        </label>
                        <textarea
                            autoComplete="off" value={data.schedule}
                            className="resize-none appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name" placeholder="Horarios del comercio" name="schedule" rows="3"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                        {errors.schedule && <p className={`text-red-500 text-xs italic`}>{errors.schedule}</p>}
                    </div>

                    {/*E-MAIL*/}
                    <div className="w-full">
                        <label className="block uppercase tracking-wide text-palette-primary text-xs font-bold mb-2"
                            htmlFor="grid-last-name">
                            E-mail
                        </label>
                        <textarea
                            autoComplete="off" value={data.email}
                            className="resize-none appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name" placeholder="E-mail del comercio" name="email" rows="1"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                        {errors.email && <p className={`text-red-500 text-xs italic`}>{errors.email}</p>}
                    </div>

                    {/*PROPIETARIOS*/}
                    <div className="w-full">
                        <label className="block uppercase block tracking-wide text-palette-primary text-xs font-bold mb-3"
                            htmlFor="size">
                            Propietarios
                        </label>
                        <select
                            onChange={handleChangeOwners}
                            name={users.username}
                            onBlur={handleBlur}
                            value={users.username}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="owners"
                        >
                            <option value={null}>Seleccionar</option>
                            {users
                                ? users.map(user => (
                                    <option key={user.username} value={user.username}>
                                        {user.name} ({user.username})
                                    </option>
                                ))
                                : <option>Propietarios</option>
                            }
                        </select>
                        <div className="flex grid grid-cols-4 gap-8 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight">
                            {
                                data.owners?.map((owner) => {
                                    return (
                                        <div className="flex w-32 justify-between mx-2 rounded shadow-xl bg-blue-500 text-white" key={owner} onBlur={handleBlur}>
                                            <div className="flex w-3/4 m-auto text-xs p-2">{owner}</div>
                                            <button className="w-1/4 rounded-r bg-red-500 uppercase text-white h-full" onClick={e => { deleteOwner(e) }} value={owner}>x</button>
                                        </div>
                                    )
                                })
                            }
                            {errors.sizes && <p className={`text-red-500 text-xs italic`}>{errors.sizes}</p>}
                        </div>
                    </div>
                </div>

                <div className="mt-8 md:ml-20">
                    <a onClick={goToStoresList} className={`hover:bg-gray-400 hover:text-white  text-black py-2 px-4 m-auto mr-2 rounded cursor-pointer`}>
                        Ir a la lista
                    </a>
                    <a onClick={showStore} className={`hover:bg-gray-400 hover:text-white  text-black py-2 px-4 mr-2 m-autorounded cursor-pointer`}>
                        Ver comercio
                    </a>
                    {
                        errors.name ||
                            errors.code ||
                            errors.category ||
                            errors.brand ||
                            errors.price ||
                            errors.stock ||
                            errors.points ||
                            errors.sizes
                            ?
                            <button type="submit"
                                className={`bg-palette-lighter text-white font-bold py-2 px-4 m-auto rounded`} disabled>
                                Guardar
                            </button>
                            :
                            <button type="submit" onClick={handleSubmit}
                                className={`bg-palette-primary hover:bg-palette-dark text-white font-bold py-2 px-4 m-auto rounded`}>
                                Guardar
                            </button>
                    }
                    <p className={`text-red-500 text-xs italic ${Object.keys(errors).length === 0 ? "invisible" : ""} `}>Complete los campos.</p>
                </div>
            </form>
        </div>
    </>;


}


export async function getServerSideProps({ params }) {
    const store = await findByID(params.id);
    const ownerIds = await getOwnerIds(params.id);
    const users = await usersServices.findAll();

    return {
        props: {
            store,
            ownerIds,
            users
        }
    };
}

export default withAuthorization(Update);

