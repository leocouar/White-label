import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faTag, faImages } from '@fortawesome/free-solid-svg-icons'
import { useAddToCartContext } from '@/context/Store'
import UploadFile from "@/components/products/UploadFile";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { activateProduct, deleteProduct, updateAsAPromotion } from 'services/productService';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { getStoresByUser } from 'services/storeService';
import WhatsAppButton from '../whatsapp/WhatsAppButton';
import FavoriteButton from '../favorites/FavoriteButton';

function ProductForm({ productData, image }) {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useAddToCartContext();
  const [openUploadFile, setOpenUploadFile] = useState(false);
  const router = useRouter();
  const [promo, setPromo] = useState(productData?.promo);
  const [status, setStatus] = useState(productData?.deleted)
  const wspMsj = "¡Hola!, me comunico para consultar acerca del producto " + productData?.name;

  const { data: session } = useSession()
  const [userCanEdit, setUserCanEdit] = useState(false);

  const evaluateUser = async () => {
    const currentUser = session?.user;
    const storeId = productData?.store?.id;
    const storesData = await getStoresByUser(currentUser?.username);

    currentUser && currentUser?.role?.includes("ADMIN") ?
      setUserCanEdit(true)
      :
      storesData && storesData.map((store) => {
        if (store.id === storeId) {
          setUserCanEdit(true);
        }
      });
  }

  useEffect(() => {
    evaluateUser();
  }, [session])

  const handlePromo = async () => {
    let producToUpdate = {
      id: productData?.id,
      promo: !promo
    }
    let product = await updateAsAPromotion(producToUpdate);
    setPromo(product.data.promo)
  }

  async function handleAddToCart() {
    if (session) {
      if (quantity !== '') {
        addToCart({
          productTitle: productData?.name,
          productImage: image,
          store: productData?.store,
          quantity: quantity,
          id: productData?.id,
          price: productData?.price,
          size: 7
        });
        NotificationManager.info(productData?.name, 'Agregado al carro de compras', 2000, () => {
          router.push('/cart');
        });
      }
    } else {
      // Si el usuario no está logueado, redirige a la página de inicio de sesión.
      router.push('/login');

      // También puedes mostrar un mensaje antes de redirigir, si lo prefieres.
      // NotificationManager.warning('Inicia sesión para agregar productos al carrito', '¡Atención!', 2000);
    }
  }


  async function deleteAProduct() {
    try {
      let result = await deleteProduct(productData?.id)
      setStatus(result.data.deleted)
      NotificationManager.error('No se mostrara en los resultados de busqueda', 'Baja de producto', 5000);
    }
    catch (error) {
      throw new Error("Fallo en la funcion de borrar producto")
    }
  }

  async function activeProduct() {
    try {
      let result = await activateProduct(productData?.id)
      setStatus(result.data.deleted)
      NotificationManager.info('Se mostrara en los resultados de busqueda', 'Producto Activo', 5000);
    }
    catch (error) {
      throw new Error("Fallo en la funcion de activar producto")
    }
  }

  const goToEdit = () => {
    window.location.href = '/products/update/' + productData?.id
  }

  useEffect(() => {
    // Restablecer la cantidad a 1 cuando cambia el ID del producto
    setQuantity(1);
  }, [productData?.id]);
  
  function updateQuantity(e) {
    if (e === '') {
      setQuantity('')
    } else {
      setQuantity(Math.floor(e))
    }
  }

  return (
    <>
      <NotificationContainer />
      <div id="productForm" className="w-full">
        <div className="w-full">
          <div className="flex flex-col space-y-2">
            <div className="flex">
              <div className="flex-col items-start space-y-1 mr-2">
                <input
                  type="number"
                  inputMode="numeric"
                  id="quantity"
                  name="quantity"
                  min="1"
                  step="1"
                  value={quantity}
                  onChange={(e) => updateQuantity(e.target.value)}
                  className="text-gray-900 form-input border border-gray-300 w-16 rounded-sm focus:border-palette-light focus:ring-palette-light"
                />
              </div>
              {/*
              <div className="flex-col items-start space-y-1">

                {productData?.sizes.length > 0 ? (
                  <>
                    <select
                      name="category"
                      className="appearance-none  w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-400"
                      id="size"
                    >
                      <option disabled={true} value="-1">
                        Seleccionar
                      </option>
                      {
                        productData?.sizes.map((provider) => (
                          <option key={provider.id} name={provider.name} value={provider.id}>
                            {provider.name}
                          </option>
                        ))
                      }
                    </select>
                  </>
                ) : (
                  <label id='size' className="block text-gray-700 text-sm font-bold mb-2 mt-3">Talle Único</label>
                )}
                </div>
                */}
            </div>

            {
              status == true
                ?
                <div className="bg-red-500 text-white p-4 rounded-lg">
                  Producto inactivo
                </div>
                :
                <div className="flex flex-col items-start space-y-1">
                  <button
                    onClick={handleAddToCart}
                    aria-label="add-to-cart"
                    className="border border-palette-primary bg-purple-500 hover:bg-purple-600 text-lg text-white font-primary font-semibold pt-2 pb-1 leading-relaxed flex justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-full rounded-md cursor-pointer  pl-4 pr-4"
                  >
                    Agregar al carrito
                  </button>
                </div>
            }

            <WhatsAppButton
              phoneNumber={"549" + productData?.store?.telephone}
              message={wspMsj}
            />
            <FavoriteButton/>
          </div>
        </div>

        {
          userCanEdit
            ?
            <div className='display flex w-full justify-between h-12'>

              {

                status == false
                  ?
                  <button onClick={deleteAProduct} className="bg-palette-primary text-white w-1/4 mt-2 mr-3  rounded-md font-primary font-semibold text-xs flex
                          justify-center items-baseline hover:scale-110 transform transition duration-200 group cursor-pointer">
                    <p className="hidden m-1 group-hover:block">Eliminar Producto</p>
                    <FontAwesomeIcon icon={faTrash} className="w-5 m-auto group-hover:hidden" />
                  </button>
                  :
                  <>
                    <button onClick={activeProduct} className="bg-blue-500 text-white w-1/4 mt-2 mr-3 rounded-md font-primary font-semibold text-xs flex justify-center items-baseline hover:scale-110 transform transition duration-200 group cursor-pointer">
                      <p className="hidden m-1 group-hover:block">Activar Producto</p>
                      <FontAwesomeIcon icon={faPlus} className="w-5 m-auto group-hover:hidden" />
                    </button>
                  </>
              }
              <div
                aria-label="upload-images"
                className="bg-palette-primary text-white w-1/4 mt-2 mr-3 h-auto  font-primary font-semibold text-xs flex
                   justify-center items-baseline hover:scale-110 transform transition duration-200 group rounded-md cursor-pointer"
                onClick={() => setOpenUploadFile(true)}
              >
                <p className="hidden m-1 group-hover:block text-center">Subir Imagenes</p>
                <FontAwesomeIcon icon={faImages} className="w-5 m-auto group-hover:hidden" />
              </div>

              <div
                aria-label="edit-data"
                className="bg-palette-primary text-white text-center w-1/4 mt-2 mr-3 rounded-md font-primary font-semibold text-xs flex
                    justify-center items-baseline hover:scale-110 transform transition duration-200 group  cursor-pointer"
                onClick={goToEdit}>
                <p className="hidden m-1  group-hover:block">Editar Producto</p>
                <FontAwesomeIcon icon={faEdit} className="w-5 m-auto group-hover:hidden" />
              </div>

              {

                promo
                  ?
                  <button type='checkbox'
                    className="bg-blue-300 text-white text-center w-1/4 mt-2 rounded-md font-primary font-semibold text-xs flex
                        justify-center items-baseline hover:scale-125 transform transition duration-500 group cursor-pointer"
                    onClick={handlePromo} >
                    <p className="hidden m-1 group-hover:block">Eliminar Promocion</p>
                    <FontAwesomeIcon icon={faTag} className="w-5 m-auto group-hover:hidden" />
                  </button>

                  :
                  <button type='checkbox'
                    className="bg-palette-secondary text-white text-center w-1/4 mt-2 rounded-md font-primary font-semibold text-xs flex
                        justify-center items-baseline hover:scale-125 transform transition duration-500 group cursor-pointer"
                    onClick={handlePromo} >
                    <p className="hidden m-1 group-hover:block">Añadir Promocion</p>
                    <FontAwesomeIcon icon={faTag} className="w-5 m-auto group-hover:hidden" />
                  </button>
              }

              <UploadFile
                isOpen={openUploadFile}
                setIsOpen={setOpenUploadFile}
                folder={productData?.id}

              />
            </div>
            :
            <></>
        }


      </div>
    </>

  )
}

export default ProductForm
