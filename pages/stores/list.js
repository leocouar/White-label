import NewStore from "@/components/stores/NewStore";
import { getSession, getCsrfToken, signIn } from "next-auth/react";
import StoreHeading from "@/components/StoreHeading";
import ListStores from "@/components/stores/ListStore";


const ListStore = () => {
  const data= [
    {
        "id": 1179,
        "name": "PablitosHause",
        "description": "Moda y accesorios",
        "email": null,
        "telephone": null,
        "address": null,
        "logo": null
    },
    {
        "id": 1182,
        "name": "adminStore",
        "description": "un storer de admin para admins",
        "email": "admin@admin.com",
        "telephone": "2314000000",
        "address": "Alsina 11",
        "logo": null
    },
    {
        "id": 1173,
        "name": "empresa8",
        "description": "sao",
        "email": null,
        "telephone": null,
        "address": null,
        "logo": null
    },
    {
        "id": 1174,
        "name": "empresa9",
        "description": "sao",
        "email": null,
        "telephone": null,
        "address": null,
        "logo": null
    },
    {
        "id": 1177,
        "name": "Mi Tienda numero 2",
        "description": "Descripción de la tienda",
        "email": null,
        "telephone": null,
        "address": null,
        "logo": null
    },
    {
        "id": 1175,
        "name": "Mi Tienda",
        "description": "Descripción de la tienda",
        "email": null,
        "telephone": null,
        "address": null,
        "logo": null
    }
]
    return(
        <div className="min-h-screen">
            <StoreHeading title="Tus Comercios"/>
            <ListStores stores={data}/>
        </div>
    )
}
export async function getServerSideProps(context) {
    const session = await getSession(context);
  
    if (!session) {
      return {
        redirect: {
          destination: "/", // Redirigir al dashboard si está autenticado
          permanent: false,
        },
      };
    }
  
    return {
      props: {
        csrfToken: await getCsrfToken(context),
      },
    };
  }
export default ListStore;
