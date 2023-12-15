// WhatsAppButton.js
import React from 'react';
import logo from "/images/wsplogo.png";

const WhatsAppButton = ({ phoneNumber, message }) => {
    const handleWhatsAppClick = () => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div>
            <button className='flex items-center bg-green-500 text-white border-white border rounded-xl p-2' onClick={handleWhatsAppClick}>
                <img src={logo.src} style={{ width: "3rem" }} alt="WhatsApp Logo" className="mr-2" />
                Consultar por WhatsApp
            </button>

        </div>
    );
};

export default WhatsAppButton;
