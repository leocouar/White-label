import Link from "next/link";

const Admin = () => {
    return (

            <div className="antialiased bg-gray-600  font-ssans flex flex-wrap">
            <div className="flex flex-wrap w-96 container mx-auto">
                <Link href="/bills">
                    <div className="pl-1 my-4 w-96 h-20 bg-green-400 rounded-lg shadow-md cursor-pointer">
                        <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                            <div className="my-auto">
                                <p className="font-bold">Facturaci&oacute;n</p>
                                <p className="text-lg">Detalle de las facturas generadadas</p>
                            </div>
                            <div className="my-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </Link>
                <Link href="/stock">
                    <div className="pl-1 my-4 w-96 h-20 bg-blue-500 rounded-lg shadow-md cursor-pointer">
                        <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                            <div className="my-auto">
                                <p className="font-bold">Stock</p>
                                <p className="text-lg">Detalle del stock de lo articulos</p>
                            </div>
                            <div className="my-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </Link>
                <Link href="/products">
                    <div className="pl-1 my-4 w-96 h-20 bg-yellow-400 rounded-lg shadow-md cursor-pointer">
                        <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                            <div className="my-auto">
                                <p className="font-bold">Articulos</p>
                                <p className="text-lg">Detalle de los articulos</p>
                            </div>
                            <div className="my-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </Link>
                <Link href="/users">
                    <div className="pl-1 my-4 w-96 h-20 bg-yellow-400 rounded-lg shadow-md cursor-pointer">
                        <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                            <div className="my-auto">
                                <p className="font-bold">Usuarios</p>
                                <p className="text-lg">Detalle de los usuario del cargados</p>
                            </div>
                            <div className="my-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="flex flex-wrap w-96 container mx-auto">
                    <Link href="/checkout">
                        <div className="pl-1 my-4 w-96 h-20 bg-green-400 rounded-lg shadow-md cursor-pointer">
                            <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                                <div className="my-auto">
                                    <p className="font-bold">Checkout</p>
                                    <p className="text-lg">Detalle de los checkouts generados</p>
                                </div>
                                <div className="my-auto">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link href="/brand">
                        <div className="pl-1 my-4 w-96 h-20 bg-blue-500 rounded-lg shadow-md cursor-pointer">
                            <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                                <div className="my-auto">
                                    <p className="font-bold">Marcas</p>
                                    <p className="text-lg">Detalle de las marcas de articulos</p>
                                </div>
                                <div className="my-auto">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link href="/products">
                        <div className="pl-1 my-4 w-96 h-20 bg-yellow-400 rounded-lg shadow-md cursor-pointer">
                            <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                                <div className="my-auto">
                                    <p className="font-bold">EN PROGRESO</p>
                                    <p className="text-lg"></p>
                                </div>
                                <div className="my-auto">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link href="/users">
                        <div className="pl-1 my-4 w-96 h-20 bg-yellow-400 rounded-lg shadow-md cursor-pointer">
                            <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                                <div className="my-auto">
                                    <p className="font-bold">EN PROGRESO</p>
                                    <p className="text-lg"></p>
                                </div>
                                <div className="my-auto">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
    )

}

export default Admin