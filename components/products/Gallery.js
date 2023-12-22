import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ProductCard from "@/components/products/ProductCard";
import {useRef, useEffect, useState } from "react";

const Gallery = ({ productData }) => {
    const chunkSize = 4; // Tamaño de cada conjunto de productos
    const [groupedProducts, setGroupedProducts] = useState([]);
    const carouselRef = useRef(null);

    useEffect(() => {
        const grouped = [];
        for (let i = 0; i < productData.length; i += chunkSize) {
            grouped.push(productData.slice(i, i + chunkSize));
        }
        setGroupedProducts(grouped);

        if (carouselRef.current) {
            carouselRef.current.moveTo(0);
        }
    }, [productData, chunkSize]);


    return (
        <div>
            <Carousel
                ref={carouselRef}
                showArrows={true}
                infiniteLoop={true}
                selectedItem={0}
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                    hasPrev && (
                        <button
                            type="button"
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
                            onClick={onClickHandler}
                            aria-label={label}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
                        </button>
                    )
                }
                renderArrowNext={(onClickHandler, hasNext, label) =>
                    hasNext && (
                        <button
                            type="button"
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
                            onClick={onClickHandler}
                            aria-label={label}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                        </button>
                    )
                }
                className="relative"
            >
                {groupedProducts.map((products, index) => (
                    <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-9 2xl:gap-4" key={index}>
                        {products.map((product, innerIndex) => (
                            <div
                                key={innerIndex}
                                className="m-auto bg-white shadow-md rounded-lg p-4 w-80 h-120"
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Gallery