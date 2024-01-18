import {findAll} from "../../services/userService";
import UserList from "@/components/users/UserList";
import PageTitle from "@/components/PageTitle";
import withAuthorization from 'components/withAuthorization';
import SEO from "@/components/SEO";
import Link from "next/link";

import {PlusIcon} from "@heroicons/react/20/solid";

const Index = ({users}) => {

    return (
        <>
        <SEO title="Usuarios" />
        <div className="items-center mx-auto bg-white max-w-6xl relative">
            <PageTitle text="Usuarios" />
            <Link legacyBehavior href="/users/create" passHref>
                <div className="absolute top-0 right-0 mt-4 mr-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
                        <PlusIcon className="h-5 w-5" />
                        <span className="ml-2">Nuevo Usuario</span>
                    </button>
                </div>
            </Link>
            <UserList users={users}/>
        </div>
        </>
    )
}

export async function getStaticProps() {
    const users = await findAll()
    return {
        props: {
            users
        },
    }
}

export default withAuthorization(Index);