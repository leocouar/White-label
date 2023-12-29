import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartContext } from "@/context/Store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen, faSignOutAlt, faBars, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import logo from "/images/camara_bolivar_logo.png";
import { useSession, signOut } from "next-auth/react";
import Loading from "./utils/Loading";
import NavSearch from "./ProductSearch/ProductSearch";
import { useRouter } from "next/router";

function Nav() {
  const router = useRouter();
  const cart = useCartContext()[0];
  const [cartItems, setCartItems] = useState(0);
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const [isShow, setIsShow] = useState(false)
  const [load, setLoad] = useState(false)
  const [searchFocused, isSearchFocused] = useState(false);

  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const [categories, setCategories] = useState([])

  const [color, setColor] = useState(false)

  const handleSession = async () => {
    if (session) {
      try {
        await router.push("/");
      } catch (error) {
        console.error(error);
      }
      try {
        await signOut();

      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    } else {
      router.push("/login");
    };
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

  const handleSearchFocus = (e) => {
    setIsShow(false)
    isSearchFocused(e);
  }

  useEffect(() => { console.log(searchFocused) }, [searchFocused])

  return (
    <header className="w-full sticky  lg:static top-0 z-50 bg-white">
      <div >
        <div className="flex items-center flex-wrap p-2 justify-between ">
          {/* MENU HAMBURGUESA */}
          <div className={`${searchFocused ? "hidden sm:block" : ""} block lg:hidden`}>
            <button onClick={handleMenu} className="flex py-2 hover:border-grey">
              <FontAwesomeIcon icon={faBars} className="w-5 top-6 ml-2 mr-0 items-center" />
            </button>
          </div>

          {/* LOGO */}
          <Link legacyBehavior href="/">
            <div className="flex sm:block cursor-pointer flex-row items-center">
              <img
                src={logo.src}
                className={`${searchFocused ? "hidden sm:block" : ""} w-32 mx-16 ml-8 md:mx-70 lg:mx-4 lg:w-32`}
              />
            </div>
          </Link>

          {/* SEARCH */}
          <div className="flex-1 ml-2">
            <NavSearch setSearchFocus={(e) => handleSearchFocus(e)} />
          </div>

          {/* SESION */}
          <div className={`${searchFocused ? "hidden sm:block" : ""} lg:order-3`}>
            <div
              title={session ? "Sign Out" : "Sign On"}
              className="flex md:-mt-1 flex-wrap ml-2 md:ml-1 object-right p-2 lg:order-last md:p-3 rounded-lg hover:text-palette-secondary"
              onClick={handleSession}>
              <FontAwesomeIcon icon={session ? faSignOutAlt : faDoorOpen} className="w-6 m-auto" />
            </div>
          </div>

          {/* CARRITO */}
          <div className={`${searchFocused ? "hidden sm:block" : ""} lg:order-3`}>
            <Link href="/cart" passHref>
              <div className="flex md:-mt-1 flex-wrap ml-2 md:ml-1 object-right p-2 lg:order-last md:p-3 rounded-lg hover:text-palette-secondary" aria-label="cart">
                <FontAwesomeIcon
                  className="text-palette-primary hover:text-palette-secondary h-6"
                  icon={faShoppingCart}
                />
                {cartItems === 0 ? null : (
                  <div className=" text-xs bg-palette-secondary rounded-full text-white font-semibold py-1 px-2 ">
                    {cartItems}
                  </div>
                )}
              </div>
            </Link>
          </div>

          {/* OBJETOS DEL MENU */}
          <div
            id="menu"
            className={`w-full block flex-grow ${isShow ? "" : "hidden"} divide-y divide-y-reverse justify-end divide-gray-200 lg:divide-none lg:flex lg:justify-self-center lg:w-auto`}
          >

            {/* ADMINISTRACION */}
            <Link legacyBehavior href="/admin">
              <div
                className={session?.user?.role.includes("ADMIN") ? "text-smw block mt-4 lg:inline-block lg:mt-0 text-m font-primary text-palette-primary tracking-tight ml-7 md:p-2 rounded-md hover:text-palette-secondary cursor-pointer" : "hidden"}
              >
                ADMINISTRACIÓN
              </div>
            </Link>

            {/* TUS COMERCIOS */}
            <Link legacyBehavior href="/stores/list">
              <div
                className={session ? "text-smw block mt-4 lg:inline-block lg:mt-0 text-m font-primary text-palette-primary tracking-tight ml-7 md:p-2 rounded-md hover:text-palette-secondary cursor-pointer" : "hidden"}
              >
                TUS COMERCIOS
              </div>
            </Link>

            {/* NOSOTROS */}
            <Link legacyBehavior href="/about">
              <div
                className="text-smw block mt-4 lg:inline-block lg:mt-0 text-m font-primary text-palette-primary tracking-tight ml-7 md:p-2 rounded-md hover:text-palette-secondary cursor-pointer"
              >
                NOSOTROS
              </div>
            </Link>
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
    </header >
  );
}

export default Nav;
