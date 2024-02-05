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
                className='ml-8 mt-10 flex font-semibold items-center text-white bg-green-600 hover:bg-green-700 border-green-400 border rounded-full'
                onClick={handleWhatsAppClick}
            >
                <img src={logo.src} style={{ width: "2rem" }} alt="WhatsApp Logo" className="" />
                <a className='ml-2 mr-2'>Enviar WhatsApp</a>
            </button>
        </div>
    );
};

export default WhatsAppButton;
