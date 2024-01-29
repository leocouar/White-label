import { useState , useEffect} from 'react';
import { useSession } from "next-auth/react";


// Hook determina si el usuario de sesion esta habilitado a las credenciales de admin o de owner
const useAuthorization = (storeId) => {
  const { data: session } = useSession();
  const user = session?.user;
  console.log("______________USER______________");
  console.log(user);

  const [authCache, setAuthCache] = useState({});
  const cacheKey = `${user?.username}-${storeId}`;

  const [Auth, setAuth] = useState(false);

  useEffect(() => {
    // if (cacheKey in authCache) {
    //   // Usar resultado de la caché si está disponible
    //   setAuth(authCache[cacheKey]);
    //   console.log("__________________AUTH-POR-CACHE____________________");
    //   console.log(Auth);
    //   console.log("__________________AUTH-POR-CACHE____________________");
    // } else {
      const evaluateUser = async () => {
        if (user) {
          if (user.role?.includes("ADMIN")) {
            // Si es un ADMIN, tiene permisos para modificar todos los productos
            setAuth(true);
            console.log("____________ADMIN________________");
            console.log(Auth);
            console.log("____________ADMIN________________");
          } else {
            // Si no es un ADMIN, verifica si es propietario de la tienda con el storeId proporcionado
            const storesData = await getStoresByUser(user.username);
  
            const isStoreOwner = storesData.some(store => store.id === storeId && store.owner === user.username);
  
            // Si es propietario de la tienda, tiene permisos para modificar los productos de esa tienda
            setAuth(isStoreOwner);
            console.log("____________________OWNER-AUTH____________");
            console.log(Auth);
          }
        } else {
          // Manejar el caso en el que no hay usuario (establecer Auth en false o hacer algo más)
          setAuth(false);
        }

      //   // Actualizar la caché con el resultado
      //   setAuthCache((prevCache) => ({
      //     ...prevCache,
      //     [cacheKey]: Auth,
      //   }));
      // };

      await evaluateUser();
    }
  }, [user, storeId, authCache, cacheKey]);

  return {
    Auth
  };
};
export default useAuthorization;