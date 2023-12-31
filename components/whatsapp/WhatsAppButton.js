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
                className='flex items-center text-white border-white border rounded-xl p-2 text-lg w-full'
                onClick={handleWhatsAppClick}
                style={{ backgroundColor: "rgb(81,203,95)" }}
            >
                <img src={logo.src} style={{ width: "3rem" }} alt="WhatsApp Logo" className="mr-2" />
                <b>Consultar por WhatsApp</b>
            </button>
        </div>

    );
};

export default WhatsAppButton;
