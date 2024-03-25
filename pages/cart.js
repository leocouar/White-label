import SEO from '@/components/SEO'
import PageTitle from '@/components/PageTitle'
import CartTable from '@/components/cart/CartTable'
import BackToProductButton from '@/components/products/BackToProductButton'
import { useCartContext, useCleanCartContext } from '@/context/Store'
import { buyWithPoints, createCheckout, getPreference } from "../services/productService";
import React, { useEffect, useState } from "react";
import Loading from "@/components/utils/Loading";
import { getSession } from 'next-auth/react'
import { getPoints } from "../services/walletService";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession } from 'next-auth/react'
import MercadoPago from '@/components/mercadoPago/MercadoPago'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArchive, faMoneyBill, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import PriceFormatter from '@/components/products/PriceFormat'


function CartPage({ myPoints, user }) {
    const pageTitle = `Cart | ${process.env.siteTitle}`
    const [cart, checkoutUrl] = useCartContext()
    const [preference, setPreference] = useState();
    const [checkout, setCheckout] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const cleanCart = useCleanCartContext();
    const { data: session, status } = useSession()
    const [totalAmount, setTotalAmount] = useState(0)
    const [items, setItems] = useState(cart.length);

    useEffect(() => {
        let total = cart.reduce((a, v) => a + v.price * v.quantity, 0);
        total = total.toFixed(2);
        setTotalAmount(total);
        setItems(cart.length);
    }, [cart]);



    const preparePreference = () => {
        setLoading(true);
        getPreference(cart, session?.user?.username).then((res) => {
            setPreference(res.data);
            setLoading(false);
        });
    }

    const [zoomFactor, setZoomFactor] = useState(1);

    useEffect(() => {
      const handleResize = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 320) {
            setZoomFactor(0.55);
        } else if (screenWidth < 380) {
          setZoomFactor(0.65);
        } else if (screenWidth < 576) {
          setZoomFactor(0.75);
        } else {
          setZoomFactor(1);
        }
      };
  
      handleResize();
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    return (
        <div className='bg-white lg:px-6 flex justify-center items-center pb-32'>
            <div className='flex sm:content-start ' style={{ transform: `scale(${zoomFactor})` }}>
                <div className="sm:px-10 bg-white mx-auto">
                    <SEO title={pageTitle} />
                    <PageTitle text="Tu Compra" />
                    {
                        totalAmount == 0 && cart.length >= 1
                            ?
                            <div
                                className="flex items-center justify-center m-auto w-3/6 bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-center text-red-700 mb-3"
                                role="alert">
                                ¡Encontramos el item en el carro con importes igual a cero!
                            </div>
                            :
                            <></>
                    }
                    {
                        items == 0
                            ?
                            <>
                                <h1 className="leading-relaxed font-primary justify-between font-extrabold text-3xl text-center text-palette-primary mt-4 py-2 sm:py-4">
                                    No hay Art&iacute;culos por aqu&iacute;
                                </h1>
                                <div className="w-80 m-auto">
                                    <BackToProductButton />
                                </div>
                            </>
                            :
                            <>
                                <CartTable
                                    cart={cart}
                                />
                                <h1 className="leading-relaxed font-primary text-2xl text-center text-palette-primary py-2 sm:py-4">
                                    Precio total: ${PriceFormatter(totalAmount)}
                                </h1>
                                <div className="max-w-sm mx-auto space-y-4 px-2">
                                    <BackToProductButton />
                                    {
                                        preference != null
                                            ?
                                            <MercadoPago preference={preference} />
                                            :
                                            <>
                                                <a onClick={preparePreference}
                                                    aria-label="checkout-products"
                                                    className="bg-blue-500 text-white text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex cursor-pointer justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-full hover:bg-blue-600 rounded-sm"
                                                >Pagar con Mercado Pago</a>
                                                <a onClick={cleanCart}
                                                    aria-label="checkout-products"
                                                    className="bg-gray-500 text-white text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex cursor-pointer justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-full hover:bg-gray-600 rounded-sm"
                                                >Vaciar carrito</a>
                                            </>
                                    }                               {
                                        loading
                                            ?
                                            <Loading message={"Espere un momento por favor"} />
                                            :
                                            <></>
                                    }
                                </div>
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

export default CartPage

export async function getServerSideProps(context) {
    const session = await getSession(context)

    if (session == null) {
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
            props: {},
        };
    }
    const myPoints = await getPoints(session?.user?.username);
    const user = session?.user;
    return {
        props: {
            myPoints,
            user
        },
    }
}
