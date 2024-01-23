import React from 'react';
import { useSession } from "next-auth/react";
import ForbiddenPage from './ForbiddenPage';

function AuthorizationWrapper({ children }) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
  
    return <p>Loading...</p>;
  }

  // Permitir acceso a todos los usuarios autenticados
  if (session) {
    // Verificar si el usuario tiene el rol de 'OWNER'
    if (!session?.user?.role?.includes('OWNER')) {
      return <ForbiddenPage />;
    }
  }

  // Renderizar el contenido para usuarios autenticados o no autenticados
  return <>{children}</>;
}

export default function ownerAuthorization(WrappedComponent) {
  return function AuthorizedComponent(props) {
    return (
      <AuthorizationWrapper>
        <WrappedComponent {...props} />
      </AuthorizationWrapper>
    );
  };
}
