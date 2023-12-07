import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faLocationArrow, faClock, faEnvelope , faPhone} from '@fortawesome/free-solid-svg-icons';


const ComercioUnico = ({store}) => {
    const DefaultImage = "https://i.pinimg.com/564x/56/02/c2/5602c21e0b1cc147c5c7f7ad36e688da.jpg";
    const [isLoading, setIsLoading] = useState(true);
    const [isAnimationComplete, setIsAnimationComplete] = useState(false);

    useEffect(() => {
        // Simula una carga progresiva después de 1 segundo (puedes ajustar según tus necesidades)
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        // Limpiar el temporizador en la limpieza del efecto
        return () => clearTimeout(timer);
    }, []); // Se ejecuta solo una vez al montar el componente

    const handleAnimationEnd = () => {
        setIsAnimationComplete(true);
      };
    

    return (
        <div
        className={` ${
          isLoading ? 'opacity-0 transform -translate-y-full' : 'opacity-100 transform translate-y-0 transition-all ease-out duration-300'
        }`}
        onTransitionEnd={handleAnimationEnd}
      >
            <div id={store.id} className="p-4 rounded-2xl shadow flex flex-col shadow-2xl" style={{ backgroundImage: `url('/images/comerciou.png')` }}>
                <div className="w-full h-full">
                    <h1 className="text-3xl text-center font-bold mb-4 mt-4 uppercase "style={{color: "#5d5473",}} >{store.name}</h1>  
                </div>
                <div className="flex w-full justify-around">
                    <div className="w-1/2 shadow-dark">     

                    <div className="lg:mt-8 space-y-5">
                        {/* Descripcion */}

                        <div className={`flex hidden sm:block ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'}`}>
                            <div className="flex">
                            <FontAwesomeIcon icon={faAddressCard} className="w-4" />
                            <div className="pl-2">
                                <span className="font-bold uppercase">Descripción:</span>
                                {store.description}
                            </div>
                            </div>
                        </div>


                        {/* Direccion y Horarios */}

                        <div className={`flex ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'}`}>
                            <div className="flex">
                            <FontAwesomeIcon icon={faLocationArrow} className="w-4 hidden sm:block" />
                            <div className="pl-2">
                                <span className="font-bold uppercase">Direccion:</span>
                                {store.address}
                            </div>
                            </div>
                        </div>
                        <div className={`flex ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'}`}>
                            <div className="flex">
                            <FontAwesomeIcon icon={faClock} className="w-4 hidden sm:block" />
                            <div className="pl-2">
                                <span className="font-bold uppercase">Horarios:</span>
                                {store.schedule}
                            </div>
                            </div>
                        </div>

                        {/* Contacto */}

                        <div className={`flex hidden sm:block ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'}`}>
                            <div className="flex">
                            <FontAwesomeIcon icon={faEnvelope} className="w-4" />
                            <div className="pl-2">
                                <span className="font-bold uppercase">Email:</span>
                                {store.email}
                            </div>
                            </div>
                        </div>
                        <div className={`flex ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'}`}>
                            <div className="flex">
                            <FontAwesomeIcon icon={faPhone} className="w-4 hidden sm:block " />
                            <div className="pl-2">
                                <span className="font-bold uppercase">Telefono:</span>
                                {store.telephone}
                            </div>
                            </div>
                        </div>
                        </div>

                    

                    </div>
                    <div className={`w-1/4 ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'}`}>
                        <img
                            src={store.logo?.link || DefaultImage} // Utilizar logo predeterminado si no hay uno en la tienda

                            className="lg:mb-24 mt-6 lg:ml-28 rounded-xl  max-h-52  shadow-2xl transition-transform duration-300 transform origin-center hover:scale-110"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ComercioUnico;