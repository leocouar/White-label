import FilterComponent from  "@/components/filter/FilterComponent";
import DataTable  from "react-data-table-component";
import Link from 'next/link'
import { deleteProduct } from "services/productService";
import {useState, useMemo} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'

const Products = ({products}) => {
    const [filterText, setFilterText]= useState ('')
    const filteredItems = products.filter(item=> filterText.toLowerCase() == '' || filterText.includes(item.id));
    console.log(products);
    const [data,setData]= useState(filteredItems)

    const handleDelete = (rowId) => {
        const updatedData = data.filter(row => row.id !== rowId);
        setData(updatedData);
        deleteProduct(rowId)
      };


    const columns = [
            
        {
            
            name: 'Id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Nombre',
            selector: row => row.name ? row.name : "Producto",
            sortable: true
        },
        {
            name:'Categoria',
            selector: row => row.category ? row.category.name : "Categoria",
            sortable: true
        },
        {
            name:'Codigo',
            selector: row => row.code ? row.code : "Codigo",
            sortable: true
        },
        {
            name: 'Precio',
            selector: row =>row.price ? row.price : "Precio",
            sortable: true   
        },
        {
            name: 'Stock',
            selector:row=>row.stock ? row.stock : "Stock",
            sortable: true
        },
        {
            name: 'Puntos',
            selector:row=>row.points ? row.points : "Puntos",
            sortable: true
        },
        {
            name: 'Acciones',
            cell: (row) => ( 
                <div className="flex justify-center absolute ml-1">
                    <Link href={`/products/${row.id}`} passHref legacyBehavior>
                    <button onClick={() => console.log('Button clicked!')} className="ml-0 w-10 h-auto p-2font-primary font-semibold text-xs flex
                         items-baselinetransform transition duration-500 group cursor-pointer">
                    <FontAwesomeIcon icon={faBars} className="w-5 m-auto"/>
                    </button>
                    </Link>
                </div>
            ),
        },
    ]

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setFilterText('');
            }
        };
        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText}/>
        );
    }, [filterText]);

 
    return (
        <div className="min-h-80 max-w-12 my-4 sm:my-8 mx-auto w-full">

             <div className="overflow-hidden">

                <DataTable
                    columns={columns}
                    data={data}
                    pagination
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                    />
            </div>
        </div>
    )
}



export default Products;
