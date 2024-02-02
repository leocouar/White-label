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
                className='h-11 pt-1 justify-center items-center pb-1 font-primary font-semibold flex items-center text-white bg-green-600 hover:bg-green-700 border-black border rounded-lg p-2 text-md w-full'
                onClick={handleWhatsAppClick}
            >
                <img src={logo.src} style={{ width: "2rem" }} alt="WhatsApp Logo" className="" />
                Consultar por WhatsApp
            </button>
        </div>

    );
};

export default WhatsAppButton;
