import { getSession, getCsrfToken, signIn } from "next-auth/client";
import { useRouter } from "next/router";
import login from "/images/login.png";

const Login = ({csrfToken, session}) => {
    const router = useRouter();

    const handleGoogleSignIn = () => {
      signIn('google'); // 'google' es el ID del proveedor de Google configurado en NextAuth.js
    };
    const handleFacebookSignIn = () => {
      signIn('facebook'); // 'facebook' es el ID del proveedor de Facebook configurado en NextAuth.js
    };
    if (session) {
      router.push('/'); // Redirigir al dashboard si está autenticado
      return null; // O puedes renderizar un componente de carga aquí
    }
    
   
     return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img className="mx-auto h-12 w-auto"
                         src={login.src} alt="Workflow"/>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-palette-secondary">
                        Iniciar Sesión
                        </h2>
                        <p className="mt-2 text-center text-sm text-palette-slighter">
                            &oacute;
                            &nbsp;
                            <a href="/users/create" className="font-medium text-palette-secondary hover:text-palette-sdark">
                               Registrese
                            </a>
                        </p>
                </div>
                <form className="mt-8 space-y-6" action="/api/auth/callback/credentials" method="POST">
                    <input type="hidden" name="remember" value="true"/>
                    <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">Usuario</label>
                                <input name="username"
                                       required
                                       type="type"
                                       className="appearance-none rounded-none relative block w-full px-3 py-2 border border-palette-slight placeholder-palette-slight text-palette-sdark rounded-t-md focus:outline-none focus:ring-palette-secondary focus:border-palette-sdark focus:z-10 sm:text-sm"
                                       placeholder="Usuario"/>
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input name="password"
                                       type="password"
                                       autoComplete="current-password"
                                       required
                                       className="mt-5 appearance-none rounded-none relative block w-full px-3 py-2 border border-palette-slight placeholder-palette-slight text-palette-sdark rounded-b-md focus:outline-none focus:ring-palette-secondary focus:border-palette-sdark focus:z-10 sm:text-sm"
                                       placeholder="Contrase&ntilde;a"/>
                            </div>
                        </div>

                        <div>
                            <button type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-palette-primary hover:bg-palette-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                          <svg className="h-5 w-5 text-palette-dark group-hover:text-palette-primary" xmlns="http://www.w3.org/2000/svg"
                                               viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                          <path fillRule="evenodd"
                                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                                clipRule="evenodd"/>
                                        </svg>
                                      </span>
                                Entrar
                            </button>
                        </div>
                        <div>
                            <button type="button" onClick={handleGoogleSignIn} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-palette-secondary hover:bg-palette-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                  <svg className="h-5 w-5 text-palette-dark group-hover:text-palette-primary" fill="currentColor" viewBox="0 0 48 48">
                                      <path d="M23.5 4c6.3 0 11.4 5.1 11.4 11.4s-5.1 11.4-11.4 11.4S12.1 21.7 12.1 15.4 17.2 4 23.5 4zm0 21.8c3.2 0 5.9-2.6 5.9-5.9s-2.6-5.9-5.9-5.9-5.9 2.6-5.9 5.9 2.7 5.9 5.9 5.9zm0 2.3c-4.3 0-7.7 2.3-9.6 5.7l-.2.3l.3.2c2.7 1.9 6 3 9.5 3s6.9-1.1 9.5-3l.3-.2l-.2-.3c-1.9-3.4-5.3-5.7-9.5-5.7zm0 21c-5.4 0-9.8-4.4-9.8-9.8s4.4-9.8 9.8-9.8 9.8 4.4 9.8 9.8-4.4 9.8-9.8 9.8zm21.7-11.1c0-1.1.1-2.2.1-3.3s0-2.1-.1-3.3h-3.3v2.9h-4v-2.9h-2.9v-4h2.9v-2.9h4v2.9h3.3c0 2.3 0 4.6-.1 6.9h-6.5c.1 1.4.1 2.9.1 4.3s0 2.9-.1 4.3h6.5c.1 1.3.1 2.7.1 4s0 2.7-.1 4h-6.5c0 2.3-.1 4.6-.1 6.9h3.3v-2.9h4v2.9h2.9v4h-2.9v2.9h-4v-2.9h-3.3c0-1.1-.1-2.2-.1-3.3s0-2.1.1-3.3h6.6z"/>
                                  </svg>
                              </span>
                              Iniciar sesión con Google
                          </button>
                        </div>
                        <div>
                          <button type="button" onClick={handleFacebookSignIn} style={{ backgroundColor: '#1877f2', }} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-palette-secondary hover:bg-palette-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="16" height="16">
                                      <path d="M20.924 0H3.075C1.376 0 0 1.375 0 3.075v17.849C0 22.625 1.375 24 3.075 24h8.807v-9.294H9.19V10.797h2.692V8.196c0-2.673 1.635-4.137 4.025-4.137 1.15 0 2.263.203 2.263.203v2.5h-1.276c-1.257 0-1.65.78-1.65 1.612v1.94h2.807l-.45 2.909h-2.357V24h4.607C22.625 24 24 22.625 24 20.924V3.075C24 1.375 22.625 0 20.924 0"></path>
                                  </svg>
                              </span>
                              Iniciar sesión con Facebook
                          </button>
                        </div>
                </form>
            </div>
        </div>
    )

}

export async function getServerSideProps(context) {
    const session = await getSession(context);
  
    if (session) {
      return {
        redirect: {
          destination: "/", // Redirigir al dashboard si está autenticado
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