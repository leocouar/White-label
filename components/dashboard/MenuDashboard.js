import { useState } from 'react';
import VistaComercio from './VistaComercio';
import VistaProductos from './VistaProductos';


function MenuDashboard(store) {
    const [vista, setVista] = useState('comercio');
    const handleClick = (texto) => {
        if (texto === 'Comercio') {
            setVista('comercio');
        } else if (texto === 'Productos') {
            setVista('productos');
        }
    };

    return (
        <>
            <div className="flex">
                <div class="p-2 bg-black-500 w-60 flex flex-col hidden md:flex" id="sideNav">
                    <nav>         
                        <div onClick={() => handleClick('Comercio')} className={`block font-primary py-2.5 px-4 mt-5 rounded transition hover:py-3.5 duration-200 hover:bg-blue-200 hover:text-white hover:from-cyan-400 hover:to-cyan-300  cursor-pointer ${vista === 'comercio' ? 'bg-blue-400 text-white' : 'text-black-500'}`}>
                            Informacion
                        </div>

                        <div onClick={() => handleClick('Productos')} className={`block font-primary py-2.5 px-4 rounded transition duration-200 hover:bg-blue-200 hover:text-white cursor-pointer ${vista === 'productos' ? 'bg-blue-400 text-white' : 'text-black-500'}`}>
                            Productos
                        </div>

                        <div onClick={() => handleClick('Cerrar sesion')} class="block font-primary py-2.5 px-4 rounded transition duration-200  hover:from-cyan-400 hover:to-cyan-300 hover:bg-blue-200 hover:text-white mt-auto cursor-pointer">
                            Cerrar sesión
                        </div>
                    </nav>
                    
                    <div class="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mt-2"></div>
                </div>
                <div className="flex-1 p-8">
                    {vista === 'comercio' && (
                        <div className="mt-8 p-4 bg-white shadow-md rounded-md h-full">
                            <VistaComercio commerceData={store}/>
                        </div>
                    )}
                    {vista === 'productos' && (
                        <div className="mt-8 p-4 bg-white shadow-md rounded-md">
                            <VistaProductos/>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default MenuDashboard;