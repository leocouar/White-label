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

  let defaultImage = {
    "url": "default.jpeg",
    "link": logo,
    "main": false
  };

  let image = product.images && product.images.length != 0 ? product.images[0].link : defaultImage.link

  return (
    (<Link
      href={`/products/${product.id}`}
      passHref
      className="w-80 max-w-80 bg-white overflow-hidden rounded-lg shadow-lg mx-auto border border-palette-lighter transform transition duration-500 ease-in-out hover:scale-110"
    >
      <div className="m-2 border-palette-lighter relative">
        <img className="transform imgproduct" src={image.src ? image.src : image}></img>
        {
          promo
            ?
            <span className={'absolute py-2 px-8 text-sm text-white bottom-2 right-2 bg-palette-secondary rounded-md'}>Promo</span>
            :
            <></>
        }
      </div>
      <div className="w-full bg-white text-center font-primary truncate text-palette-primary text-2xl py-4 px-4 font-bold">
        {title}
      </div>
      <div className="flex items-center font-primary font-medium text-base bottom-0 left-0">
        <Price currency="&emsp;$" num={price} numSize="text-3xl" />
        <div className="flex-grow"></div>
        <img className="w-14 max-w-14 my-2 mx-2 rounded" src={storeLogo?.link} alt="Store Logo" />
      </div>

    </Link>)
  );
}

export default ProductCard
