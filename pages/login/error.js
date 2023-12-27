import { useSession, getSession, getCsrfToken, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import login from "/images/login.png";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginError = ({ csrfToken }) => {
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
      <div className="w-1/2 flex  justify-center bg-gray-200">
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
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium  text-white bg-gray-900 hover:bg-gray-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Iniciar sesion
              </button>
            </div>
            <div className="w-full bg-white">
              <div className="w-1/5 absolute mt-2 ml-2">
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
                className="ml-auto group relative w-4/5 flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Iniciar sesión
              </button>
            </div>
            <div className="w-full bg-white">
              <div className="w-1/5 absolute mt-2 ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 512 512"><path fill="#023792" d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" /></svg>
              </div>
              <button type="submit"
                onClick={handleFacebookLogin}
                className="ml-auto group relative w-4/5 flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-blue-800 hover:bg-blue-900  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Iniciar sesion
              </button>
            </div>
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

export default LoginError;