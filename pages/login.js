import { getSession, getCsrfToken, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from 'react';
import LoginForm from "@/components/login/LoginForm";
import SEO from "@/components/SEO";

const Login = ({ csrfToken }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "", csrfToken: csrfToken, remember: true })

  return (
    <>
      <SEO title="Ingresa tu e-mail o usuario" />
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <LoginForm
          credentials={credentials}
          setCredentials={setCredentials}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          router={router}
          csrfToken={csrfToken}
        />
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session)
    return {
      props: {
        csrfToken: await getCsrfToken(context),
      },
    };
  return {
    redirect: {
      destination: "/stores/list", // Redirigir al dashboard si está autenticado
      permanent: false,
    }
  };
}

export default Login;