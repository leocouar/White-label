import { useSession, getSession, getCsrfToken, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import login from "/images/login.png";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = ({ csrfToken }) => {
  const router = useRouter()
  const { data: session, user } = useSession()
  const [showPassword, setShowPassword] = useState(false);

  if (session) {
    router.push('/stores/list'); // Redirigir al dashboard si está autenticado
    return null; // O puedes renderizar un componente de carga aquí
  }
  const [credentials, setCredentials] = useState({ username: "", password: "", csrfToken: csrfToken, remember: true })

  const handleSubmit = (e) => {
    e.preventDefault()
    signIn('credentials', {
      username: credentials.username,
      password: credentials.password,
      csrfToken: csrfToken,
      remember: true,
    })
  }

  const handleGoogleSignIn = () => {
    signIn('google'); // 'google' es el ID del proveedor de Google configurado en NextAuth.js
  };
  const handleFacebookSignIn = () => {
    signIn('facebook'); // 'facebook' es el ID del proveedor de Facebook configurado en NextAuth.js
  };


  return (
    <div className="min-h-full flex  items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-1/2 flex  justify-center">
        <div className="w-auto mt-10 mb-10 space-y-4">
          <div>
            <img className="mx-auto h-12 w-auto"
              src={login.src} alt="Workflow" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-palette-primary">
              Iniciar Sesión
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">Usuario</label>
                <input name="username"
                  value={credentials.username}
                  onChange={({ target }) => setCredentials({ ...credentials, username: target.value })}
                  required
                  type="type"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-palette-slight placeholder-palette-slight text-palette-sdark rounded-t-md focus:outline-none focus:ring-palette-secondary focus:border-palette-sdark focus:z-10 sm:text-sm"
                  placeholder="Usuario" />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <div className="relative">
                  <input
                    name="password"
                    value={credentials.password}
                    onChange={({ target }) => setCredentials({ ...credentials, password: target.value })}
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    className="mt-5 appearance-none rounded-none relative block w-full px-3 py-2 border border-palette-slight placeholder-palette-slight text-palette-sdark rounded-b-md focus:outline-none focus:ring-palette-secondary focus:border-palette-sdark focus:z-10 sm:text-sm pr-8"
                    placeholder="Contraseña"
                  />
                  <div className="absolute top-2 right-2" style={{ zIndex: 10 }}>
                    <FontAwesomeIcon
                      icon={showPassword ? faEye : faEyeSlash}
                      className="h-5 w-5 text-palette-primary cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <button type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Iniciar sesion
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
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

export default Login;