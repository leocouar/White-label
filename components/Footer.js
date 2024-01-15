 import Link from "next/link";
 import logo from "/images/camara_bolivar_logo.png";
 import React from 'react';
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 import { faFacebook, faTwitter, faInstagram} from '@fortawesome/free-brands-svg-icons';
 
 function Footer() {
   return (

     <footer id="Footer" className="fixed flex h-64 justify-center font-primary items-center w-full" style={{ boxShadow: "0px -5px 5px -5px rgba(0,0,0,0.5)" ,
     backgroundImage: `url('/images/bgcatalog.png')`, position: "absolute", bottom: 0}}>
        <div className="w-full">
         <div className="flex  items-center">
 
           {/* Logo */}
           <div className="w-full sm:w-1/2 md:w-2/3 lg:w-3/4 mx-8">
             <Link legacyBehavior href="/">
               <div className="sm:block cursor-pointer flex-row items-center">
                 <img src={logo.src} className="w-52 mx-auto sm:mx-16 md:mx-70 lg:mx-4 lg:w-52" alt="Logo" />
               </div>
             </Link>
           </div>
 
 
           {/* Contacto */}
           <div className="hidden sm:block w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mx-8 mt-7">
             <h2 className="text-lg font-bold mb-4">CONTACTO</h2>
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
           <div className="hidden sm:block w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mx-8 mb-16">
             <h2 className="text-lg font-bold mb-4">REDES SOCIALES</h2>
                   <div className="flex mr-12 justify-around sm:justify-start sm:ml-4">
                         <a
                           href="https://www.instagram.com/camarabolivar/"
                           target="_blank"
                           rel="noopener noreferrer"
                           className="text-blue-300 hover:text-blue-500"
                         >
                           <FontAwesomeIcon icon={faInstagram} style={{ color: "#e4405f", marginRight: "8px", height: "30px" }} />
                         </a>
 
                         <a
                           href="https://www.facebook.com/camarabolivar/"
                           target="_blank"
                           rel="noopener noreferrer"
                           className="text-blue-300 hover:text-blue-500"
                         >
                           <FontAwesomeIcon icon={faFacebook} style={{ color: "#1e6794", marginRight: "8px" , height: "30"}} />
                         </a>
                         <a
                           href="https://twitter.com/camara_bolivar"
                           target="_blank"
                           rel="noopener noreferrer"
                           className="text-blue-300 hover:text-blue-500"
                         >
                           <FontAwesomeIcon icon={faTwitter} style={{ color: "#1DA1F2", marginRight: "8px", height: "30px" }} />
                         </a>
                   </div>
           </div>
            
         </div>
       </div>
     </footer>
 
   );
 }
 
 export default Footer;