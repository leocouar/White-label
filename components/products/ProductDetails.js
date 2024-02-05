import ProductInfo from '@/components/products/ProductInfo'
import ProductForm from '@/components/products/ProductForm'
import logo from "../../images/default.jpeg";
import BackToProductButton from './BackToProductButton';
import WhatsAppButton from '../whatsapp/WhatsAppButton';

function ProductDetails({ productData}) {
  const wspMsj = "¡Hola!, me comunico para consultar acerca del producto " + productData?.name;
    const defaultImage =
        {
            "url": "default.jpeg",
            "link": logo,
            "main": false
        };
        true
   const image = productData.images && productData.images.length != 0 ? productData.images[0].link : defaultImage.link

  return (

    <div className="flex py-1 flex-col justify-between max-w-xs space-y-4 min-h-128 w-60">  
      <div>
        <ProductInfo 
          title={productData.name}
          description={productData.description}
          price={productData.price}
        />
      </div>

      <ProductForm 
        productData={productData}
        image={image}
      />
      <div className=''>
        <BackToProductButton />
      </div>
      <WhatsAppButton
              phoneNumber={"549" + productData?.store?.telephone}
              message={wspMsj}
            />
    </div>
    
  )
}

export default ProductDetails
