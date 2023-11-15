import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartContext } from "@/context/Store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faDoorOpen, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import logo from "/images/camara_bolivar_logo.png";
import UserSession from "@/components/users/UserSession";

import { useSession } from "next-auth/client";
import { signOut } from "next-auth/client";

import Loading from "./utils/Loading";
import { findAll } from "services/categoriesService";
import { findAllStores } from "services/storeService";
import NavSearch from "./ProductSearch/ProductSearch";

function Nav() {
  const cart = useCartContext()[0];
  const [cartItems, setCartItems] = useState(0);
  const [session, loading] = useSession();
  const [isShow, setIsShow] = useState(false)
  const [load, setLoad] = useState(false)

  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const [categories, setCategories] = useState([])

  const [color, setColor] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOut(); 
    } catch (error) {
      
      console.error("Error al cerrar sesión:", error);
    }
  };

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 90) {
        setColor(true)
      } else {
        setColor(false)
      }
    }

    window.addEventListener('scroll', changeColor)
  }, [])

  const handleMenu = () => {
    setIsShow(!isShow)
  }

  useEffect(() => {
    let numItems = 0;
    cart.forEach((item) => {
      numItems += item.quantity;
    });
    setCartItems(numItems);
  }, [cart]);

  const showCategories = (() => {
    setCategoriesVisible(!categoriesVisible)
    setStoresVisible(false)
  })

  const handleDocumentClick = (e) => {
    if (categoriesVisible) {
      setCategoriesVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [categoriesVisible]);

  return (
    <header className={color ? "w-full sticky  lg:static top-0 z-50 bg-white ease-in duration-300" : "w-full sticky lg:static top-0 z-50 bg-palette-bg ease-in duration-300"}>

      <div >
        <div className="flex items-center justify-between flex-wrap p-2">

          <div className="block lg:hidden">
            <button onClick={handleMenu} className="flex py-2 hover:border-grey">
              <FontAwesomeIcon icon={faBars} className="w-5 top-6 ml-2 mr-0 items-center" />
            </button>
          </div>
          <Link href="/">
            <div className="flex sm:block cursor-pointer flex-row items-center">
              <img src={logo.src} className="w-32 mx-16 ml-8 md:mx-70 lg:mx-4 lg:w-32" />
            </div>
          </Link>



          <div className="flex-1" style={{ margin: "0 auto" }}>
            <NavSearch />
          </div>

          <div
            id="menu"
            className={` flex-grow ${isShow ? "" : "hidden"} divide-y divide-y-reverse justify-end divide-gray-200 lg:divide-none lg:flex lg:justify-self-center lg:w-auto`}
          >


            <Link href="/stores/list">
              <a className="text-smw block mt-4 lg:inline-block lg:mt-0 text-m font-primary text-palette-primary tracking-tight md:p-2 rounded-md hover:text-palette-secondary">
                TUS COMERCIOS
              </a>
            </Link>
            <Link href="/about/inicio">
              <a className="text-smw block mt-4 lg:inline-block lg:mt-0 text-m font-primary text-palette-primary tracking-tight md:p-2 rounded-md hover:text-palette-secondary">
                NOSOTROS
              </a>
            </Link>
            
            {!session ? (
          <Link href="/login">
            <a 
            title={session ? "Sign Out" : "Sign On"}
            className="text-smw block mt-4 lg:inline-block lg:mt-0 text-m font-primary text-palette-primary tracking-tight ml-7 md:p-2 rounded-md hover:text-palette-secondary">
            <FontAwesomeIcon icon={session ? faSignOutAlt : faDoorOpen} className="w-6 m-auto" />
            </a>
          </Link>
        ) : (
          <Link href="/">
            <a
            className="text-smw block mt-4 lg:inline-block lg:mt-0 text-m font-primary text-palette-primary tracking-tight ml-7 md:p-2 rounded-md hover:text-palette-secondary"
            title="Sign Out"
            onClick={handleSignOut}
          >
            
            <FontAwesomeIcon icon={session ? faSignOutAlt : faDoorOpen} className="w-6 m-auto" />
          </a>
          </Link>
          
        )}

          </div>

          {
            load ?
              <Loading>
              </Loading>
              :
              <></>

          }
        </div>
      </div>
    </header>
  );
}

export default Nav;
