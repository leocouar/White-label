import ProductCard from '@/components/products/ProductCard'
import { useEffect, useState, useRef } from "react";
import { fineProductsInStore } from 'services/productService';

function ProductByStoreId({ storeId }) {
    const [productsToShow, setProductsToShow] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [backToTopVisible, setBackToTopVisible] = useState(false)

    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const products = await fineProductsInStore(storeId);
            console.log('Fetched Products:', products);
            setProductsToShow(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (storeId) {
            fetchProducts();
        }
    }, [storeId]);

    //Vuelve al inicio de la pantalla
    function backToTopButton() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    useEffect(() => {
        const changeVisibility = () => {
          if (window.scrollY >= 90) {
            setBackToTopVisible(true)
          } else {
            setBackToTopVisible(false)
          }
        }
    
        window.addEventListener('scroll', changeVisibility)
      }, [])

    return (
        <div className='w-full'>
            <div className="mx-auto mt-5">
                <div className="flex flex-wrap justify-evenly">
                    {
                        productsToShow && productsToShow.map((product, index) => {
                            return <ProductCard key={index} product={product} />;
                        })
                    }
                </div>
                <button
                    type="button"
                    data-mdb-ripple="true"
                    onClick={backToTopButton}
                    data-mdb-ripple-color="light"
                    className={backToTopVisible?"z-0 shadow-lg invisible ml-2 md:visible ease-out duration-300 sticky p-2 bg-palette-secondary animate-bounce text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-palette-sdark hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg bottom-5 right-2":""}
                    id="btn-back-to-top"
                >
                    <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        className={backToTopVisible?"w-5 h-5":""}
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                    >
                        <path
                            fill="currentColor"
                            d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
                        ></path>
                    </svg>
                </button>
            </div>
            {
                isLoading
                    ?
                    <div className='flex items-center justify-center py-6'>
                        <div className='w-16 h-16 border-b-2 border-palette-secondary rounded-full animate-spin'></div>
                    </div>
                    :
                    <></>
            }
        </div>
    )
}

export default ProductByStoreId;

