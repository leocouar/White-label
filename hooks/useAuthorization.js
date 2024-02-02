import { useState , useEffect} from 'react';
import { useSession } from "next-auth/react";
import { getStoresByUser } from 'services/storeService';
import useLocalStorage from './useLocalStorage';



// Hook determina si el usuario de sesion esta habilitado a las credenciales de admin o de owner
const useAuthorization = (storeId) => {
  const { data: session } = useSession();
  const user = session?.user;
  const [autorizacion,setAutorizacion] = useLocalStorage()
  const [Auth, setAuth] = useState(false);

  const evaluateUser = async () => {
    if (user) {
      if (user.role?.includes("ADMIN")) {
        // Si es un ADMIN, tiene permisos para modificar todos los productos
        setAuth(true);
      } else {
        //agregar logica de guardado en local storage

        // Si no es un ADMIN, verifica si es propietario de la tienda con el storeId proporcionado
        const storesData = await getStoresByUser(user.username)
        const isStoreOwner = storesData.some(store => store.id === storeId);
        // Si es propietario de la tienda, tiene permisos para modificar los productos de esa tienda
        setAuth(isStoreOwner);
      }
    } else {
      // Manejar el caso en el que no hay usuario (establecer Auth en false o hacer algo más)
      setAuth(false);
    }

  };
  useEffect(() => {
      evaluateUser();
  }, [user, storeId]);

  return {
    Auth
  };
};
export default useAuthorization;