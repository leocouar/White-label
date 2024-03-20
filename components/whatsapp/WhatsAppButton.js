// WhatsAppButton.js
import React from 'react';
import logo from "/images/wsplogo.png";

const WhatsAppButton = ({ phoneNumber, message, actionPostRedirect }) => {
    const handleWhatsAppClick = () => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
        if(actionPostRedirect) actionPostRedirect();
    };

    return (
        <div>
            <button
                className='h-12 pt-1 justify-center items-center pb-1 font-semibold flex items-center text-white bg-gray-400 hover:bg-green-700 rounded-2xl p-2 text-md w-full'
                onClick={handleWhatsAppClick}
            >
                <img src={logo.src} style={{ width: "3rem" }} alt="WhatsApp Logo" className="" />
                <div className='flex flex-col'>
                <a className='text-xs'>Escribenos en</a>
                <a className='text-lg ml-2'>WhatsApp</a>
                </div>
            </button>
        </div>

    );
};

export default WhatsAppButton;
