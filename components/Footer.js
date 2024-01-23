 import Link from "next/link";
 import logo from "/images/camara_bolivar_logo.png";
 import React from 'react';
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 import { faFacebook, faTwitter, faInstagram} from '@fortawesome/free-brands-svg-icons';
 
 function Footer() {
   return (

     <footer id="Footer" className="hidden sm:block static bottom-0 h-48 font-primary w-full" style={{ boxShadow: "0px -5px 5px -5px rgba(0,0,0,0.5)" ,
     backgroundImage: `url('/images/bgcatalog.png')`}}>
         <div className="flex h-full">
 
           {/* Logo */}
           <div className="w-full self-center sm:w-1/2">
             <div className="sm:block flex-row items-center pl-16">
               <Link legacyBehavior href="/">
                 <img src={logo.src} className="w-52 cursor-pointer" alt="Logo" />
               </Link>
               </div>
           </div>
 
 
           {/* Contacto */}
           <div className="hidden sm:block sm:w-1/4 h-full pt-4">
             <h2 className="text-lg font-bold">CONTACTO</h2>
             <a href="https://www.google.com.ar/maps/dir/''/camara+comercial+bolivar/@-36.2333976,-61.1867101,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x95bfe3161c0ba0b3:0xdd71ceeee97f1412!2m2!1d-61.1134288!2d-36.2318154?entry=ttu"
               target="_blank"
               rel="noopener noreferrer"
               className="text-gray-800 hover:text-gray-400">Las Heras 45</a>
             <p>San Carlos de Bolívar</p>
             <p>Buenos Aires - Argentina</p>
             <p>(02314) 42-7327</p>
             <a href="mailto:camara@camarabolivar.com.ar" className="text-gray-800 hover:text-gray-400">
               camara@camarabolivar.com.ar
             </a>
           </div>
 
           {/* Redes Sociales */}
           <div className="hidden sm:block sm:w-1/4 h-full pt-4">
             <h2 className="text-center text-lg font-bold mb-4">REDES SOCIALES</h2>
                   <div className="flex justify-center">
                         <a
                           href="https://www.instagram.com/camarabolivar/"
                           target="_blank"
                           rel="noopener noreferrer"
                           className="text-blue-300 hover:text-blue-500 mx-2"
                         >
                           <FontAwesomeIcon icon={faInstagram} style={{ color: "#e4405f", height: "30px", width: "30px"}} />
                         </a>
 
                         <a
                           href="https://www.facebook.com/camarabolivar/"
                           target="_blank"
                           rel="noopener noreferrer"
                           className="text-blue-300 hover:text-blue-500 mx-4"
                         >
                           <FontAwesomeIcon icon={faFacebook} style={{ color: "#1e6794",  height: "30"}} />
                         </a>
                         <a
                           href="https://twitter.com/camara_bolivar"
                           target="_blank"
                           rel="noopener noreferrer"
                           className="text-blue-300 hover:text-blue-500 mx-2"
                         >
                           <FontAwesomeIcon icon={faTwitter} style={{ color: "#1DA1F2", height: "30px" }} />
                         </a>
                   </div>
           </div>
            
         </div>
     </footer>
 
   );
 }
 
 export default Footer;