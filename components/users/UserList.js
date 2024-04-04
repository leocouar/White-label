import FilterComponent from  "@/components/filter/FilterComponent";
import DataTable  from "react-data-table-component";
import Link from 'next/link'
import { deleteProduct } from "services/productService";
import {useState, useMemo} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars, faWallet} from '@fortawesome/free-solid-svg-icons'
import availableRoles from "./ListOfRoles";
import {paginationComponentOptions} from "../../DataTableUtils";

const UserList = ({users}) => {
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [filterText, setFilterText]= useState ('')
    const filteredItems = users.filter(item => {
        return filterText === '' || (item.id && item.id.toString().includes(filterText)) || item.name.toLowerCase().includes(filterText.toLowerCase());
    });
    

    const [data,setData]= useState(filteredItems)

    const handleDelete = (rowId) => {
        const updatedData = data.filter(row => row.id !== rowId);
        setData(updatedData);
        deleteProduct(rowId)
      };


    const columns = [            
        {
            name: 'User ID',
            selector: row => row.username ? row.username : "User ID",
            sortable: true
        },
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
            name:'CUIT',
            selector: row => row.cuit ? row.cuit : "CUIT",
            sortable: true
        },
        {
            name: 'Teléfono',
            selector: row=>row.phone ? row.phone : "Teléfono",
            sortable: true
        },
        {
            name: 'Ciudad',
            selector: row=>row.city ? row.city : "Ciudad",
            sortable: true
        },
        {
            name: 'Dirección',
            selector: row=>row.direction ? row.direction : "Dirección",
            sortable: true
        },
        {
            name: 'Rol',
            selector: row=>row.role ? availableRoles.find(role => role.value === row.role)?.name  : "Rol",
            sortable: true
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
        {
            name: 'Billetera',
            cell: (row) => ( 
                <div className="flex justify-center absolute ml-1">
                    <Link href={`/users/wallet/${row.username}`} passHref>
                        <button onClick={() => console.log('Button clicked!')} className="ml-0 w-10 h-auto p-2 font-primary font-semibold text-xs flex items-baseline transform transition duration-500 group cursor-pointer">
                            <FontAwesomeIcon icon={faWallet} className="w-5 m-auto" />
                        </button>
                    </Link>
                </div>
            ),
        },
    ]

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };
        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText}/>
        );
     }, [filterText, resetPaginationToggle]);

 
    return (
        <div className="min-h-80 max-w-12 my-4 sm:my-8 mx-auto w-full">
             <div className="overflow-hidden">
             <DataTable
                            columns={columns}
                            data={filteredItems}
                            pagination
                            paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                            subHeader
                            subHeaderComponent={subHeaderComponentMemo}
                            persistTableHead
                            paginationComponentOptions={paginationComponentOptions}
                        />
            </div>
        </div>
    )
}

export default UserList;