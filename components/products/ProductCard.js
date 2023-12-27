
import Link from 'next/link'
import Price from '@/components/products/Price'
import logo from "../../images/default.jpeg";
import { useEffect, useState } from 'react';
import { getFile } from 'services/fileService';

function ProductCard({ product }) {
  const title = product.name;
  const price = product.price;
  const promo = product.promo;
  const storeLogo = product.store?.logo;
  const storeID = product.store?.id

  let defaultImage = {
    "url": "default.jpeg",
    "link": logo,
    "main": false
  };

  let image = product.images && product.images.length != 0 ? product.images[0].link : defaultImage.link

  return (
    <Link
      href={`/products/${product.id}`}
      passHref
      className="w-56 max-w-56 bg-white overflow-visible rounded-lg shadow-lg mx-5 my-4 border-2 transform transition duration-200 ease-in-out hover:scale-105"
    >
      <div className="relative">
        <div className="m-2">
          <img className="imgproduct rounded-lg" src={image.src ? image.src : image}></img>
        </div>
        
        {
          promo
            ?
            <span className={'absolute py-6 px-3 text-xs text-white -bottom-4 -right-4 bg-palette-secondary rounded-full'}><p className="-rotate-45">Promo!</p></span>
            :
            <></>
        }
      </div>
      <div className="w-full bg-white text-left font-primary truncate text-palette-primary text-lg px-2">
        {title}
      </div>
      <div className="flex relative items-center font-primary bottom-0 left-0">
        <Price currency="&emsp;$" num={price} numSize="text-xl" />
        <div className="flex-grow"></div>
        {storeLogo && 
          <Link
              href={`/commerce/${storeID}`}
              passHref
              className="hover:bg-indigo-200 mb-2 mr-2 rounded">
              <img className="max-w-20 my-1 mx-1 rounded"
                style={{width:"4rem"}} //Esto va aqui porque si una card aparece en la galeria, el style del carrusel sobreescribe la clase de Tailwind.
                src={storeLogo?.link} alt="Store Logo" />
            </Link>
          }
      </div>
    </Link>)
  );
}

export default ProductCard