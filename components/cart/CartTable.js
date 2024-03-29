import { useState, useEffect } from 'react'
import { useUpdateCartQuantityContext } from '@/context/Store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Price from '@/components/products/Price'
import { getCartSubTotal } from '@/utils/helpers'
import logo from "../../images/default.jpeg";
import Image from 'next/image'
import React from 'react'
import checkInputNumber from '../NumberInput'

function CartTable({ cart }) {
  const updateCartQuantity = useUpdateCartQuantityContext()
  const [groupedItems, setGroupedItems] = useState([]);         //Subdivide los items del carrito por tienda
  const [subtotal, setSubtotal] = useState(0);

  const defaultImage = {
    "url": "default.jpeg",
    "link": logo,
    "main": false
  };

  const gropeItems = cart.reduce((groups, item) => {
    const storeName = item.store?.name;

    if (!groups.some(store => store.name === storeName)) {
      groups.push({
        id: item.store?.id,
        name: storeName,
        items: [],
        logoLink: item.store?.logo ? item.store.logo.link : null
      });
    }

    const store = groups.find(store => store.name === storeName);
    store.items.push(item);

    return groups;
  }, []);


  useEffect(() => {
    setGroupedItems(gropeItems)
    setSubtotal(getCartSubTotal(cart))
  }, [cart])

  const updateItem = (id, quantity) => {
    updateCartQuantity(id, quantity)
  }

  const eraseStoreGroup = (i) => {
    const updatedGroupedItems = [...groupedItems];
    const storeRemoved = updatedGroupedItems.splice(i, 1)[0];
    storeRemoved.items.map((removed) => {
      updateCartQuantity(removed.id, 0);
    });

    setGroupedItems(updatedGroupedItems);
  };

  return (
    <>
      {groupedItems.map((storeName, index) => (
        <React.Fragment key={index}>
          <table className="min-h-50 max-w-4xl my-4 sm:my-8 sm:mx-auto sm:w-full">
            <thead>
              <tr>
                <td colSpan="5">
                  <div className="flex items-center font-primary font-semibold px-6 py-2">
                    <img
                      src={groupedItems[index].logoLink}
                      className="rounded-md mr-2"
                      style={{ width: "4rem" }}
                      alt="Logo"
                    />
                    <h1 className="text-xl">
                      <Link legacyBehavior passHref href={`/commerce/${groupedItems[index].id}`}>
                        <a className="pt-1 hover:text-palette-dark ml-4 truncate">
                          {groupedItems[index].name}
                        </a>
                      </Link>
                    </h1>
                  </div>
                </td>
              </tr>
              <tr className="uppercase text-xs sm:text-sm text-palette-primary border-b ">
                <th className="text-xs text-left font-primary font-normal px-6 py-4">Producto</th>
                <th className="font-primary font-normal px-2 sm:px-6 py-2">Cantidad</th>
                <th className="font-primary font-normal px-2 sm:px-6 py-2">P. Unitario</th>
                <th className="font-primary font-normal px-2 sm:px-6 py-2">P. Total</th>
                <th className="font-primary font-normal px-2 sm:px-6 py-2 table-cell">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {groupedItems[index].items.map((item, index) => (
                item.quantity > 0 && (
                  <tr key={index} className="text-sm sm:text-base text-gray-600 text-center">
                    <td className="font-primary font-medium px-2 sm:px-6 py-2 flex items-center">
                      <Image src={item.productImage ? item.productImage : defaultImage}
                        width={50}
                        height={50}
                        className="w-12 h-12 rounded-full hidden sm:inline" />
                      <Link legacyBehavior passHref href={`/products/${item.id}`}>
                        <a className="pt-1 hover:text-palette-dark ml-4 truncate">
                          {item.productTitle}
                        </a>
                      </Link>
                    </td>
                    <td className="font-primary font-medium px-2 sm:px-6 py-2">
                      <input
                        type="number"
                        inputMode="numeric"
                        id="variant-quantity"
                        name="variant-quantity"
                        min="1"
                        step="1"
                        value={item.quantity}
                        maxLength={2}
                        onChange={(e) => updateItem(item.id, e.target.value)}
                        className="text-gray-900 form-input border border-gray-300 w-16 rounded-sm focus:border-palette-light focus:ring-palette-light"
                        onKeyDown={(event) => checkInputNumber(event, item.quantity, 2)}
                      />
                    </td>
                    <td className="font-primary text-base font-light px-2 sm:px-6 py-2">
                      <Price
                        currency="$"
                        num={item.price}
                        numSize="text-lg"
                      />
                    </td>
                    <td className="font-primary text-base font-light px-2 sm:px-6 py-2">
                      <Price
                        currency="$"
                        num={(item.price * item.quantity).toFixed(2)}
                        numSize="text-lg"
                      />
                    </td>

                    <td className="font-primary font-medium px-4 sm:px-6 py-4 table-cell">
                      <button
                        aria-label="delete-item"
                        className=""
                        onClick={() => updateItem(item.id, 0)}
                      >
                        <FontAwesomeIcon icon={faTimes} className="w-8 h-8 text-palette-primary border border-palette-primary p-1 hover:bg-palette-lighter" />
                      </button>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </React.Fragment>
      ))
      }
    </>
  );
}

export default CartTable
