import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react"; // Asegúrate de importar la librería correcta
import ForbiddenPage from './ForbiddenPage';

function AuthorizationWrapper({ children }) {
  const { data: session, status } = useSession();
  const [grantAccess, setGrantAccess] = useState(false);
  const sessionUser = session?.user?.username;

  useEffect(() => {
    if (status === "authenticated") {
      const validUser = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
      const userAdmin = session?.user?.role?.includes('ADMIN') || false;
      const allowedUser = sessionUser === validUser || sessionUser === validUser + "#";

      if (userAdmin || allowedUser) {
        setGrantAccess(true);
      }
    }
  }, [status, sessionUser]);

  if (status !== "authenticated") {
    // Puedes añadir un componente de carga o redireccionar a la página de inicio de sesión aquí
    return null;
  }

  if (!grantAccess) {
    return <ForbiddenPage />;
  }

  return <>{children}</>;
}

export default function withAuthorization(WrappedComponent) {
  return function AuthorizedComponent(props) {
    return (
      <AuthorizationWrapper>
        <WrappedComponent {...props} />
      </AuthorizationWrapper>
    );
  };
}
