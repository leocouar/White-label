import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartContext } from "@/context/Store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faDoorOpen, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import logo from "/images/camara_bolivar_logo.png";
import UserSession from "@/components/users/UserSession";

import { useSession,signOut } from "next-auth/react";

import Loading from "./utils/Loading";
import { findAll } from "services/categoriesService";
import { findAllStores } from "services/storeService";
import NavSearch from "./ProductSearch/ProductSearch";

function Nav() {
  const cart = useCartContext()[0];
  const [cartItems, setCartItems] = useState(0);
  const { data: session, status } = useSession()
  const loading = status === "loading"
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
          <Link legacyBehavior href="/">
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
            
            <div className="relative text-smw block mt-4 lg:inline-block lg:mt-0">
              <button
                type="button"
                onClick={showCategories}
                className="inline-flex text-m font-primary text-palette-primary tracking-tight md:p-2 rounded-md hover:text-palette-secondary">
                CATEGORÍAS
                <svg className="h-5 w-5 align-items-lg-stretch" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd" />
                </svg>
              </button>
              <div
                className={`${categoriesVisible ? "" : "hidden"} z-50 absolute mt-2 w-46 lg:w-32 lg:right-0 md:w-32 rounded-md shadow-lg bg-white ring-2 ring-palette-lighter ring-opacity-75 focus:outline-none md:-mx-2 -mx-0`}
                role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                <div className="overflow-y-auto no-scrollbar max-h-80 lg:max-h-44" role="none">
                  {categories?.map((category) => (
                    <Link legacyBehavior href={`/accessories/${category.id}`} passHref>
                      <a href="#" onClick={showCategories} className="text-palette-primary block text-center hover:text-palette-secondary px-4 py-2 text-sm" role="menuitem"
                        tabIndex="-1" id="menu-item-0">{category.name}</a>
                    </Link>
                  ))
                  }
                </div>
              </div>
            </div>
            <Link legacyBehavior href="/stores/list">

              <a className="text-smw block mt-4 lg:inline-block lg:mt-0 text-m font-primary text-palette-primary tracking-tight md:p-2 rounded-md hover:text-palette-secondary">
                TUS COMERCIOS
              </a>
            </Link>
            <Link legacyBehavior href="/about/inicio">
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
