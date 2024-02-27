import ProductImage from '@/components/products/ProductImage'
import ProductDetails from '@/components/products/ProductDetails'

function ProductSection({ productData }) {
    return (
        <>
            <div className="flex flex-wrap my-4 bg-white justify-evenly md:flex-row">
                <div className='w-auto'>
                    <ProductImage images={productData.images} id={productData.id} storeId={productData.store.id} />
                </div>
                <div className='w-auto'>
                    <ProductDetails productData={productData} />
                </div>
            </div>
        </>
    )
}

export default ProductSection
