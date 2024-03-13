import DataTable from 'react-data-table-component'
import Link from 'next/link'
import { useEffect,  useState } from "react";
import { paginationComponentOptions } from "../../DataTableUtils";
import Loading from "@/components/utils/Loading";
import { findAll, getByUser, search } from "../../services/checkoutService";


/*https://react-data-table-component.netlify.app/?path=/story/getting-started-intro--page*/
const List = ({ user = null }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [content, setContent] = useState([])
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    const filteredItems = async item => {
        const value = item.target.value
        const result = await search(value)
        setContent(result)
    };

    const [total, setTotal] = useState([])
    const [loading, setLoading] = useState(false)

    const handlePageChange = async (page) => {
        setCurrentPage(page);
        setLoading(true)
        const data = await findAll(page);
        setContent(data.content);
        setLoading(false)
    };

    const fetchData = async () => {
        if (user == null) {
            try {
                setLoading(true);
                const data = await findAll();
                setContent(data.content);
                setTotal(data.totalElements);
            } finally {
                setLoading(false);
            }
        } else {
            try {
                setLoading(true);
                const data = await getByUser(user);
                setContent(data.content);
                setTotal(data.totalElements);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
            cell: row => <Link legacyBehavior passHref href={`/checkout/${row.id}`}><a className={`text-indigo-600`}>#{row.id}</a></Link>
        },
        user == null && { 
            name: 'Usuario',
            selector: row => row.username,
        },
        {
            name: 'Estado',
            selector: row => row.status,
        },
        {
            name: 'Fecha',
            selector: row => row.date,
        },
        {
            name: 'Hora',
            selector: row => row.time
        },
        {
            name: 'Total',
            selector: row => (<label>$ {Number(row.totalAmount).toFixed(2)}</label>)
        }
    ];

    return (
        <>
            {user == null && <input
                className="w-full p-2 bg-gray-100 border border-purple-500 border-gray-200 rounded-lg"
                id="search"
                type="text"
                placeholder="Buscar por id"
                aria-label="Search Input"
                onChange={filteredItems}
            />}

            {loading ? (
                <Loading />
            ) : (
                <div className="min-h-80 max-w-12 my-4 sm:my-8 mx-auto w-full">
                    <DataTable
                        columns={columns}
                        data={content}
                        pagination
                        paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                        subHeader
                        persistTableHead
                        paginationServer
                        paginationComponentOptions={paginationComponentOptions}
                        paginationPerPage={10}
                        paginationTotalRows={total}
                        onChangePage={handlePageChange}
                        paginationDefaultPage={currentPage}
                    />
                </div>
            )}
        </>

    )
}

export default List;