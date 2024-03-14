import Image from "@/components/products/Image";
import Link from "next/link";

const Details = ({ checkout }) => {
    return (
        <div className="">
            <table className="w-full divide-y divide-gray-200 border rounded-2xl">
                <thead className="bg-gray-300">
                    <tr>
                        <th></th>
                        <th scope="col"
                            className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                            Producto
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                            Cantidad
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                            Precio Unitario
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                            Total
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-gray-100 divide-y divide-gray-200 ">
                    {
                        checkout == undefined
                            ?
                            <></>
                            :
                            checkout.products.map((p, index) => (
                                <tr key={index}>
                                    <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                                        <Link  href={'/products/' + p.product.id}>
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
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {p.quantity}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {p.product.price.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {parseFloat(p.price * p.quantity).toLocaleString('es-ES', { minimumFractionDigits: 2 })}
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