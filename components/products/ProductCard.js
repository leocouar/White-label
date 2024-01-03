
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
      className="w-full sm:w-56 bg-white overflow-visible sm:rounded-lg sm:shadow-lg sm:mx-5 sm:my-4 border-b-2 sm:border-2 transform transition duration-200 ease-in-out sm:hover:scale-105"
    >
      <div className="flex flex-wrap relative">
        <div className="relative left-2 top-2 bottom-2 sm:static w-1/3 h-36 sm:h-auto sm:w-auto sm:m-2">
          <img className="w-11/12 h-32 sm:h-52 sm:w-52 rounded-md sm:rounded-lg" src={image.src ? image.src : image}></img>
        </div>

        {
          promo
            ?
            <span className={'absolute py-3 sm:py-6 px-1 sm:px-3 smalltext sm:text-xs text-white bottom-2 sm:bottom-auto sm:top-40 left-1/4 sm:left-auto sm:-right-4 bg-palette-secondary rounded-full'}><p>Promo!</p></span>
            :
            <></>
        }
        <div className="w-2/3 sm:w-full self-center">
          <div className="bg-white text-left font-primary truncate text-palette-primary text-lg px-2">
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
                <img
                  style={{ width: "4rem" }}
                  className="max-w-20 my-1 mx-1 rounded"
                  src={storeLogo?.link}
                  alt="Store Logo" />
              </Link>
            }
          </div>
        </div>
      </div>

    </Link>
  );
}

export default ProductCard