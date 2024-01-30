import { NotificationContainer } from "react-notifications";
import useForm from "../../hooks/useForm";
import { useState, useMemo, useEffect, useRef } from "react";
import * as brandsService from 'services/brandService';
import * as categoriesService from "services/categoriesService";
import * as sizeService from "services/sizeService";
import * as storeService from "services/storeService";
import { save } from "services/productService";

const NewProduct = ({ store, onCancel, admin = false }) => {
    const [sizeToCheck, setsizeToCheck] = useState([]);
    const [categories, setCategories] = useState()
    const [brands, setBrands] = useState()
    const [sizes, setSizes] = useState([])
    const [stores, setStores] = useState();
    const [reloadStoreSel, setReloadStoreSel] = useState(false);
    const selectStore = useRef();

    useEffect(() => {
        const fetchData = async () => {
            const categorieList = await categoriesService.findAll()
            const brandList = await brandsService.findAll()
            const sizeList = await sizeService.findAll()

            setCategories(categorieList);
            setBrands(brandList);
            setSizes(sizeList);

            if (admin) {
                const storeList = await storeService.findAllStores();
                setStores(storeList);
            }
        };

        fetchData();
    }, []);

    const initialForm = useMemo(() => ({
        name: "",
        price: "",
        description: "",
        category: {
            id: ""
        },
        brand: {
            id: ""
        },
        store: {
            id: store?.id || ""
        },
        sizes: [{
            id: "" //ID=1814 pertenece a sin talle en produccion
        }],
        code: "",
        stock: "",
        points: "",
        promo: false,
    }), [store?.id]);

    const validationsForm = (form) => {
        let errors = {};
        
        if (!form.name.trim()) {
            errors.name = "El campo 'Nombre' es requerido";
        }

        if (!form.price.trim()) {
            errors.price = "El campo 'Precio' es requerido";
        }

        /*
        if (!form.description.trim()) {
             errors.description = "El campo 'Descripcion' es requerido";
        }
        */        

        if (form.category.id === "") {
            errors.category = "El campo 'Categoria' es requerido";
        }

        if (form.brand.id === "") {
            errors.brand = "El campo 'Marcas' es requerido";
        }

        if (form.store.id === "" && admin) {
            errors.store = "El campo 'Comercio' es requerido";
        }

        if (!form.sizes[0] || form.sizes[0].id === 0) {
            errors.sizes = "El campo 'Talles' es requerido";
        }
        /*
        if (!form.code.trim()) {
            errors.code = "El campo 'Codigo' es requerido";
        }

        if (!form.stock.trim()) {
            errors.stock = "El campo 'Stock' es requerido";
        }

        if (!form.points.trim()) {
            errors.points = "El campo 'Puntos' es requerido";
        }
        */
        return errors;
    };

    const { form, setForm, errors, handleChange, handleBlur, handleSubmit } =
        useForm(initialForm, validationsForm, save);

    
    const handleChangeSize = (e) => {
        const final = Number(e.target.value)
        if ((final !== null && e.target.value !== 'Seleccionar' && !(sizeToCheck.map(size => size.id)).includes(final))) {
            setsizeToCheck([
                ...sizeToCheck,
                { id: final, name: sizes.find(size => size.id == final).name }
            ]);
        }
    }
    
    const deleteSize = (e) => {
        const value = Number(e.target.value)
        setsizeToCheck(
            sizeToCheck.filter(size => size.id !== value)
            )
        }
        
    useEffect(() => {
        setForm((prevForm) => ({
            ...prevForm,
            sizes: sizeToCheck,
        }));
    }, [sizeToCheck]);
        
    const handleChangeStore = (e) => {
        if (e.target) {
            const finalStore = {
                "id": e.target.value
            };
            setForm((prevForm) => ({
                ...prevForm,
                store: finalStore,
            }));
        }
        setReloadStoreSel((prev) => !prev);
    };

    return <>
        <NotificationContainer />
        <div className="inset-0 z-10 flex items-center justify-center ">
            <form className="w-full px-6 " onSubmit={handleSubmit}>
                <h2 className="text-black font-primary text-center font-bold text-xl mb-5 lg:text-3xl">Agregar Producto</h2>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-4">
                        <div className="w-full">
                            <label className="block uppercase  text-gray-700 text-xs font-bold mb-3"
                                htmlFor="name">
                                Nombre*
                            </label>
                            <input
                                autoComplete="off"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="name" type="text"
                                placeholder="Nombre del Producto"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                //required
                            />
                            {errors.name && <p className={`text-red-500 text-xs italic`}>{errors.name}</p>}
                        </div>
                        <div className="w-full">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3"
                                htmlFor="descripcion">
                                Descripcion
                            </label>
                            <input
                                autoComplete="off"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="descripcion"
                                placeholder="Descripci&oacute;n del producto"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {/*errors.description && <p className={`text-red-500 text-xs italic`}>{errors.description}</p>*/}
                        </div>

                        <div className="w-full">
                        <label className="block uppercase block tracking-wide text-palette-primary text-xs font-bold mb-3"
                            htmlFor="size">
                            Talles*
                        </label>
                        <select onChange={handleChangeSize} onBlur={handleBlur} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="size">
                            <option value={null}>Seleccionar</option>
                            {
                                sizes ? sizes.map(size => (
                                    <option value={size.id}>{size.name}</option>
                                )) : 
                                <option>Talles</option>
                            }
                        </select>
                        <div className="flex flex-wrap gap-2 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight">
                            { sizeToCheck.length!==0 ?
                                sizeToCheck.map( (size)  => {
                                    return(
                                    <div className="flex justify-between rounded shadow-xl bg-gray-500 text-white" key={size.id} onBlur={handleBlur}>
                                        <div className="flex m-auto text-xs p-2"> {size.name} </div>
                                        <button className="w-6 rounded-r bg-red-400 hover:bg-red-300 uppercase text-white h-full" onClick={e => {deleteSize(e)}} value={size.id}>x</button>
                                    </div>
                                    )
                                })
                            : <p className="italic text-gray-400">Debe seleccionar al menos una opción</p>
                            }
                            {errors.sizes &&  <p className={`text-red-500 text-xs italic`}>{errors.sizes}</p>}
                        </div>
                    </div> 
                        {/* <div className="w-full">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3"
                                htmlFor="codigo">
                                C&oacute;digo
                            </label>
                            <input
                                autoComplete="off"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="codigo" type="text" placeholder="Cod. del producto"
                                name="code"
                                value={form.code}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            {errors.code && <p className={`text-red-500 text-xs italic`}>{errors.code}</p>}
                        </div> */}

                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-4">
                        <div className="w-full">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3"
                                htmlFor="category">
                                Categoria*
                            </label>
                            <select value={form.category.id} onChange={handleChange} name="category" onBlur={handleBlur} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="category">
                                <option disabled={true} value="">Seleccionar</option>
                                {
                                    categories && categories.map(category => (
                                        <option value={category.id}>{category.name}</option>
                                    ))
                                }
                            </select>
                            {errors.category && <p className={`text-red-500 text-xs italic`}>{errors.category}</p>}
                        </div>
                        <div className="w-full">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3"
                                htmlFor="brand">
                                Marca*
                            </label>
                            <select value={form.brand.id} onChange={handleChange} name="brand" onBlur={handleBlur} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="brand">
                                <option disabled={true} value="">Seleccionar</option>
                                {
                                    brands && brands.map(brand => (
                                        <option value={brand.id}>{brand.name}</option>
                                    ))
                                }
                            </select>
                            {errors.brand && <p className={`text-red-500 text-xs italic`}>{errors.brand}</p>}
                        </div>
                        <div className="w-full md:w-1/2 mb-3">
                            <label htmlFor="price" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Precio*
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div>
                                    <span className="text-center flex p-3 absolute text-gray-500 sm:text-sm align-middle">
                                        $
                                    </span>
                                    <input
                                        //required
                                        type="number"
                                        id="price"
                                        autoComplete="off"
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-1 pl-6 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        placeholder="0.00" name="price"
                                        value={form.price}
                                        onChange={handleChange}
                                        onBlur={handleBlur}                                        
                                        maxLength="7"
                                        onKeyDown={(event) => {
                                            if (!/[0-9]?[0-9]?(\.[0-9][0-9]?)?/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }}
                                    />
                                </div>
                                {errors.price && <p className={`text-red-500 text-xs italic`}>{errors.price}</p>}
                            </div>
                        </div>
                        {/* <div className="flex flex-wrap -mx-3">
                            <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="Stock">
                                Stocks
                            </label>
                            <input
                                id="Stock" type="number"
                                placeholder="Stocks"
                                name="stock"
                                autoComplete="off"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                value={form.stock}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                // required
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                            />
                            {errors.stock && <p className={`text-red-500 text-xs italic`}>{errors.stock}</p>}

                        </div>
                        </div> */}
                        <div className={`${admin ? "w-full" : "hidden"}`}>
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3"
                                htmlFor="store">
                                Comercio*
                            </label>
                            <select ref={selectStore} value={form.store.id} onChange={handleChangeStore} name="store" onBlur={handleBlur} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="store">
                                <option disabled={true} value="">Seleccionar</option>
                                {
                                    stores && stores.map(store => (
                                        <option value={store.id}>{store.name}</option>
                                    ))
                                }
                            </select>
                            {errors.store && <p className={`text-red-500 text-xs italic`}>{errors.store}</p>}
                        </div>
                    </div>
                </div>

                <div className="flex space-x-2 mt-8 justify-end">
                    <button type="button" className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded-md mr-2"
                        onClick={onCancel}
                    >
                        Cancelar
                    </button>
                    <button type="submit" className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-md"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    </>;
}
export default NewProduct;