import FilterComponent from  "@/components/filter/FilterComponent";
import DataTable  from "react-data-table-component";
import Link from 'next/link'
import { deleteProduct } from "services/productService";
import {useState, useMemo} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'

const UserList = ({users}) => {
    const [filterText, setFilterText]= useState ('')
    const filteredItems = users.filter(item=> filterText.toLowerCase() == '' || filterText.includes(item.id));
    const [data,setData]= useState(filteredItems)

    const handleDelete = (rowId) => {
        const updatedData = data.filter(row => row.id !== rowId);
        setData(updatedData);
        deleteProduct(rowId)
      };


    const columns = [            
        {
            name: 'Nombre',
            selector: row => row.name ? row.name : "Nombre",
            sortable: true
        },
        {
            name:'Apellido',
            selector: row => row.lastName ? row.lastName : "Apellido",
            sortable: true
        },
        {
            name: 'E-mail',
            selector: row => row.email ? row.email : "E-mail",
            sortable: true
        },
        {
            name: 'Teléfono',
            selector:row=>row.phone ? row.phone : "Teléfono",
            sortable: true
        },
        {
            name: 'Ciudad',
            selector:row=>row.city ? row.city : "Ciudad",
            sortable: true
        },
        {
            name: 'Dirección',
            selector:row=>row.direction ? row.direction : "Dirección",
            sortable: true
        },
                {
                name: 'Puntos',
                cell: (row) => (
                    <Link href={`/users/wallet/${row.username}`} passHref legacyBehavior>
                        <a className="text-blue-500 underline">Puntos</a>
                    </Link>
                ),
            },
        
          
        {
            name: 'Acciones',
            cell: (row) => ( 
                <div className="flex justify-center absolute ml-1">
                    <Link href={`/users/${row.username}`} passHref legacyBehavior>
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

export default UserList;