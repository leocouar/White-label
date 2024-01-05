import { useSession, getSession, getCsrfToken } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from 'react';
import LoginForm from "@/components/login/LoginForm";
import SEO from "@/components/SEO";

const LoginError = ({ csrfToken }) => {
  const router = useRouter()
  const { data: session } = useSession()
  const [showPassword, setShowPassword] = useState(false);

  if (session) {
    router.push('/stores/list');
    return null;
  }
  const [credentials, setCredentials] = useState({ username: "", password: "", csrfToken: csrfToken, remember: true })

  return (
    <>
      <SEO title="Error de inicio de sesión" />
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 flex-col">
        <LoginForm
          credentials={credentials}
          setCredentials={setCredentials}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          router={router}
          csrfToken={csrfToken}
        />
        <div className="flex flex-col items-center">
          <div className="mx-auto">
            <a className="text-red-500">
              Los datos son incorrectos.
            </a>
          </div>
          <div className="mx-auto">
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 text-center">
                ¿Olvidaste la contraseña?
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/stores/list", // Redirigir al dashboard si está autenticado
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

export default LoginError;