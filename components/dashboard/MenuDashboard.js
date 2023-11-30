import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore, faCircleLeft, faTag, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import VistaComercio from './VistaComercio';
import VistaProductos from './VistaProductos';


function MenuDashboard(store) {
    const [vista, setVista] = useState('comercio');
    const handleClick = (texto) => {
        if (texto === 'Comercio') {
            setVista('comercio');
        } else if (texto === 'Productos') {
            setVista('productos');
        } else if (texto === 'Salir') {
            window.history.back();
        }
    };
    return (
        <>
            <div className="bg-gray-100 flex">
                <div className="p-2 relative bg-white h-screen w-40 hidden sm:block shadow-xl" id="sideNav">
                    <nav>         
                            <div onClick={() => handleClick('Comercio')} className={vista==='comercio'?"block text-black-500 font-semibold py-2.5 px-4 my-4 rounded bg-blue-400 hover:text-white cursor-pointer":"block text-black-500 py-2.5 px-4 my-4 rounded transition duration-200  hover:bg-blue-400 hover:text-white cursor-pointer"}>
                                Comercio
                            </div>

                            <div onClick={() => handleClick('Productos')} className={vista==='productos'?"block text-black-500 font-semibold py-2.5 px-4 my-4 rounded bg-blue-400 hover:text-white cursor-pointer":"block text-black-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-blue-400 hover:text-white cursor-pointer"}>
                                Productos
                            </div>

                            <div onClick={() => handleClick('Salir')} className="block text-black-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-red-400 hover:text-white cursor-pointer" >
                                Salir
                            </div>
                    </nav>
                    
                    <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mt-2"></div>
                </div>
                <div className="flex-1 p-8">
                    {vista === 'comercio' && (
                        <div className="mt-8 p-4 bg-white shadow-md rounded-md">
                            <VistaComercio commerceData={store}/>
                        </div>
                    )}
                    {vista === 'productos' && (
                        <div className="mt-8 p-4 bg-white shadow-md rounded-md">
                            <VistaProductos store={store}/>
                        </div>
                    )}
                </div>
                
            </div>
            {/* Mobile navigation icons */}
            <div className="md:hidden fixed bottom-0 z-10 left-0 right-0 p-4 bg-gray-200 flex justify-around">
                <div onClick={() => handleClick('Comercio')} className="text-gray-500 cursor-pointer">
                    <FontAwesomeIcon icon={faStore} className={vista==='comercio'?"w-4 text-gray-900":"w-4"}/>
                </div>

                <div onClick={() => handleClick('Productos')} className="text-gray-500 cursor-pointer">
                    <FontAwesomeIcon icon={faTag} className={vista==='productos'?"w-4 text-gray-900":"w-4"}/>
                </div>

                <div onClick={() => handleClick('Cerrar sesion')} className="text-red-500 cursor-pointer">
                    <FontAwesomeIcon icon={faArrowAltCircleLeft} className="w-4"/>
                </div>
           </div>
        </>
    )

}
export default MenuDashboard