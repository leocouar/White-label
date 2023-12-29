import { useSession, getSession, getCsrfToken, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import login from "/images/login.png";
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faFacebook } from '@fortawesome/free-solid-svg-icons';

const Login = ({ csrfToken }) => {
  const router = useRouter();
  const { data: session, user } = useSession()
  const [showPassword, setShowPassword] = useState(false);

  const [credentials, setCredentials] = useState({ username: "", password: "", csrfToken: csrfToken, remember: true })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signIn('credentials', {
      username: credentials.username,
      password: credentials.password,
      csrfToken: csrfToken,
      remember: true,
    })
    router.push('/stores/list');
  }

  const handleFacebookLogin = async () => {
    await signIn('facebook');
    router.push('/stores/list');
  };

  const handleGoogleLogin = async () => {
    await signIn('google');
    router.push('/stores/list');
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
                className="rounded-md group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-gray-900 hover:bg-gray-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Iniciar sesion
              </button>
            </div>
            <div className="w-full border border-current border-blue-600 rounded-md">
              <div className="w-1/5 absolute mt-1 ml-2">
                <img
                  src="/icons/googlesesion.png"  // Reemplaza "your-icon.svg" con el nombre de tu archivo de icono
                  alt="Icono"
                  height="22"
                  width="22"
                />
              </div>
              <button
                type="submit"
                onClick={handleGoogleLogin}
                className="ml-auto group relative w-4/5 flex justify-center py-2 px-4 text-xs  text-black hover:bg-green-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Continuar con google
              </button>
            </div>
            <div className="w-full bg-blue-800 border border-current border-blue-600 rounded-md">
              <div className="w-1/5 absolute mt-2 ml-3">
              <svg xmlns="http://www.w3.org/2000/svg" height="16" width="10" viewBox="0 0 320 512"><path fill="#ffffff" d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"/></svg>
              </div>
              <button type="submit"
                onClick={handleFacebookLogin}
                className="ml-auto group relative w-4/5 flex justify-center py-2 px-4 border border-transparent text-xs text-white bg-blue-800 hover:bg-blue-900  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Continuar con facebook
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