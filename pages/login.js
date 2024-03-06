import { getSession, getCsrfToken, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from 'react';
import { useSession } from "next-auth/react";
import LoginForm from "@/components/login/LoginForm";
import SEO from "@/components/SEO";

const Login = ({ csrfToken }) => {

  const { data: session, status } = useSession()
  const username = session?.user?.username;
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "", csrfToken: csrfToken, remember: true })

  return (
    <>
      <SEO title="Ingresa tu e-mail o usuario" />
      <div className="min-h-full flex items-center justify-center sm:px-6 lg:px-8">
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

  if (!session) {
    return {
      props: {
        csrfToken: await getCsrfToken(context),
      },
    };
  }

  const role = session?.user?.role;

  let destination;
  if (role === "ADMIN") {
    destination = "/admin";
  } else if (role === "OWNER") {
    destination = "/stores/list";
  } else if (role === "CUSTOMER") {
    destination = "/";
  } else {
    destination = "/login"; // Redirigir a la página principal si el rol no está definido
  }

  return {
    redirect: {
      destination: destination,
      permanent: false,
    },
  };
}

export default Login;