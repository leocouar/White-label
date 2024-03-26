import { useState, useRef } from "react";
import { getByUsername, update } from "services/userService";
import availableRoles from "@/components/users/ListOfRoles";
import { useSession } from "next-auth/react";


const UserData = ({ user }) => {
    const { data: session, status } = useSession();
    const [userToUpdate, setUserToUpdate] = useState(user);
    const [editingOff, setEditingOff] = useState(true);
    const [enable, setEnabled] = useState(true);
    const nameRef = useRef(null);


    const enableFields = (e) => {
        e.preventDefault();
        setEnabled(false);
    }


    const handleChange = (e) => {
        setUserToUpdate({
            ...userToUpdate,
            [e.target.name]: e.target.value,
        });
    }

    const submit = (e) => {
        e.preventDefault();
        if (!editingOff) {
            setEditingOff(true);
            update(userToUpdate).then((result) => {
                if (result.status === 202) {
                    window.location.href = '/users/' + user.username
                }
            });
        } else {
            setEditingOff(false);
            nameRef.current.focus();
        }

    }

    return (

        <>
            <form class="flex-initial shrink w-full max-w-lg p-6">
                <div className="text-center text-xl -mt-3 mb-4"><i>{userToUpdate?.username}</i></div>
                <div class="flex flex-wrap mx-3 mb-6"
                    onDoubleClick={enableFields}>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                            Nombre
                        </label>
                        <input
                            onChange={handleChange}
                            ref={nameRef}
                            disabled={editingOff}
                            className={`appearance-none block w-full 
                                        ${editingOff ? "bg-gray-200" : "bg-white"} 
                                        text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                            value={userToUpdate?.name}
                            type="text"
                            id="name"
                            name="name"
                        />
                    </div>

                    <div className="w-full md:w-1/2 px-3"
                        onDoubleClick={enableFields}>
                        <label
                            htmlFor="lastName"
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-last-name">
                            Apellido
                        </label>
                        <input
                            onChange={handleChange}
                            disabled={editingOff}
                            className={`appearance-none block w-full 
                            ${editingOff ? "bg-gray-200" : "bg-white"} 
                            text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                            value={userToUpdate?.lastName}
                            type="text"
                            id="lastName"
                            name="lastName"
                        />
                    </div>
                </div>

                <div class="flex flex-wrap mx-3 mb-6"
                    onDoubleClick={enableFields}>
                    <div className="w-full px-3">
                        <label
                            htmlFor="phone"
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-password">
                            Telefono
                        </label>
                        <input
                            onChange={handleChange}
                            disabled={editingOff}
                            className={`appearance-none block w-full 
                                        ${editingOff ? "bg-gray-200" : "bg-white"} 
                                        text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                            value={userToUpdate?.phone}
                            type="text"
                            id="phone"
                            name="phone"
                        />
                    </div>
                </div>


                <div class="flex flex-wrap mx-3 mb-6"
                    onDoubleClick={enableFields}>
                    <div className="w-full px-3">
                        <label
                            htmlFor="direction"
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-password">
                            Direccion
                        </label>
                        <input
                            onChange={handleChange}
                            disabled={editingOff}
                            className={`appearance-none block w-full 
                            ${editingOff ? "bg-gray-200" : "bg-white"} 
                            text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                            value={userToUpdate?.direction}
                            type="text"
                            id="direction"
                            name="direction"
                        />
                    </div>
                </div>


                <div class="flex flex-wrap mx-3 mb-6"
                    onDoubleClick={enableFields}>
                    <div className="w-full px-3">
                        <label
                            htmlFor="cuit"
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-password">
                            CUIT/CUIL
                        </label>
                        <input
                            onChange={handleChange}
                            disabled={editingOff}
                            className={`appearance-none block w-full 
                            ${editingOff ? "bg-gray-200" : "bg-white"} 
                            text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                            value={userToUpdate?.cuit}
                            type="text"
                            id="cuit"
                            name="cuit"
                        />
                    </div>
                </div>


                <div class="flex flex-wrap mx-3 mb-2"
                    onDoubleClick={enableFields}>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="city"
                            for="grid-city">
                            Ciudad
                        </label>
                        <input
                            onChange={handleChange}
                            disabled={editingOff}
                            className={`appearance-none block w-full 
                                            ${editingOff ? "bg-gray-200" : "bg-white"} 
                                            text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                            type="text"
                            value={userToUpdate?.city}
                            id="city"
                            name="city"
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0"
                        onDoubleClick={enableFields}>
                        <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="postal"
                            for="grid-zip">
                            Codigo postal
                        </label>
                        <input
                            onChange={handleChange}
                            disabled={editingOff}
                            className={`appearance-none block w-full 
                                        ${editingOff ? "bg-gray-200" : "bg-white"} 
                                        text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                            type="text"
                            value={userToUpdate?.postal}
                            id="postal"
                            name="postal"
                        />
                    </div>
                </div>
                {session?.user?.role?.includes('ADMIN') &&
                    <div className="flex flex-wrap mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password">
                                Rol*:
                            </label>
                            <select value={userToUpdate?.role}
                                disabled={editingOff}
                                onChange={handleChange}
                                name="role"
                                className={`appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500
                                            ${editingOff ? "bg-gray-200" : "bg-white"}`}
                                id="role">
                                {
                                    availableRoles.map(role => (
                                        <option value={role.value}>{role.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                }

                <button
                    type={editingOff ? "button" : "submit"}
                    onClick={submit}
                    className={`${editingOff ? "bg-blue-500" : "bg-red-500"
                        } hover:${editingOff ? "bg-blue-400" : "bg-red-700"
                        } ml-6 rounded text-white font-bold mt-2 py-2 px-4`}
                >
                    {editingOff ? "Editar" : "Guardar"}
                </button>

            </form>

        </>
    )
}

export async function getServerSideProps({ query }) {
    const user = await getByUsername(query.username);

    return {
        props: {
            user
        }
    }
}
export default UserData; 