import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore, faUserSlash, faTag } from '@fortawesome/free-solid-svg-icons';
import VistaComercio from './VistaComercio';
import VistaProductos from './VistaProductos';


function MenuDashboard(store, id) {
    const [vista, setVista] = useState(false);
    const handleClick = (texto) => {
        if (texto === 'Comercio') {
            setVista('comercio');
        } else if (texto === 'Productos') {
            setVista('productos');
        } else if (texto === 'Cerrar sesion') {
            // Handle logout logic
        }
    };
    return (
        <>
            <div className="flex">
                <div class="p-2 bg-black-500 w-60 flex flex-col hidden md:flex" id="sideNav">
                    <nav>         
                            <div onClick={() => handleClick('Comercio')} class="block text-black-500 py-2.5 px-4 my-4 rounded transition hover:py-3.5 duration-200  hover:bg-blue-400 hover:text-white hover:from-cyan-400 hover:to-cyan-300  cursor-pointer" >
                                Comercio
                            </div>

                            <div onClick={() => handleClick('Productos')} class="block text-black-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-blue-400 hover:text-white cursor-pointer">
                                Productos
                            </div>

                            <div onClick={() => handleClick('Cerrar sesion')} class="block text-black-500 py-2.5 px-4 my-2 rounded transition duration-200  hover:from-cyan-400 hover:to-cyan-300 hover:bg-red-400 hover:text-white mt-auto cursor-pointer" >
                                Cerrar sesión
                            </div>
                    </nav>
                    
                    <div class="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mt-2"></div>
                </div>
                <div className="flex-1 p-8">
                    {vista === 'comercio' && (
                        <div className="mt-8 p-4 bg-white shadow-md rounded-md">
                            <VistaComercio commerceData={store}/>
                        </div>
                    )}
                    {vista === 'productos' && (
                        <div className="mt-8 p-4 bg-white shadow-md rounded-md">
                            <VistaProductos products={id}/>
                        </div>
                    )}
                </div>
                
            </div>
            {/* Mobile navigation icons */}
            <div className="md:hidden fixed bottom-0 z-10 left-0 right-0 p-4 bg-gray-200 flex justify-around">
                <div onClick={() => handleClick('Comercio')} className="text-gray-700 cursor-pointer">
                    <FontAwesomeIcon icon={faStore} className="w-4"/>
                </div>

                <div onClick={() => handleClick('Productos')} className="text-gray-700 cursor-pointer">
                    <FontAwesomeIcon icon={faTag} className="w-4"/>
                </div>

                <div onClick={() => handleClick('Cerrar sesion')} className="text-gray-700 cursor-pointer">
                    <FontAwesomeIcon icon={faUserSlash} className="w-4"/>
                </div>
            </div>
        </>
    )

}
export default MenuDashboard