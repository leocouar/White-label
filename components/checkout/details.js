import Image from "@/components/products/Image";
import Link from "next/link";

const Details = ({ checkout }) => {
    return (
        <div className="">
            <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th></th>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Producto
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cantidad
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Precio Unitario
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {
                        checkout == undefined
                            ?
                            <></>
                            :
                            checkout.products.map((p, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer">
                                        <Link href={'/products/' + p.product.id}>
                                            <Image product={p.product} />
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap max-w-40">
                                        <Link href={'/products/' + p.product.id}>
                                            <div className="flex cursor-pointer">
                                                <div className="text-sm font-medium text-gray-900">
                                                    <div>{p.product.name}</div>
                                                </div>
                                            </div>
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {p.quantity}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    $ {p.product.price.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        $ {parseFloat(p.price*p.quantity).toFixed(2)}
                                    </td>

                                </tr>
                            ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Details