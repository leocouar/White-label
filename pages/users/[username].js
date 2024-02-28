import UserData from "@/components/users/UserData";
import UserSecurity from "@/components/users/UserSecurity";
import {useState} from "react";
import { getByUsername } from "services/userService";
import BillsOfUser from "@/components/users/BillsOfUser";
import { findAllByUsername } from "services/billingService";
import StoreHeading from "@/components/StoreHeading";
import userAuthorization from "@/components/userAuthorization";
import { useRef } from 'react';



const Username = ({userSession, billsOfUSer})  => {
  

    const [tabs, setTabs] = useState({
        usuarios: true,
        activity: false,
        security: false,
    });
    
    const usuariosRef = useRef(null);
    const activityRef = useRef(null);
    const securityRef = useRef(null);

    const handleClick = (e) => {
        const {name} = e.target;
        setTabs({
            usuarios: false,
            activity: false,
            security: false,
        });
        setTabs({
            [name]: true
        });
    
        // Asegúrate de que la referencia esté definida antes de usar scrollIntoView
        if (name === 'usuarios' && usuariosRef.current) {
            usuariosRef.current.scrollIntoView({ behavior: 'smooth'});
            window.scrollBy(0, -20)
        } else if (name === 'activity' && activityRef.current) {
            activityRef.current.scrollIntoView({ behavior: 'smooth' });
            
        } else if (name === 'security' && securityRef.current) {
            securityRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    
    }

    return (
      <div className="bg-blue-100 lg:px-3">
          <div className="lg:mx-6 bg-white flex min-h-screen">
            <div className="bg-gray-100 w-1/5 h-auto">
                <ul id="tabs" className="w-full sticky top-24">
                    <a name={`usuarios`} className="hidden sm:block" href="#first" onClick={handleClick}>
                    <li  className={`font-semibold hover:bg-red-200 py-3 flex justify-center${tabs.usuarios ? `bg-red-300` : ``} justify-center`}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Usuario
                    </li>
                    </a>
                    <a id="default-tab" className="hidden sm:block" name={`activity`} href="#second" onClick={handleClick}>
                    <li  className={`hover:bg-red-200 py-3 font-semibold flex justify-center${tabs.activity ? `bg-red-300` : ``} justify-center`}>
                        
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Actividad
                    </li>
                    </a>
                    <a name={`security`} className="hidden sm:block" href="#third" onClick={handleClick}>
                    <li className={`hover:bg-red-200 py-3 font-semibold flex justify-center${tabs.security ? `bg-red-300 py-3` : ``}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Seguridad
                    </li>
                    </a>

                </ul>
            </div>

            <div className="justify-center w-full h-full">
                <div id="first"  ref={usuariosRef} className={`${tabs.usuarios ? `` : ``}  flex bg-white justify-center p-2 lg:w-4/4 `}>
                    <div className="justify-center">
                        <div className="mt-6">
                            <StoreHeading  title=""/>
                        </div>
                        <div className="mt-6">
                            <StoreHeading  title="Usuario"/>
                        </div>
                        <div className="md:-mt8 -mt-6">
                            <UserData user={userSession}/> 
                        </div>
                    </div>
                </div>

                <div id="second" ref={activityRef} className={`${tabs.activity ? `` : ``}  lg:flex bg-white justify-center p-2 lg:w-4/4 border-t-4 border-gray-500 border-opacity-10`}>
                    <div className="justify-center sm:w-full">
                        <div className="mt-6">
                            <StoreHeading  title=""/>
                        </div>
                        <div className="mt-6">
                            <StoreHeading  title="Tus Facturas"/>
                        </div>
                        <div className="md:-mt8 -mt-6 ml-3">
                            <BillsOfUser bills={billsOfUSer}/>
                        </div>
                    </div>
                </div>
                
                <div id="third"  ref={securityRef}  className={`${tabs.security ? `` : ``}  flex bg-white justify-center p-2 lg:w-4/4 border-t-4 border-gray-500 border-opacity-10`}>
                    <div className="justify-center">
                         <div className="mt-6">
                            <StoreHeading  title=""/>
                        </div>
                        <div className="mt-6">
                            <StoreHeading title="Seguridad"/>
                        </div>
                        <div className="md:-mt8 -mt-6">
                            <UserSecurity user={userSession}/>
                        </div>
                    </div>
                </div>
            </div>

          </div>
      </div>

    )
}

export default userAuthorization(Username);

 

export async function getServerSideProps({query}) {
    const userSession = await getByUsername(query.username);
    const billsOfUSer = await findAllByUsername(query.username)
 

    return {
        props: {
            userSession,
            billsOfUSer
        }
    }
}